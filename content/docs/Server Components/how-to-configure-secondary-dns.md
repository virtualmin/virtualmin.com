---
title: "How to Configure Secondary DNS"
subSection: "DNS"
author: "Ilia Ross"
weight: 2197500
---

This guide provides administrators with a quick overview of setting up automatic DNS secondary configuration features for enhanced DNS server redundancy.

### Introduction

Virtualmin enables the automatic management of DNS secondary servers. With this setup, Virtualmin will create secondary zones on other servers and update them automatically when changes occur on the primary Virtualmin server. For this configuration, you need Virtualmin on your primary server and Webmin (available for free) on your secondary server(s).

### Setting up secondary server
#### Setting up Webmin

If Virtualmin is not installed on your secondary servers, you'll need to install Webmin:

- Download Webmin, choosing the correct package format for your server. Follow the installation instructions provided on the [Downloading and Installing](https://www.webmin.com/download) page on Webmin website.
- After installation, verify that Webmin is functioning correctly and that its access is not blocked by a firewall.

#### Installing BIND

- BIND is required on your secondary servers. Installation procedures vary by operating system but are generally straightforward, and handled for you by Webmin.

##### Configuring BIND

- Some systems may require additional configuration for BIND to start after installation.
- In Webmin, navigate to **Servers ⇾ BIND DNS Server**. Webmin can often perform necessary initial configurations.
- Ensure BIND is also running and set to start on boot using the **System ⇾ Bootup and Shutdown** module.

### Configuring the Virtualmin primary server

On the primary Virtualmin server:

1. Make sure the secondary server's firewall does not block ports 10001-10010, needed for RPC calls made by Webmin.
2. In Webmin, click **Webmin ⇾ Webmin Servers Index**.
3. Register the secondary server, providing its hostname and operating system.
4. For SSL-enabled Webmin on the secondary, make sure to set **SSL server?** option to **Yes**.
5. Choose a link type set to **Login via Webmin with username and password**, and enter the admin credentials.
6. Enable **Make fast RPC calls?** option to **Yes**.
7. Click **Save** button to add the new server.

### Enabling DNS cluster secondary servers

To configure automatic management of secondary zones:

1. In **Servers ⇾ BIND DNS Server**, click on the **Cluster Secondary Servers** icon.
2. Add your secondary server, ensuring **Create secondary on slave when creating locally?** option set to **Yes**.
3. To propagate existing master zones, set **Create all existing master zones on secondary?** option to **Yes**.
4. For a custom NS record name, ensure it correctly points to your secondary server.
5. Click **Add Now** button to add the secondary server to the cluster.

### Setting the primary IP address

Ensure the primary server uses the correct IP for zone transfers:

1. In the **BIND DNS Server** module, click **Module config** button.
2. In **Cluster slave servers**, enter the external IP of your primary server in **Default master server IP for remote secondary zones** field.
3. Click **Save** button.

### Customizing the primary NS record name

If you prefer a different naming convention for the primary NS record (by default, it uses your server's hostname), you can modify it in Virtualmin:

- Navigate to **Server Templates** in Virtualmin, and select the template you're using.
- In the **BIND DNS domain** section, look for the field labeled **Primary DNS server hostname**.
- Enter your preferred name for the primary NS record.
- Ensure this new name is valid and resolves correctly. Incorrect or invalid NS record names can lead to unreliable or non-functional name service.

### Conclusion

Your Virtualmin server is now configured to automatically include your secondary DNS server in the NS records for each new domain.
