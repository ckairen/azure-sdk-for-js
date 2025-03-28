/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  LocalizableString,
  EventCategoriesListOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a EventCategories. */
export interface EventCategories {
  /**
   * Get the list of available event categories supported in the Activity Logs Service.<br>The current
   * list includes the following: Administrative, Security, ServiceHealth, Alert, Recommendation, Policy.
   * @param options The options parameters.
   */
  list(
    options?: EventCategoriesListOptionalParams
  ): PagedAsyncIterableIterator<LocalizableString>;
}
