---
title: "How to Backup Virtual Servers On Schedule"
author: "Ilia Ross"
weight: 2165000
---

This tutorial details the process for an administrative user to schedule backups for virtual servers in Virtualmin.

### How to schedule a backup

Regular backups are a critical component of data protection strategies. If you're logged in as the root user in Virtualmin, you can set a schedule for automatic backups of all your virtual servers with the following steps:

1. **Click Backup and Restore**  
   Find and click on the **Backup and Restore** option.

2. **Click Scheduled Backups**  
   Select **Scheduled Backups** to manage backup timings.

3. **Add a new backup schedule**  
   Click on **Add a new backup schedule** to define a new backup routine.

4. **Virtual servers**  
   Choose which servers you would like to backup. You can select all, specific ones, or all except certain servers.

5. **Features and settings**  
   Specify which features to backup, such as server configuration, databases, email data, and other relevant information. You can opt to **Select all** or choose specific items.

6. **Backup destination**  
   Ensure **Local file or directory** is chosen as the destination. Enter `/root/backups/` in the textbox as the path where the backups will be stored. The other backup destinations are also available, such as **FTP server**, **SSH server**, **Webmin server**, **Amazon S3 bucket** or **Rackspace Cloud Files**.

7. **Schedule and reporting**  
   Proceed to **Schedule and reporting**. Choose **Simple Schedule** for the backup timing.

8. **Set backup frequency**  
   From the dropdown menu next to **Simple Schedule**, you can select from **Hourly**, **Daily**, **Weekly**, **Monthly**, or **Yearly** options to set the frequency at which the backups will occur.

9. **Create Schedule**  
   Click **Create Schedule** to activate the backup routine.

By following these steps, you will have established a scheduled backup of selected virtual servers. The backups will be stored at the specified local directory, ensuring that your data is consistently safeguarded.
