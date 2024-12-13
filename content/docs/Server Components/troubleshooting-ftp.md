---
title: "Troubleshooting FTP"
author: "Ilia Ross"
weight: 2401000
---

### Troubleshooting FTP listing issues

FTP connection problems, such as difficulties in listing files or changing directories, are often related to the FTP passive mode, especially when the server is behind a firewall or NAT.

#### FTP Passive Mode

- **Passive mode challenges**: In passive mode, the FTP server tells the client which port to connect to for data transfers. If these ports are not properly configured or allowed through the firewall, it can result in errors like `Connection timed out` or `Failed to retrieve directory listing`.

##### Configure firewall for passive mode ports

Before trying anything else, ensure your firewall allows the necessary port range for FTP passive mode:

- **Passive mode port range**: Typically, FTP passive mode uses ports 49152-65535.
- **Firewall settings**: Modify your firewall to permit inbound connections on this port range. The configuration steps will vary based on your firewall software or system setup.

#### Using extra kernel module if nessesary
If configuring the firewall does not resolve the FTP connection issues, the next step is to consider enabling the `ip_conntrack_ftp module`. The `modprobe ip_conntrack_ftp` command is used to load the `ip_conntrack_ftp` module on Linux servers. This module is part of the Netfilter framework, which provides connection tracking and network address translation capabilities for the Linux kernel.

##### Role of `ip_conntrack_ftp`

- **Connection tracking**: The module helps track FTP connections and understand the FTP protocol's workings, including the negotiation of data ports in passive mode.
- **Address translation assistance**: It assists NAT devices (like routers) in altering the payload of FTP control messages so that the client receives the correct IP address and port number for passive mode connections, even when the server is behind NAT.
- **Resolving passive mode issues**: By enabling this module, issues related to passive mode FTP connections, such as directory listing failures, are often resolved.

##### Enabling `ip_conntrack_ftp`

To load the `ip_conntrack_ftp` module:

1. **Run the command**: As root, execute:
   ```text
   modprobe ip_conntrack_ftp
   ```
2. **Immediate effect**: This command immediately loads the module into the running kernel, without requiring a reboot.
3. **Persisting the change**: To ensure the module is loaded on system boot, add `ip_conntrack_ftp` to your module loading configuration (e.g., `/etc/modules` on Debian and derivatives or create a file in `/etc/modules-load.d/` on EL systems).

##### Post-Configuration

After enabling the `ip_conntrack_ftp` module, test your FTP connection again. In most cases, issues related to passive mode should be resolved, allowing for successful file listings and directory navigation.
