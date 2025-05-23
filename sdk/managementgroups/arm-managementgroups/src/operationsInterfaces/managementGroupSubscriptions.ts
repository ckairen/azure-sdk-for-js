/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  SubscriptionUnderManagementGroup,
  ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOptionalParams,
  ManagementGroupSubscriptionsCreateOptionalParams,
  ManagementGroupSubscriptionsCreateResponse,
  ManagementGroupSubscriptionsDeleteOptionalParams,
  ManagementGroupSubscriptionsGetSubscriptionOptionalParams,
  ManagementGroupSubscriptionsGetSubscriptionResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ManagementGroupSubscriptions. */
export interface ManagementGroupSubscriptions {
  /**
   * Retrieves details about all subscriptions which are associated with the management group.
   *
   * @param groupId Management Group ID.
   * @param options The options parameters.
   */
  listSubscriptionsUnderManagementGroup(
    groupId: string,
    options?: ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOptionalParams
  ): PagedAsyncIterableIterator<SubscriptionUnderManagementGroup>;
  /**
   * Associates existing subscription with the management group.
   *
   * @param groupId Management Group ID.
   * @param subscriptionId Subscription ID.
   * @param options The options parameters.
   */
  create(
    groupId: string,
    subscriptionId: string,
    options?: ManagementGroupSubscriptionsCreateOptionalParams
  ): Promise<ManagementGroupSubscriptionsCreateResponse>;
  /**
   * De-associates subscription from the management group.
   *
   * @param groupId Management Group ID.
   * @param subscriptionId Subscription ID.
   * @param options The options parameters.
   */
  delete(
    groupId: string,
    subscriptionId: string,
    options?: ManagementGroupSubscriptionsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Retrieves details about given subscription which is associated with the management group.
   *
   * @param groupId Management Group ID.
   * @param subscriptionId Subscription ID.
   * @param options The options parameters.
   */
  getSubscription(
    groupId: string,
    subscriptionId: string,
    options?: ManagementGroupSubscriptionsGetSubscriptionOptionalParams
  ): Promise<ManagementGroupSubscriptionsGetSubscriptionResponse>;
}
