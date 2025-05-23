/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  DataBoxEdgeDevice,
  DevicesListBySubscriptionOptionalParams,
  DevicesListByResourceGroupOptionalParams,
  DevicesGetOptionalParams,
  DevicesGetResponse,
  DevicesCreateOrUpdateOptionalParams,
  DevicesCreateOrUpdateResponse,
  DevicesDeleteOptionalParams,
  DataBoxEdgeDevicePatch,
  DevicesUpdateOptionalParams,
  DevicesUpdateResponse,
  DevicesDownloadUpdatesOptionalParams,
  DevicesGetExtendedInformationOptionalParams,
  DevicesGetExtendedInformationResponse,
  DevicesInstallUpdatesOptionalParams,
  DevicesGetNetworkSettingsOptionalParams,
  DevicesGetNetworkSettingsResponse,
  DevicesScanForUpdatesOptionalParams,
  SecuritySettings,
  DevicesCreateOrUpdateSecuritySettingsOptionalParams,
  DevicesGetUpdateSummaryOptionalParams,
  DevicesGetUpdateSummaryResponse,
  UploadCertificateRequest,
  DevicesUploadCertificateOptionalParams,
  DevicesUploadCertificateResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Devices. */
export interface Devices {
  /**
   * Gets all the Data Box Edge/Data Box Gateway devices in a subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: DevicesListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<DataBoxEdgeDevice>;
  /**
   * Gets all the Data Box Edge/Data Box Gateway devices in a resource group.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: DevicesListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<DataBoxEdgeDevice>;
  /**
   * Gets the properties of the Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  get(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesGetOptionalParams
  ): Promise<DevicesGetResponse>;
  /**
   * Creates or updates a Data Box Edge/Data Box Gateway resource.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param dataBoxEdgeDevice The resource object.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    deviceName: string,
    resourceGroupName: string,
    dataBoxEdgeDevice: DataBoxEdgeDevice,
    options?: DevicesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DevicesCreateOrUpdateResponse>,
      DevicesCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a Data Box Edge/Data Box Gateway resource.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param dataBoxEdgeDevice The resource object.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    deviceName: string,
    resourceGroupName: string,
    dataBoxEdgeDevice: DataBoxEdgeDevice,
    options?: DevicesCreateOrUpdateOptionalParams
  ): Promise<DevicesCreateOrUpdateResponse>;
  /**
   * Deletes the Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginDelete(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Deletes the Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDeleteOptionalParams
  ): Promise<void>;
  /**
   * Modifies a Data Box Edge/Data Box Gateway resource.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param parameters The resource parameters.
   * @param options The options parameters.
   */
  update(
    deviceName: string,
    resourceGroupName: string,
    parameters: DataBoxEdgeDevicePatch,
    options?: DevicesUpdateOptionalParams
  ): Promise<DevicesUpdateResponse>;
  /**
   * Downloads the updates on a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginDownloadUpdates(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDownloadUpdatesOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Downloads the updates on a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginDownloadUpdatesAndWait(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDownloadUpdatesOptionalParams
  ): Promise<void>;
  /**
   * Gets additional information for the specified Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  getExtendedInformation(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesGetExtendedInformationOptionalParams
  ): Promise<DevicesGetExtendedInformationResponse>;
  /**
   * Installs the updates on the Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginInstallUpdates(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesInstallUpdatesOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Installs the updates on the Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginInstallUpdatesAndWait(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesInstallUpdatesOptionalParams
  ): Promise<void>;
  /**
   * Gets the network settings of the specified Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  getNetworkSettings(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesGetNetworkSettingsOptionalParams
  ): Promise<DevicesGetNetworkSettingsResponse>;
  /**
   * Scans for updates on a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginScanForUpdates(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesScanForUpdatesOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Scans for updates on a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginScanForUpdatesAndWait(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesScanForUpdatesOptionalParams
  ): Promise<void>;
  /**
   * Updates the security settings on a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param securitySettings The security settings.
   * @param options The options parameters.
   */
  beginCreateOrUpdateSecuritySettings(
    deviceName: string,
    resourceGroupName: string,
    securitySettings: SecuritySettings,
    options?: DevicesCreateOrUpdateSecuritySettingsOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Updates the security settings on a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param securitySettings The security settings.
   * @param options The options parameters.
   */
  beginCreateOrUpdateSecuritySettingsAndWait(
    deviceName: string,
    resourceGroupName: string,
    securitySettings: SecuritySettings,
    options?: DevicesCreateOrUpdateSecuritySettingsOptionalParams
  ): Promise<void>;
  /**
   * Gets information about the availability of updates based on the last scan of the device. It also
   * gets information about any ongoing download or install jobs on the device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  getUpdateSummary(
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesGetUpdateSummaryOptionalParams
  ): Promise<DevicesGetUpdateSummaryResponse>;
  /**
   * Uploads registration certificate for the device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param parameters The upload certificate request.
   * @param options The options parameters.
   */
  uploadCertificate(
    deviceName: string,
    resourceGroupName: string,
    parameters: UploadCertificateRequest,
    options?: DevicesUploadCertificateOptionalParams
  ): Promise<DevicesUploadCertificateResponse>;
}
