/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get library by name in a workspace.
 *
 * @summary Get library by name in a workspace.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/preview/2021-06-01-preview/examples/Library_Get.json
 */
async function getLibraryByName(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["SYNAPSE_RESOURCE_GROUP"] || "exampleResourceGroup";
  const libraryName = "exampleLibraryName.jar";
  const workspaceName = "exampleWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.library.get(
    resourceGroupName,
    libraryName,
    workspaceName
  );
  console.log(result);
}

async function main(): Promise<void> {
  getLibraryByName();
}

main().catch(console.error);
