/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ScriptCmdlet,
  ScriptCmdletsListOptionalParams,
  ScriptCmdletsGetOptionalParams,
  ScriptCmdletsGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ScriptCmdlets. */
export interface ScriptCmdlets {
  /**
   * List ScriptCmdlet resources by ScriptPackage
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param scriptPackageName Name of the script package.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    privateCloudName: string,
    scriptPackageName: string,
    options?: ScriptCmdletsListOptionalParams,
  ): PagedAsyncIterableIterator<ScriptCmdlet>;
  /**
   * Get a ScriptCmdlet
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param scriptPackageName Name of the script package.
   * @param scriptCmdletName Name of the script cmdlet.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    privateCloudName: string,
    scriptPackageName: string,
    scriptCmdletName: string,
    options?: ScriptCmdletsGetOptionalParams,
  ): Promise<ScriptCmdletsGetResponse>;
}
