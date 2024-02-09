// lib/getGoogleServiceAccountKey.js

import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

export async function getGoogleServiceAccountKey() {
  const secretName = "google_service_key.json";
  const client = new SecretsManagerClient({ region: "us-east-2" });
  
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT"
      })
    );
    return response.SecretString;
  } catch (error) {
    console.error("Error retrieving secret:", error);
    throw error;
  }
}
