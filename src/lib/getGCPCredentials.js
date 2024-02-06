export function getGCPCredentials(){

  const privateKey = process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/"/g, '');
    // for Vercel, use environment variables
    return process.env.GCP_PRIVATE_KEY
      ? {
          credentials: {
            client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
            private_key: privateKey,
          },
          projectId: process.env.GCP_PROJECT_ID,
        }
        // for local development, use gcloud CLI
      : {};
  };
  