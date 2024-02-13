export const getGCPCredentials = () => {
    // const privateKey = process.env.GCP_PRIVATE_KEY.replace(/\n/g, '').replace(/"/g, ''); ;
    // console.log("privateKey:",privateKey);

    // for Vercel, use environment variables
    return process.env.GCP_PRIVATE_KEY
      ? {
          credentials: {
            client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
            // private_key: privateKey,
            private_key: process.env.GCP_PRIVATE_KEY,
          },
          projectId: process.env.GCP_PROJECT_ID,
        }
        // for local development, use gcloud CLI
      : {};
  };