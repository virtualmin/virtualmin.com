---
title: "Running Database on a Remote System"
author: "Ilia Ross"
date: 2024-01-03
weight: 2510100
---

For busy web hosts looking to optimize their resources, offloading the database server to a separate system can be beneficial. Virtualmin fully support this setup, and the following guide outlines how to configure it.

This process is ideally performed on a system without domains or, at least, domains that do not yet have databases. The outlined steps will not transfer existing databases or database users to the new system.

There are a few considerations to keep in mind when moving database to a remote system:

- Database access may be slower due to network overhead.
- Disk usage by database will not count towards domain quotas since it's on a different system and outside Unix quotas set by Virtualmin.
- Database shutdown or startup operations cannot be managed from Virtualmin and must be done directly on the remote system.

Virtualmin simplifies managing remote database servers with its built-in functionality. You can add and manage remote databases directly from the Virtualmin interface, allowing for centralized control of your data across multiple servers.

### Configuring a remote database server

#### Prepare the remote system
   - Ensure that another system where you intend to host the remote databases also has Virtualmin installed.
   - Configure the remote system to allow connections from your primary Virtualmin server. This typically involves adjusting firewall settings to allow incoming connections on the database port (default 3306 for MySQL/MariaDB) from the IP address of your primary Virtualmin server.

#### Enable remote database access
   - On the remote Virtualmin system, navigate to **Edit Databases** ⇾ **Remote Hosts**.
   - This page lists the remote hosts that are allowed to connect to databases owned by this virtual server.
   - You can enter hostnames, IP addresses, or network patterns to specify which systems can connect. Ensure that your primary Virtualmin server's IP is listed here to permit connections.
   - Save the changes to apply the new remote access rules.

### Adding a remote database server

To connect to a remote database server, follow these steps:

1. Navigate to **System Settings** ⇾ **Database Servers** in Virtualmin.
2. In the **New database server options** section, select the type of your database server, such as MariaDB or MySQL.
3. Choose the **Remote host** option and provide the necessary details, including the hostname or IP address of the remote server, port number (if not using the default), and credentials for authentication.
4. You can also specify whether to connect using SSL for enhanced security.
5. After filling in the details, click **Create** to add the remote database server.

### Managing remote databases

Once you've successfully added a remote database server, you can manage it directly from Virtualmin:

1. In the **Database Servers** page, you'll see a list of configured database servers, including local and remote ones.
2. For each virtual server, you can also configure database-related settings under **Edit Databases**.
3. You can select a server from the list to perform various management tasks, such as modifying existing database settings, like user permissions, database names, and passwords, to maintain or update the databases hosted on the remote server.
