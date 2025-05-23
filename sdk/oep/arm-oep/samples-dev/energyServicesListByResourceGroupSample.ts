/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { OpenEnergyPlatformManagementServiceAPIs } from "@azure/arm-oep";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Returns list of oep resources..
 *
 * @summary Returns list of oep resources..
 * x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/OepResource_ListByResourceGroup.json
 */
async function oepResourceListByResourceGroup(): Promise<void> {
  const subscriptionId = "0000000-0000-0000-0000-000000000001";
  const resourceGroupName = "DummyResourceGroupName";
  const credential = new DefaultAzureCredential();
  const client = new OpenEnergyPlatformManagementServiceAPIs(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.energyServices.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

oepResourceListByResourceGroup().catch(console.error);
