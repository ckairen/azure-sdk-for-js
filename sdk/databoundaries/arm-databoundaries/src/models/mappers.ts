/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";

export const DataBoundaryProperties: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DataBoundaryProperties",
    modelProperties: {
      dataBoundary: {
        serializedName: "dataBoundary",
        type: {
          name: "String",
        },
      },
      provisioningState: {
        serializedName: "provisioningState",
        readOnly: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const Resource: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Resource",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      systemData: {
        serializedName: "systemData",
        type: {
          name: "Composite",
          className: "SystemData",
        },
      },
    },
  },
};

export const SystemData: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SystemData",
    modelProperties: {
      createdBy: {
        serializedName: "createdBy",
        type: {
          name: "String",
        },
      },
      createdByType: {
        serializedName: "createdByType",
        type: {
          name: "String",
        },
      },
      createdAt: {
        serializedName: "createdAt",
        type: {
          name: "DateTime",
        },
      },
      lastModifiedBy: {
        serializedName: "lastModifiedBy",
        type: {
          name: "String",
        },
      },
      lastModifiedByType: {
        serializedName: "lastModifiedByType",
        type: {
          name: "String",
        },
      },
      lastModifiedAt: {
        serializedName: "lastModifiedAt",
        type: {
          name: "DateTime",
        },
      },
    },
  },
};

export const ErrorResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorResponse",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ErrorDetail",
        },
      },
    },
  },
};

export const ErrorDetail: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorDetail",
    modelProperties: {
      code: {
        serializedName: "code",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      message: {
        serializedName: "message",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      target: {
        serializedName: "target",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      details: {
        serializedName: "details",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ErrorDetail",
            },
          },
        },
      },
      additionalInfo: {
        serializedName: "additionalInfo",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ErrorAdditionalInfo",
            },
          },
        },
      },
    },
  },
};

export const ErrorAdditionalInfo: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorAdditionalInfo",
    modelProperties: {
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      info: {
        serializedName: "info",
        readOnly: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } },
        },
      },
    },
  },
};

export const ProxyResource: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ProxyResource",
    modelProperties: {
      ...Resource.type.modelProperties,
    },
  },
};

export const DataBoundaryDefinition: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DataBoundaryDefinition",
    modelProperties: {
      ...ProxyResource.type.modelProperties,
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "DataBoundaryProperties",
        },
      },
    },
  },
};
