/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Updates properties for a Project resource. Properties not specified in the request body will be unchanged.
 *
 * @summary Updates properties for a Project resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-03-01/examples/Projects_Update.json
 */
async function projectsUpdate() {
  const subscriptionId =
    process.env["STORAGEMOVER_SUBSCRIPTION_ID"] || "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = process.env["STORAGEMOVER_RESOURCE_GROUP"] || "examples-rg";
  const storageMoverName = "examples-storageMoverName";
  const projectName = "examples-projectName";
  const project = {
    description: "Example Project Description",
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.projects.update(
    resourceGroupName,
    storageMoverName,
    projectName,
    project
  );
  console.log(result);
}

async function main() {
  projectsUpdate();
}

main().catch(console.error);