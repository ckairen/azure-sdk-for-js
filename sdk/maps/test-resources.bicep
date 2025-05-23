param baseName string = resourceGroup().name
param location string = resourceGroup().location
param supportsSafeSecretStandard bool = false
param testApplicationOid string

var mapsDataContributerRoleId = '8f5e0ce6-4f7b-4dcf-bddf-e6f48634a204'
var mapsAccountName = guid(resourceGroup().id, deployment().name, baseName)

// Microsoft.Maps/accounts resource
resource mapsAccount 'Microsoft.Maps/accounts@2024-07-01-preview' = {
  name: mapsAccountName
  location: location
  sku: {
    name: 'G2'
  }
  kind: 'Gen2'
  identity: {
    type: 'None'
  }
  properties: {
    disableLocalAuth: supportsSafeSecretStandard
    cors: {
      corsRules: [
        {
          allowedOrigins: [
            '*'
          ]
        }
      ]
    }
  }
}

// Microsoft.Authorization/roleAssignments resource
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(mapsAccount.id, mapsDataContributerRoleId, testApplicationOid)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', mapsDataContributerRoleId)
    principalId: testApplicationOid
  }
}

// Outputs
output MAPS_RESOURCE_CLIENT_ID string = mapsAccount.properties.uniqueId
