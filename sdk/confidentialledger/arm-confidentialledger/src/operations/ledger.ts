/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Ledger } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ConfidentialLedgerClient } from "../confidentialLedgerClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  ConfidentialLedger,
  LedgerListByResourceGroupNextOptionalParams,
  LedgerListByResourceGroupOptionalParams,
  LedgerListByResourceGroupResponse,
  LedgerListBySubscriptionNextOptionalParams,
  LedgerListBySubscriptionOptionalParams,
  LedgerListBySubscriptionResponse,
  LedgerGetOptionalParams,
  LedgerGetResponse,
  LedgerDeleteOptionalParams,
  LedgerCreateOptionalParams,
  LedgerCreateResponse,
  LedgerUpdateOptionalParams,
  LedgerUpdateResponse,
  ConfidentialLedgerBackup,
  LedgerBackupOptionalParams,
  LedgerBackupResponse,
  ConfidentialLedgerRestore,
  LedgerRestoreOptionalParams,
  LedgerRestoreResponse,
  LedgerListByResourceGroupNextResponse,
  LedgerListBySubscriptionNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Ledger operations. */
export class LedgerImpl implements Ledger {
  private readonly client: ConfidentialLedgerClient;

  /**
   * Initialize a new instance of the class Ledger class.
   * @param client Reference to the service client
   */
  constructor(client: ConfidentialLedgerClient) {
    this.client = client;
  }

