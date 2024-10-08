// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the Indexer Operations.
 */

import {
  SearchIndexerClient,
  AzureKeyCredential,
  SearchIndexer,
  SearchIndexerStatus
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const apiKey = process.env.SEARCH_API_ADMIN_KEY || "";
const dataSourceName = process.env.DATA_SOURCE_NAME || "";
const targetIndexName = process.env.TARGET_INDEX_NAME || "";

const indexerName = "example-indexer-sample-1";

async function createIndexer(indexerName: string, client: SearchIndexerClient) {
  console.log(`Creating Indexer Operation`);
  const indexer: SearchIndexer = {
    name: indexerName,
    description: "Description for Sample Indexer",
    dataSourceName,
    targetIndexName,
    isDisabled: false
  };
  await client.createIndexer(indexer);
}

async function getAndUpdateIndexer(indexerName: string, client: SearchIndexerClient) {
  console.log(`Get And Update Indexer Operation`);
  const indexer: SearchIndexer = await client.getIndexer(indexerName);
  indexer.isDisabled = true;
  await client.createOrUpdateIndexer(indexer);
  indexer.isDisabled = false;
  await client.createOrUpdateIndexer(indexer);
}

async function getIndexerStatus(indexerName: string, client: SearchIndexerClient) {
  console.log(`Get Indexer Status Operation`);
  const indexerStatus: SearchIndexerStatus = await client.getIndexerStatus(indexerName);
  console.log(`Status: ${indexerStatus.status}`);
  console.log(`Limits`);
  console.log(`******`);
  console.log(
    `MaxDocumentContentCharactersToExtract: ${indexerStatus.limits.maxDocumentContentCharactersToExtract}`
  );
  console.log(`MaxDocumentExtractionSize: ${indexerStatus.limits.maxDocumentExtractionSize}`);
  console.log(`MaxRunTime: ${indexerStatus.limits.maxRunTime}`);
}

async function listIndexers(client: SearchIndexerClient) {
  console.log(`List Indexers Operation`);
  const listOfIndexers: Array<SearchIndexer> = await client.listIndexers();

  console.log(`\tList of Indexers`);
  console.log(`\t****************`);
  for (const indexer of listOfIndexers) {
    const { schedule, parameters } = indexer;
    console.log(`Name: ${indexer.name}`);
    console.log(`Description: ${indexer.description}`);
    console.log(`Data Source Name: ${indexer.dataSourceName}`);
    console.log(`Skillset Name: ${indexer.skillsetName}`);
    console.log(`Target Index Name: ${indexer.targetIndexName}`);
    console.log(`Indexing Schedule`);
    console.log(`\tInterval: ${schedule && schedule.interval}`);
    console.log(`\tStart Time: ${schedule && schedule.startTime}`);
    console.log(`Is Disabled: ${indexer.isDisabled}`);
    console.log(`ETag: ${indexer.etag}`);
    console.log(`Parameters`);
    console.log(`\tBatch Size: ${parameters && parameters.batchSize}`);
    console.log(`\tMax Failed Items: ${parameters && parameters.maxFailedItems}`);
    console.log(`\tMax Failed Items Per Batch: ${parameters && parameters.maxFailedItemsPerBatch}`);
    console.log();
  }
}

async function resetIndexer(indexerName: string, client: SearchIndexerClient) {
  console.log(`Reset Indexer Operation`);
  await client.resetIndexer(indexerName);
}

async function deleteIndexer(indexerName: string, client: SearchIndexerClient) {
  console.log(`Deleting Indexer Operation`);
  await client.deleteIndexer(indexerName);
}

async function runIndexer(indexerName: string, client: SearchIndexerClient) {
  console.log(`Run Indexer Operation`);
  await client.runIndexer(indexerName);
}

async function main() {
  console.log(`Running Indexer Operations Sample....`);
  if (!endpoint || !apiKey || !dataSourceName || !targetIndexName) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  try {
    await createIndexer(indexerName, client);
    await getAndUpdateIndexer(indexerName, client);
    await getIndexerStatus(indexerName, client);
    await listIndexers(client);
    await resetIndexer(indexerName, client);
    await runIndexer(indexerName, client);
  } finally {
    await deleteIndexer(indexerName, client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
