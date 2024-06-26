// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates getting a setting only if it has changed
 * from what you already have. (This allows your app to avoid downloading
 * the contents of a setting if the value is unchanged.)
 * @azsdk-weight 60
 */
import { AppConfigurationClient } from "@azure/app-configuration";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("Running get setting only if changed sample");

  // Set the following environment variable or edit the value on the following line.
  const endpoint = process.env["AZ_CONFIG_ENDPOINT"] || "<endpoint>";

  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationClient(endpoint, credential);

  const key = "getSettingOnlyIfChangedExample";
  await cleanupSampleValues([key], client);

  const addedSetting = await client.addConfigurationSetting({ key, value: "Initial value" });

  // now our application only wants to download the setting if it's changed
  console.log("Checking to see if the value has changed using the etag and ifNoneMatch");

  const unchangedResponse = await client.getConfigurationSetting(addedSetting, {
    // onlyIfChanged allows us to say "get me the value only if it doesn't match the one I already have"
    // this allows us to avoid transferring the setting if nothing has changed.
    onlyIfChanged: true,
  });

  // we return the response so you can still inspect the returned headers. The body, however, is blank
  console.log(`Received a response code of ${unchangedResponse.statusCode}`); // will be HTTP status 304

  // To prevent any accidental usages of this model all properties (except for 'key') are set to undefined.
  if (unchangedResponse.value !== undefined) {
    throw new Error("All properties should be undefined");
  }

  await cleanupSampleValues([key], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const existingSettings = client.listConfigurationSettings({
    keyFilter: keys.join(","),
  });

  for await (const setting of existingSettings) {
    await client.setReadOnly(setting, false);
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