  /**
   * Retrieves the properties of all Confidential Ledgers.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: LedgerListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<ConfidentialLedger> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByResourceGroupPagingPage(
          resourceGroupName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: LedgerListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<ConfidentialLedger[]> {
    let result: LedgerListByResourceGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResourceGroup(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: LedgerListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<ConfidentialLedger> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Retrieves the properties of all Confidential Ledgers.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: LedgerListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<ConfidentialLedger> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listBySubscriptionPagingPage(options, settings);
      },
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: LedgerListBySubscriptionOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<ConfidentialLedger[]> {
    let result: LedgerListBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySubscription(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: LedgerListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<ConfidentialLedger> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Retrieves the properties of a Confidential Ledger.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    ledgerName: string,
    options?: LedgerGetOptionalParams,
  ): Promise<LedgerGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, ledgerName, options },
      getOperationSpec,
    );
  }

  /**
   * Deletes an existing Confidential Ledger.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    ledgerName: string,
    options?: LedgerDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, ledgerName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes an existing Confidential Ledger.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    ledgerName: string,
    options?: LedgerDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      ledgerName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Creates a  Confidential Ledger with the specified ledger parameters.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param confidentialLedger Confidential Ledger Create Request Body
   * @param options The options parameters.
   */
  async beginCreate(
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerCreateOptionalParams,
  ): Promise<
    SimplePollerLike<OperationState<LedgerCreateResponse>, LedgerCreateResponse>
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<LedgerCreateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, ledgerName, confidentialLedger, options },
      spec: createOperationSpec,
    });
    const poller = await createHttpPoller<
      LedgerCreateResponse,
      OperationState<LedgerCreateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates a  Confidential Ledger with the specified ledger parameters.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param confidentialLedger Confidential Ledger Create Request Body
   * @param options The options parameters.
   */
  async beginCreateAndWait(
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerCreateOptionalParams,
  ): Promise<LedgerCreateResponse> {
    const poller = await this.beginCreate(
      resourceGroupName,
      ledgerName,
      confidentialLedger,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates properties of Confidential Ledger
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param confidentialLedger Confidential Ledger request body for Updating Ledger
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<OperationState<LedgerUpdateResponse>, LedgerUpdateResponse>
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<LedgerUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, ledgerName, confidentialLedger, options },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      LedgerUpdateResponse,
      OperationState<LedgerUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Updates properties of Confidential Ledger
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param confidentialLedger Confidential Ledger request body for Updating Ledger
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerUpdateOptionalParams,
  ): Promise<LedgerUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      ledgerName,
      confidentialLedger,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Retrieves the properties of all Confidential Ledgers.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: LedgerListByResourceGroupOptionalParams,
  ): Promise<LedgerListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * Retrieves the properties of all Confidential Ledgers.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: LedgerListBySubscriptionOptionalParams,
  ): Promise<LedgerListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * Backs up a Confidential Ledger Resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param confidentialLedger Confidential Ledger Backup Request Body
   * @param options The options parameters.
   */
  async beginBackup(
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedgerBackup,
    options?: LedgerBackupOptionalParams,
  ): Promise<
    SimplePollerLike<OperationState<LedgerBackupResponse>, LedgerBackupResponse>
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<LedgerBackupResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, ledgerName, confidentialLedger, options },
      spec: backupOperationSpec,
    });
    const poller = await createHttpPoller<
      LedgerBackupResponse,
      OperationState<LedgerBackupResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Backs up a Confidential Ledger Resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param confidentialLedger Confidential Ledger Backup Request Body
   * @param options The options parameters.
   */
  async beginBackupAndWait(
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedgerBackup,
    options?: LedgerBackupOptionalParams,
  ): Promise<LedgerBackupResponse> {
    const poller = await this.beginBackup(
      resourceGroupName,
      ledgerName,
      confidentialLedger,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Restores a Confidential Ledger Resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param confidentialLedger Confidential Ledger Restore Request Body
   * @param options The options parameters.
   */
  async beginRestore(
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedgerRestore,
    options?: LedgerRestoreOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<LedgerRestoreResponse>,
      LedgerRestoreResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<LedgerRestoreResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, ledgerName, confidentialLedger, options },
      spec: restoreOperationSpec,
    });
    const poller = await createHttpPoller<
      LedgerRestoreResponse,
      OperationState<LedgerRestoreResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Restores a Confidential Ledger Resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param ledgerName Name of the Confidential Ledger
   * @param confidentialLedger Confidential Ledger Restore Request Body
   * @param options The options parameters.
   */
  async beginRestoreAndWait(
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedgerRestore,
    options?: LedgerRestoreOptionalParams,
  ): Promise<LedgerRestoreResponse> {
    const poller = await this.beginRestore(
      resourceGroupName,
      ledgerName,
      confidentialLedger,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: LedgerListByResourceGroupNextOptionalParams,
  ): Promise<LedgerListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: LedgerListBySubscriptionNextOptionalParams,
  ): Promise<LedgerListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConfidentialLedger,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.ledgerName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.ledgerName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ConfidentialLedger,
    },
    201: {
      bodyMapper: Mappers.ConfidentialLedger,
    },
    202: {
      bodyMapper: Mappers.ConfidentialLedger,
    },
    204: {
      bodyMapper: Mappers.ConfidentialLedger,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.confidentialLedger,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.ledgerName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ConfidentialLedger,
    },
    201: {
      bodyMapper: Mappers.ConfidentialLedger,
    },
    202: {
      bodyMapper: Mappers.ConfidentialLedger,
    },
    204: {
      bodyMapper: Mappers.ConfidentialLedger,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.confidentialLedger,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.ledgerName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConfidentialLedgerList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.ConfidentialLedger/ledgers/",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConfidentialLedgerList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const backupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}/backup",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ConfidentialLedgerBackupResponse,
    },
    201: {
      bodyMapper: Mappers.ConfidentialLedgerBackupResponse,
    },
    202: {
      bodyMapper: Mappers.ConfidentialLedgerBackupResponse,
    },
    204: {
      bodyMapper: Mappers.ConfidentialLedgerBackupResponse,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.confidentialLedger1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.ledgerName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const restoreOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}/restore",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ConfidentialLedgerRestoreResponse,
    },
    201: {
      bodyMapper: Mappers.ConfidentialLedgerRestoreResponse,
    },
    202: {
      bodyMapper: Mappers.ConfidentialLedgerRestoreResponse,
    },
    204: {
      bodyMapper: Mappers.ConfidentialLedgerRestoreResponse,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.confidentialLedger2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.ledgerName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConfidentialLedgerList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConfidentialLedgerList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
