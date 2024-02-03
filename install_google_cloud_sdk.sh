#!/bin/bash

# Remove newline characters from GOOGLE_SERVICE_KEY
cleaned_key=$(echo "$GOOGLE_SERVICE_KEY" | tr -d '\n')

# Install Google Cloud SDK
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-361.0.0-linux-x86_64.tar.gz
tar -xzf google-cloud-sdk-361.0.0-linux-x86_64.tar.gz
./google-cloud-sdk/install.sh
source ~/.bashrc

# Create a temporary file for the cleaned service account key content
echo "$cleaned_key" | base64 --decode > /tmp/service-account-key.json

# Authenticate using the temporary service account key file
gcloud auth activate-service-account --key-file=/tmp/service-account-key.json

# Other necessary commands for deployment

# Remove the temporary file
rm /tmp/service-account-key.json
