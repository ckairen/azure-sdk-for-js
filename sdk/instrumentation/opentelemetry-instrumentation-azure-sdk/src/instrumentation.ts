// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Instrumentation,
  InstrumentationConfig,
  InstrumentationModuleDefinition,
} from "@opentelemetry/instrumentation";
import {
  InstrumentationBase,
  InstrumentationNodeModuleDefinition,
} from "@opentelemetry/instrumentation";

import { OpenTelemetryInstrumenter } from "./instrumenter.js";
import { SDK_VERSION } from "./configuration.js";

/**
 * Configuration options that can be passed to {@link createAzureSdkInstrumentation} function.
 */
export interface AzureSdkInstrumentationOptions extends InstrumentationConfig {}

/**
 * The instrumentation module for the Azure SDK. Implements OpenTelemetry's {@link Instrumentation}.
 */
export class AzureSdkInstrumentation extends InstrumentationBase {
  constructor(options: AzureSdkInstrumentationOptions = {}) {
    super(
      "@azure/opentelemetry-instrumentation-azure-sdk",
      SDK_VERSION,
      Object.assign({}, options),
    );
  }
  /**
   * Entrypoint for the module registration.
   *
   * @returns The patched \@azure/core-tracing module after setting its instrumenter.
   */
  protected init(): void | InstrumentationModuleDefinition | InstrumentationModuleDefinition[] {
    const result: InstrumentationModuleDefinition = new InstrumentationNodeModuleDefinition(
      "@azure/core-tracing",
      ["^1.0.0-preview.14", "^1.0.0"],
      (moduleExports) => {
        if (typeof moduleExports.useInstrumenter === "function") {
          moduleExports.useInstrumenter(new OpenTelemetryInstrumenter());
        }

        return moduleExports;
      },
    );
    // Needed to support 1.0.0-preview.14
    result.includePrerelease = true;
    return result;
  }
}

/**
 * Enables Azure SDK Instrumentation using OpenTelemetry for Azure SDK client libraries.
 *
 * When registered, any Azure data plane package will begin emitting tracing spans for internal calls
 * as well as network calls
 *
 * Example usage:
 * ```ts snippet:instrumentation_usage
 * import { registerInstrumentations } from "@opentelemetry/instrumentation";
 * import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
 *
 * registerInstrumentations({
 *   instrumentations: [createAzureSdkInstrumentation()],
 * });
 * ```
 *
 * @remarks
 *
 * As OpenTelemetry instrumentations rely on patching required modules, you should register
 * this instrumentation as early as possible and before loading any Azure Client Libraries.
 */
export function createAzureSdkInstrumentation(
  options: AzureSdkInstrumentationOptions = {},
): Instrumentation {
  return new AzureSdkInstrumentation(options);
}
