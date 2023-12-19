---
title: "How to Backup Virtual Servers"
author: "Ilia Ross"
weight: 2160
---

This tutorial provides detailed steps for creating a backup of a virtual server in Virtualmin.

### How to backup a virtual server

Regular backups are essential for safeguarding your data. Follow this procedure to backup a Virtual Server within Virtualmin:

1. **Click Backup and Restore**  
   Navigate to the **Backup and Restore** section after logging into Virtualmin.

2. **Click Backup Virtual Servers**  
   Select **Backup Virtual Servers** to access the backup options.

3. **Select servers to save**  
   Choose which servers you would like to backup. You can select all, specific ones, or all except certain servers.

4. **Features and settings**  
   Decide on what features to backup such as server configuration, databases, and email data. You can backup all features or select specific ones.

5. **Destination and format**  
   In the **Backup destination** section, choose **Download to browser** if you want to directly download the backup file to your computer or choose among the other destinations, such as **Local file or directory**, **FTP server**, **SSH server**, **Webmin server**, **Amazon S3 bucket** or **Rackspace Cloud Files**.

6. **Backup Now**  
   Click **Backup Now** to initiate the backup process.

After clicking **Backup Now**, the system will create a backup of the selected virtual server(s) and provide the download link for the backup file. You'll have options to encrypt the backup, choose the backup format, and set the frequency of the backup as per your requirements.
