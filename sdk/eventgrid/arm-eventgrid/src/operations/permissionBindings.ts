/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { PermissionBindings } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { EventGridManagementClient } from "../eventGridManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  PermissionBinding,
  PermissionBindingsListByNamespaceNextOptionalParams,
  PermissionBindingsListByNamespaceOptionalParams,
  PermissionBindingsListByNamespaceResponse,
  PermissionBindingsGetOptionalParams,
  PermissionBindingsGetResponse,
  PermissionBindingsCreateOrUpdateOptionalParams,
  PermissionBindingsCreateOrUpdateResponse,
  PermissionBindingsDeleteOptionalParams,
  PermissionBindingsListByNamespaceNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing PermissionBindings operations. */
export class PermissionBindingsImpl implements PermissionBindings {
  private readonly client: EventGridManagementClient;

  /**
   * Initialize a new instance of the class PermissionBindings class.
   * @param client Reference to the service client
   */
  constructor(client: EventGridManagementClient) {
    this.client = client;
  }

  /**
   * Get all the permission bindings under a namespace.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param namespaceName Name of the namespace.
   * @param options The options parameters.
   */
  public listByNamespace(
    resourceGroupName: string,
    namespaceName: string,
    options?: PermissionBindingsListByNamespaceOptionalParams,
  ): PagedAsyncIterableIterator<PermissionBinding> {
    const iter = this.listByNamespacePagingAll(
      resourceGroupName,
      namespaceName,
      options,
    );
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
        return this.listByNamespacePagingPage(
          resourceGroupName,
          namespaceName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByNamespacePagingPage(
    resourceGroupName: string,
    namespaceName: string,
    options?: PermissionBindingsListByNamespaceOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<PermissionBinding[]> {
    let result: PermissionBindingsListByNamespaceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByNamespace(
        resourceGroupName,
        namespaceName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByNamespaceNext(
        resourceGroupName,
        namespaceName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByNamespacePagingAll(
    resourceGroupName: string,
    namespaceName: string,
    options?: PermissionBindingsListByNamespaceOptionalParams,
  ): AsyncIterableIterator<PermissionBinding> {
    for await (const page of this.listByNamespacePagingPage(
      resourceGroupName,
      namespaceName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get properties of a permission binding.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param namespaceName Name of the namespace.
   * @param permissionBindingName Name of the permission binding.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    options?: PermissionBindingsGetOptionalParams,
  ): Promise<PermissionBindingsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, namespaceName, permissionBindingName, options },
      getOperationSpec,
    );
  }

  /**
   * Create or update a permission binding with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param namespaceName Name of the namespace.
   * @param permissionBindingName The permission binding name.
   * @param permissionBindingInfo Permission binding information.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    permissionBindingInfo: PermissionBinding,
    options?: PermissionBindingsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<PermissionBindingsCreateOrUpdateResponse>,
      PermissionBindingsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<PermissionBindingsCreateOrUpdateResponse> => {
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
      args: {
        resourceGroupName,
        namespaceName,
        permissionBindingName,
        permissionBindingInfo,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      PermissionBindingsCreateOrUpdateResponse,
      OperationState<PermissionBindingsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create or update a permission binding with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param namespaceName Name of the namespace.
   * @param permissionBindingName The permission binding name.
   * @param permissionBindingInfo Permission binding information.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    permissionBindingInfo: PermissionBinding,
    options?: PermissionBindingsCreateOrUpdateOptionalParams,
  ): Promise<PermissionBindingsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      namespaceName,
      permissionBindingName,
      permissionBindingInfo,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete an existing permission binding.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param namespaceName Name of the namespace.
   * @param permissionBindingName Name of the permission binding.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    options?: PermissionBindingsDeleteOptionalParams,
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
      args: {
        resourceGroupName,
        namespaceName,
        permissionBindingName,
        options,
      },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete an existing permission binding.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param namespaceName Name of the namespace.
   * @param permissionBindingName Name of the permission binding.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    options?: PermissionBindingsDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      namespaceName,
      permissionBindingName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Get all the permission bindings under a namespace.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param namespaceName Name of the namespace.
   * @param options The options parameters.
   */
  private _listByNamespace(
    resourceGroupName: string,
    namespaceName: string,
    options?: PermissionBindingsListByNamespaceOptionalParams,
  ): Promise<PermissionBindingsListByNamespaceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, namespaceName, options },
      listByNamespaceOperationSpec,
    );
  }

  /**
   * ListByNamespaceNext
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param namespaceName Name of the namespace.
   * @param nextLink The nextLink from the previous successful call to the ListByNamespace method.
   * @param options The options parameters.
   */
  private _listByNamespaceNext(
    resourceGroupName: string,
    namespaceName: string,
    nextLink: string,
    options?: PermissionBindingsListByNamespaceNextOptionalParams,
  ): Promise<PermissionBindingsListByNamespaceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, namespaceName, nextLink, options },
      listByNamespaceNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings/{permissionBindingName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PermissionBinding,
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
    Parameters.namespaceName,
    Parameters.permissionBindingName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings/{permissionBindingName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PermissionBinding,
    },
    201: {
      bodyMapper: Mappers.PermissionBinding,
    },
    202: {
      bodyMapper: Mappers.PermissionBinding,
    },
    204: {
      bodyMapper: Mappers.PermissionBinding,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.permissionBindingInfo,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.permissionBindingName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings/{permissionBindingName}",
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
    Parameters.namespaceName,
    Parameters.permissionBindingName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByNamespaceOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PermissionBindingsListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByNamespaceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PermissionBindingsListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
