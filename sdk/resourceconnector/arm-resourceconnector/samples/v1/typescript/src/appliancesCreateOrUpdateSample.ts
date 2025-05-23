/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  Appliance,
  ResourceConnectorManagementClient
} from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an Appliance in the specified Subscription and Resource Group.
 *
 * @summary Creates or updates an Appliance in the specified Subscription and Resource Group.
 * x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesCreate_Update.json
 */
async function createOrUpdateAppliance(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCECONNECTOR_SUBSCRIPTION_ID"] ||
    "11111111-2222-3333-4444-555555555555";
  const resourceGroupName =
    process.env["RESOURCECONNECTOR_RESOURCE_GROUP"] || "testresourcegroup";
  const resourceName = "appliance01";
  const parameters: Appliance = {
    distro: "AKSEdge",
    infrastructureConfig: { provider: "VMWare" },
    location: "West US"
  };
  const credential = new DefaultAzureCredential();
  const client = new ResourceConnectorManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.appliances.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    parameters
  );
  console.log(result);
}

async function main(): Promise<void> {
  createOrUpdateAppliance();
}

main().catch(console.error);
