/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Builders } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ContainerAppsAPIClient } from "../containerAppsAPIClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  BuilderResource,
  BuildersListBySubscriptionNextOptionalParams,
  BuildersListBySubscriptionOptionalParams,
  BuildersListBySubscriptionResponse,
  BuildersListByResourceGroupNextOptionalParams,
  BuildersListByResourceGroupOptionalParams,
  BuildersListByResourceGroupResponse,
  BuildersGetOptionalParams,
  BuildersGetResponse,
  BuildersCreateOrUpdateOptionalParams,
  BuildersCreateOrUpdateResponse,
  BuilderResourceUpdate,
  BuildersUpdateOptionalParams,
  BuildersUpdateResponse,
  BuildersDeleteOptionalParams,
  BuildersDeleteResponse,
  BuildersListBySubscriptionNextResponse,
  BuildersListByResourceGroupNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Builders operations. */
export class BuildersImpl implements Builders {
  private readonly client: ContainerAppsAPIClient;

  /**
   * Initialize a new instance of the class Builders class.
   * @param client Reference to the service client
   */
  constructor(client: ContainerAppsAPIClient) {
    this.client = client;
  }

  /**
   * List BuilderResource resources by subscription ID
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: BuildersListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<BuilderResource> {
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
    options?: BuildersListBySubscriptionOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<BuilderResource[]> {
    let result: BuildersListBySubscriptionResponse;
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
    options?: BuildersListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<BuilderResource> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List BuilderResource resources by resource group
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: BuildersListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<BuilderResource> {
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
    options?: BuildersListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<BuilderResource[]> {
    let result: BuildersListByResourceGroupResponse;
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
    options?: BuildersListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<BuilderResource> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List BuilderResource resources by subscription ID
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: BuildersListBySubscriptionOptionalParams,
  ): Promise<BuildersListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * List BuilderResource resources by resource group
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: BuildersListByResourceGroupOptionalParams,
  ): Promise<BuildersListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * Get a BuilderResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param builderName The name of the builder.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    builderName: string,
    options?: BuildersGetOptionalParams,
  ): Promise<BuildersGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, builderName, options },
      getOperationSpec,
    );
  }

  /**
   * Create or update a BuilderResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param builderName The name of the builder.
   * @param builderEnvelope Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResource,
    options?: BuildersCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<BuildersCreateOrUpdateResponse>,
      BuildersCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<BuildersCreateOrUpdateResponse> => {
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
      args: { resourceGroupName, builderName, builderEnvelope, options },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      BuildersCreateOrUpdateResponse,
      OperationState<BuildersCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create or update a BuilderResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param builderName The name of the builder.
   * @param builderEnvelope Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResource,
    options?: BuildersCreateOrUpdateOptionalParams,
  ): Promise<BuildersCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      builderName,
      builderEnvelope,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Update a BuilderResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param builderName The name of the builder.
   * @param builderEnvelope The resource properties to be updated.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResourceUpdate,
    options?: BuildersUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<BuildersUpdateResponse>,
      BuildersUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<BuildersUpdateResponse> => {
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
      args: { resourceGroupName, builderName, builderEnvelope, options },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      BuildersUpdateResponse,
      OperationState<BuildersUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Update a BuilderResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param builderName The name of the builder.
   * @param builderEnvelope The resource properties to be updated.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResourceUpdate,
    options?: BuildersUpdateOptionalParams,
  ): Promise<BuildersUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      builderName,
      builderEnvelope,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a BuilderResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param builderName The name of the builder.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    builderName: string,
    options?: BuildersDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<BuildersDeleteResponse>,
      BuildersDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<BuildersDeleteResponse> => {
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
      args: { resourceGroupName, builderName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      BuildersDeleteResponse,
      OperationState<BuildersDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a BuilderResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param builderName The name of the builder.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    builderName: string,
    options?: BuildersDeleteOptionalParams,
  ): Promise<BuildersDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      builderName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: BuildersListBySubscriptionNextOptionalParams,
  ): Promise<BuildersListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec,
    );
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
    options?: BuildersListByResourceGroupNextOptionalParams,
  ): Promise<BuildersListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/builders",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BuilderCollection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BuilderCollection,
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
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BuilderResource,
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
    Parameters.builderName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BuilderResource,
    },
    201: {
      bodyMapper: Mappers.BuilderResource,
    },
    202: {
      bodyMapper: Mappers.BuilderResource,
    },
    204: {
      bodyMapper: Mappers.BuilderResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.builderEnvelope,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.builderName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.BuilderResource,
    },
    201: {
      bodyMapper: Mappers.BuilderResource,
    },
    202: {
      bodyMapper: Mappers.BuilderResource,
    },
    204: {
      bodyMapper: Mappers.BuilderResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.builderEnvelope1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.builderName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.BuildersDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.BuildersDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.BuildersDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.BuildersDeleteHeaders,
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
    Parameters.builderName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BuilderCollection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BuilderCollection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
