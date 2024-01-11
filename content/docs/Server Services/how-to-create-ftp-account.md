---
title: "How to Create an FTP Account"
subSection: "FTP"
author: "Ilia Ross"
weight: 2400000
---
This guide offers a straightforward approach to creating an FTP account for a virtual server in Virtualmin.

### How to create an FTP account

Creating an FTP account in Virtualmin is a simple task that allows users to manage files on a server. Here’s how to set one up:

1. **Select the domain**  
   Log into Virtualmin and choose the domain for which you want to create an FTP account. Select the domain name from the drop-down box located in the top-left corner of the left menu.

2. **Navigate to user management**  
   Click on **Edit Users**. This option is for managing and adding users to your domain.

3. **Add an FTP user**  
   Click on **Add FTP user** button which will open a new page containing the form for creating a new FTP account.

4. **Enter account details**  
   - **Username**: Enter the username for the FTP account. This username must be unique within the domain.
   - **Password**: Choose a secure password or use Virtualmin’s auto-generated one.
   - **Home directory**: By default, the home directory is set to the domain's base web directory. You can change this to a sub-directory to restrict the user's access to only that directory. Ensure that your FTP server is configured to restrict clients to their home directories.

5. **Create the account**  
   Click **Create** to finalize the creation of the new FTP account.

Once created, this FTP account can be used to upload, download, and manage files on the server for the specified domain.
