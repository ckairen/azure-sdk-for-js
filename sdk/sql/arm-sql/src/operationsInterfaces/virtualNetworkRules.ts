/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  VirtualNetworkRule,
  VirtualNetworkRulesListByServerOptionalParams,
  VirtualNetworkRulesGetOptionalParams,
  VirtualNetworkRulesGetResponse,
  VirtualNetworkRulesCreateOrUpdateOptionalParams,
  VirtualNetworkRulesCreateOrUpdateResponse,
  VirtualNetworkRulesDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a VirtualNetworkRules. */
export interface VirtualNetworkRules {
  /**
   * Gets a list of virtual network rules in a server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param options The options parameters.
   */
  listByServer(
    resourceGroupName: string,
    serverName: string,
    options?: VirtualNetworkRulesListByServerOptionalParams,
  ): PagedAsyncIterableIterator<VirtualNetworkRule>;
  /**
   * Gets a virtual network rule.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param virtualNetworkRuleName The name of the virtual network rule.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    options?: VirtualNetworkRulesGetOptionalParams,
  ): Promise<VirtualNetworkRulesGetResponse>;
  /**
   * Creates or updates an existing virtual network rule.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param virtualNetworkRuleName The name of the virtual network rule.
   * @param parameters The requested virtual Network Rule Resource state.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    parameters: VirtualNetworkRule,
    options?: VirtualNetworkRulesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualNetworkRulesCreateOrUpdateResponse>,
      VirtualNetworkRulesCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates an existing virtual network rule.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param virtualNetworkRuleName The name of the virtual network rule.
   * @param parameters The requested virtual Network Rule Resource state.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    parameters: VirtualNetworkRule,
    options?: VirtualNetworkRulesCreateOrUpdateOptionalParams,
  ): Promise<VirtualNetworkRulesCreateOrUpdateResponse>;
  /**
   * Deletes the virtual network rule with the given name.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param virtualNetworkRuleName The name of the virtual network rule.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    options?: VirtualNetworkRulesDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes the virtual network rule with the given name.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param virtualNetworkRuleName The name of the virtual network rule.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    options?: VirtualNetworkRulesDeleteOptionalParams,
  ): Promise<void>;
}
