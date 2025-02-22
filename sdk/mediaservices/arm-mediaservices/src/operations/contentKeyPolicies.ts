/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { ContentKeyPolicies } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureMediaServices } from "../azureMediaServices.js";
import {
  ContentKeyPolicy,
  ContentKeyPoliciesListNextOptionalParams,
  ContentKeyPoliciesListOptionalParams,
  ContentKeyPoliciesListResponse,
  ContentKeyPoliciesGetOptionalParams,
  ContentKeyPoliciesGetResponse,
  ContentKeyPoliciesCreateOrUpdateOptionalParams,
  ContentKeyPoliciesCreateOrUpdateResponse,
  ContentKeyPoliciesDeleteOptionalParams,
  ContentKeyPoliciesUpdateOptionalParams,
  ContentKeyPoliciesUpdateResponse,
  ContentKeyPoliciesGetPolicyPropertiesWithSecretsOptionalParams,
  ContentKeyPoliciesGetPolicyPropertiesWithSecretsResponse,
  ContentKeyPoliciesListNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ContentKeyPolicies operations. */
export class ContentKeyPoliciesImpl implements ContentKeyPolicies {
  private readonly client: AzureMediaServices;

  /**
   * Initialize a new instance of the class ContentKeyPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: AzureMediaServices) {
    this.client = client;
  }

  /**
   * Lists the Content Key Policies in the account
   * @param resourceGroupName The name of the resource group within the Azure subscription.
   * @param accountName The Media Services account name.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    accountName: string,
    options?: ContentKeyPoliciesListOptionalParams
  ): PagedAsyncIterableIterator<ContentKeyPolicy> {
    const iter = this.listPagingAll(resourceGroupName, accountName, options);
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
        return this.listPagingPage(
          resourceGroupName,
          accountName,
          options,
          settings
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    accountName: string,
    options?: ContentKeyPoliciesListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<ContentKeyPolicy[]> {
    let result: ContentKeyPoliciesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, accountName, options);
      let page = result.value || [];
      continuationToken = result.odataNextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        accountName,
        continuationToken,
        options
      );
      continuationToken = result.odataNextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    accountName: string,
    options?: ContentKeyPoliciesListOptionalParams
  ): AsyncIterableIterator<ContentKeyPolicy> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      accountName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists the Content Key Policies in the account
   * @param resourceGroupName The name of the resource group within the Azure subscription.
   * @param accountName The Media Services account name.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    accountName: string,
    options?: ContentKeyPoliciesListOptionalParams
  ): Promise<ContentKeyPoliciesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      listOperationSpec
    );
  }

  /**
   * Get the details of a Content Key Policy in the Media Services account
   * @param resourceGroupName The name of the resource group within the Azure subscription.
   * @param accountName The Media Services account name.
   * @param contentKeyPolicyName The Content Key Policy name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    contentKeyPolicyName: string,
    options?: ContentKeyPoliciesGetOptionalParams
  ): Promise<ContentKeyPoliciesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, contentKeyPolicyName, options },
      getOperationSpec
    );
  }

  /**
   * Create or update a Content Key Policy in the Media Services account
   * @param resourceGroupName The name of the resource group within the Azure subscription.
   * @param accountName The Media Services account name.
   * @param contentKeyPolicyName The Content Key Policy name.
   * @param parameters The request parameters
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    accountName: string,
    contentKeyPolicyName: string,
    parameters: ContentKeyPolicy,
    options?: ContentKeyPoliciesCreateOrUpdateOptionalParams
  ): Promise<ContentKeyPoliciesCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        contentKeyPolicyName,
        parameters,
        options
      },
      createOrUpdateOperationSpec
    );
  }

  /**
   * Deletes a Content Key Policy in the Media Services account
   * @param resourceGroupName The name of the resource group within the Azure subscription.
   * @param accountName The Media Services account name.
   * @param contentKeyPolicyName The Content Key Policy name.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    accountName: string,
    contentKeyPolicyName: string,
    options?: ContentKeyPoliciesDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, contentKeyPolicyName, options },
      deleteOperationSpec
    );
  }

  /**
   * Updates an existing Content Key Policy in the Media Services account
   * @param resourceGroupName The name of the resource group within the Azure subscription.
   * @param accountName The Media Services account name.
   * @param contentKeyPolicyName The Content Key Policy name.
   * @param parameters The request parameters
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    accountName: string,
    contentKeyPolicyName: string,
    parameters: ContentKeyPolicy,
    options?: ContentKeyPoliciesUpdateOptionalParams
  ): Promise<ContentKeyPoliciesUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        contentKeyPolicyName,
        parameters,
        options
      },
      updateOperationSpec
    );
  }

  /**
   * Get a Content Key Policy including secret values
   * @param resourceGroupName The name of the resource group within the Azure subscription.
   * @param accountName The Media Services account name.
   * @param contentKeyPolicyName The Content Key Policy name.
   * @param options The options parameters.
   */
  getPolicyPropertiesWithSecrets(
    resourceGroupName: string,
    accountName: string,
    contentKeyPolicyName: string,
    options?: ContentKeyPoliciesGetPolicyPropertiesWithSecretsOptionalParams
  ): Promise<ContentKeyPoliciesGetPolicyPropertiesWithSecretsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, contentKeyPolicyName, options },
      getPolicyPropertiesWithSecretsOperationSpec
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group within the Azure subscription.
   * @param accountName The Media Services account name.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    accountName: string,
    nextLink: string,
    options?: ContentKeyPoliciesListNextOptionalParams
  ): Promise<ContentKeyPoliciesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Media/mediaServices/{accountName}/contentKeyPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ContentKeyPolicyCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Media/mediaServices/{accountName}/contentKeyPolicies/{contentKeyPolicyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ContentKeyPolicy
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.contentKeyPolicyName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Media/mediaServices/{accountName}/contentKeyPolicies/{contentKeyPolicyName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ContentKeyPolicy
    },
    201: {
      bodyMapper: Mappers.ContentKeyPolicy
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters11,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.contentKeyPolicyName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Media/mediaServices/{accountName}/contentKeyPolicies/{contentKeyPolicyName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.contentKeyPolicyName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Media/mediaServices/{accountName}/contentKeyPolicies/{contentKeyPolicyName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ContentKeyPolicy
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters11,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.contentKeyPolicyName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getPolicyPropertiesWithSecretsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Media/mediaServices/{accountName}/contentKeyPolicies/{contentKeyPolicyName}/getPolicyPropertiesWithSecrets",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ContentKeyPolicyProperties
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.contentKeyPolicyName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ContentKeyPolicyCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
