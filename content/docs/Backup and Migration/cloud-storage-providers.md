---
title: "Cloud Storage Providers"
author: "Ilia Ross"
date: 2024-01-10
weight: 2510510
---

Virtualmin supports various cloud storage providers for backing up your virtual servers. Here's how you can configure each of them.

### Amazon S3 and compatible services

Amazon S3 (Simple Storage Service) provides scalable object storage suitable for backup and archival of data. To set up Amazon S3 with Virtualmin, you need to have your security credentials ready and configure your Virtualmin system accordingly.

1. Log into the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to the [Security Credentials](https://console.aws.amazon.com/iam/home#/security_credentials) page in your AWS account.
3. Here, you can find your access key ID and secret access key. If you have not created an access key yet, you can do so on this page. Make sure to download and safely store the provided credentials, as the secret access key is only displayed once and cannot be retrieved again.
4. In Virtualmin, go to **Backup and Restore ⇾ Cloud Storage Providers ⇾ Amazon S3** page. Enter the AWS access key ID and secret access key that you obtained from the AWS Security Credentials page.
    Furthermore, take into account the following:

    - **S3-compatible server hostname**  
    If you are using a service with an API compatible with Amazon S3, input the API endpoint URL here. This will apply to all backups to that service.

    - **Default S3 login**  
    Set the default login and password for Amazon S3 to avoid entering them for each backup. These credentials are also used by the S3 API and shell commands if no keys are specified.

    - **S3 bucket management**  
    Virtualmin can manage S3 bucket settings, like access control lists and lifecycle policies, to set up permissions, automatic deletions, or movement to Amazon Glacier. These settings can be accessed through the **Backup and Restore ⇾ Amazon S3 Buckets** page.
    Alternatively, you can configure your bucket setting on AWS, by selecting the appropriate S3 bucket where you wish to store your backups. If you haven't created a bucket yet, you can do this through the [S3 Management Console](https://s3.console.aws.amazon.com/s3/home) on AWS.
    {{< note "Choose the correct region that corresponds with your S3 bucket location. This is crucial as AWS S3 operates in multiple geographical regions around the world." "Note:" "notification" >}}


### Azure Blob Storage
To use Azure Blob Storage:

1. Create an Azure Account, sign up for an account with Microsoft Azure if you don't have one already. You can do this at the [Azure Portal](https://portal.azure.com/) page.

2. Install the Azure Command-Line Interface (CLI) on the system where Virtualmin is running. The Azure CLI is a set of commands used to manage Azure resources. The installation guide is available on the [Azure CLI documentation](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).
3. After installing the Azure CLI, open your command-line interface and enter the following command to log in to your Azure account:
    ```bash
    az login --use-device-code
    ```
    A device code will be provided, which you need to enter at the prompted Microsoft page to authenticate your CLI session.

4. Once authenticated, you'll need follow on-screen instructions to complete the setup.

### Backblaze B2
To configure Backblaze B2 as a backup destination:

1. If you are not already a Backblaze user, sign up for an account at [Backblaze](https://www.backblaze.com/). This account will provide you with access to Backblaze's storage solutions.
2. Once you have a Backblaze account, log in and navigate to the **My Settings** page. Look for the **B2 Cloud Storage** option and enable it under **Enabled Products** section.
3. Go to the **Application Keys** page within your Backblaze B2 dashboard, and create a new application key. Ensure that you grant all necessary capabilities to this key so that Virtualmin can perform backup and restore operations without any permission issues.
4. In Virtualmin, head over to **Backup and Restore ⇾ Cloud Storage Providers ⇾ Backblaze**. Enter the key ID and application key that you generated from the Backblaze B2 dashboard.

### Dropbox
To configure Dropbox as a backup destination:

1. Register a Dropbox account unless you already have one.
2. In Virtualmin, navigate to **Backup and Restore ⇾ Cloud Storage Providers ⇾ Dropbox** and input your **Dropbox account** email address.
3. You will further need to authorize Virtualmin from Dropbox to allow access.

### Google Cloud Storage
To use Google Cloud Storage for backups, connect your account to Virtualmin as follows:

1. Log in to the [Google Cloud Console](https://console.cloud.google.com/cloud-resource-manager) and note your project ID.
2. Navigate to [APIs & Services ⇾ Credentials](https://console.cloud.google.com/apis/credentials), and create an OAuth 2.0 client ID.
3. In Virtualmin, go to **Backup and Restore ⇾ Cloud Storage Providers ⇾ Google Cloud Storage** and fill in the details as instructed to complete the process.
4. Begin the OAuth 2.0 enrollment process, authorize Virtualmin, and enter the provided code back in Virtualmin.

#### Google Drive
For Google Drive backups follow similar steps provided above for [Google Cloud Storage](#google-cloud-storage).

### Rackspace Cloud Files
To configure Rackspace Cloud Files as a backup destination:

1. If you don't already have a Rackspace account, you will need to register one. This account will provide you with access to Rackspace services, including Cloud Files.
2. In Virtualmin, navigate to **Backup and Restore ⇾ Cloud Storage Providers ⇾ Rackspace Cloud Files** page.
3. Input your **Rackspace username** and **Rackspace API key** into the designated fields. These credentials are used by Virtualmin to authenticate with Rackspace and manage cloud storage resources.
