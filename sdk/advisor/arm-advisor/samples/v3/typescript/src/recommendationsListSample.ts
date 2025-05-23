/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  RecommendationsListOptionalParams,
  AdvisorManagementClient
} from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations.
 *
 * @summary Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListRecommendations.json
 */
async function listRecommendations() {
  const subscriptionId =
    process.env["ADVISOR_SUBSCRIPTION_ID"] || "subscriptionId";
  const top = 10;
  const options: RecommendationsListOptionalParams = { top };
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.recommendations.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  listRecommendations();
}

main().catch(console.error);
