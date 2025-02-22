/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CheckNameAvailability } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MariaDBManagementClient } from "../mariaDBManagementClient.js";
import {
  NameAvailabilityRequest,
  CheckNameAvailabilityExecuteOptionalParams,
  CheckNameAvailabilityExecuteResponse
} from "../models/index.js";

/** Class containing CheckNameAvailability operations. */
export class CheckNameAvailabilityImpl implements CheckNameAvailability {
  private readonly client: MariaDBManagementClient;

  /**
   * Initialize a new instance of the class CheckNameAvailability class.
   * @param client Reference to the service client
   */
  constructor(client: MariaDBManagementClient) {
    this.client = client;
  }

  /**
   * Check the availability of name for resource
   * @param nameAvailabilityRequest The required parameters for checking if resource name is available.
   * @param options The options parameters.
   */
  execute(
    nameAvailabilityRequest: NameAvailabilityRequest,
    options?: CheckNameAvailabilityExecuteOptionalParams
  ): Promise<CheckNameAvailabilityExecuteResponse> {
    return this.client.sendOperationRequest(
      { nameAvailabilityRequest, options },
      executeOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const executeOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMariaDB/checkNameAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.NameAvailability
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.nameAvailabilityRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
