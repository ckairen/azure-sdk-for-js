// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ReadableOptions } from "node:stream";
import { Readable } from "node:stream";
import type { BlobClient, CommonOptions } from "@azure/storage-blob";
import type { AbortSignalLike } from "@azure/abort-controller";
import { tracingClient } from "./utils/tracing.js";

/**
 * Options to configure the LazyLoadingBlobStream.
 */
export interface LazyLoadingBlobStreamOptions extends ReadableOptions, CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

interface LazyLoadingBlobStreamDownloadBlockOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * This class generates a readable stream from a blobClient's data.
 */
export class LazyLoadingBlobStream extends Readable {
  /**
   * BlobClient to make download calls with.
   */
  private readonly blobClient: BlobClient;

  /**
   * The offset within the blob of the next block we will download.
   */
  private offset: number;

  private readonly blockSize: number;

  private lastDownloadBytes: number;

  private lastDownloadData?: Buffer;

  private blobLength: number;

  private options?: LazyLoadingBlobStreamOptions;

  /**
   * Creates an instance of LazyLoadingBlobStream.
   *
   * @param byteLength - The total length of data contained in the buffers
   */
  constructor(
    blobClient: BlobClient,
    offset: number,
    blockSize: number,
    options?: LazyLoadingBlobStreamOptions,
  ) {
    super(options);
    this.blobClient = blobClient;
    this.offset = offset;
    this.blockSize = blockSize;
    this.lastDownloadBytes = -1;
    this.blobLength = -1;
    this.options = options;
  }

  private async downloadBlock(options: LazyLoadingBlobStreamDownloadBlockOptions = {}) {
    return tracingClient.withSpan(
      "LazyLoadingBlobStream-downloadBlock",
      options,
      async (updatedOptions) => {
        const properties = await this.blobClient.getProperties({
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        });
        this.blobLength = properties.contentLength!;

        this.lastDownloadBytes = Math.min(this.blockSize, this.blobLength - this.offset);
        if (this.lastDownloadBytes === 0) {
          this.lastDownloadData = undefined;
          return;
        }

        this.lastDownloadData = await this.blobClient.downloadToBuffer(
          this.offset,
          this.lastDownloadBytes,
          {
            abortSignal: options.abortSignal,
            tracingOptions: updatedOptions.tracingOptions,
          },
        );
        this.offset += this.lastDownloadBytes;
      },
    );
  }

  /**
   * Internal _read() that will be called when the stream wants to pull more data in.
   *
   * @param size - Optional. The size of data to be read
   */
  public async _read(size?: number): Promise<void> {
    return tracingClient.withSpan(
      "LazyLoadingBlobStream-read",
      this.options ?? {},
      async (updatedOptions) => {
        if (!size) {
          size = this.readableHighWaterMark;
        }
        let count = 0;
        let chunkSize = 0;
        const chunksToPush = [];
        do {
          if (this.lastDownloadData === undefined || this.lastDownloadData?.byteLength === 0) {
            await this.downloadBlock({
              abortSignal: this.options?.abortSignal,
              tracingOptions: updatedOptions?.tracingOptions,
            });
          }
          if (this.lastDownloadData?.byteLength) {
            chunkSize = Math.min(size - count, this.lastDownloadData?.byteLength);
            chunksToPush.push(this.lastDownloadData.slice(0, chunkSize));
            this.lastDownloadData = this.lastDownloadData.slice(chunkSize);
            count += chunkSize;
          } else {
            chunkSize = 0;
          }
        } while (chunkSize > 0 && count < size);

        this.push(Buffer.concat(chunksToPush));

        if (count < size) {
          this.push(null);
        }
      },
    );
  }
}
