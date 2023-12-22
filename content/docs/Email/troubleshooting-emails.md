---
title: "Troubleshooting Emails"
date: 2023-12-22
author: "Ilia Ross"
weight: 2235200
---

This documentation provides a clear guide for diagnosing and fixing issues leading to all incoming emails being bounced on a Virtualmin-managed server.

### Why is all incoming email bouncing?

Bounced emails can be a symptom of discrepancies between your server's actual hostname and the hostname recorded in your configuration files. To resolve this, you need to ensure consistency across your system settings.

#### Steps to resolve email bouncing

1. **Verify server hostname**  
   Connect to your server via SSH as the _root_ user. Run the `hostnamectl --static` command to display the current system hostname.

2. **Check hosts file**  
   Open the `/etc/hosts` file and confirm that the hostname from the previous step is listed next to your server's external IP address. This file maps hostnames to IP addresses and must include your server's hostname for proper resolution.

3. **Inspect Postfix configuration**  
   Examine the `/etc/postfix/main.cf` file, particularly the `mydestination` parameter. This line should list the hostname that the `hostname` command returned. The `mydestination` setting defines what domains this Postfix instance will deliver locally, rather than forwarding.

4. **Apply changes**  
   If you've made any changes to the `/etc/hosts` or `/etc/postfix/main.cf` files, you'll need to restart Postfix to apply them. You can do this with the following command:
   ```
   systemctl restart postfix
   ```

#### Finalizing the configuration

After restarting Postfix, send a test email to verify that the issue has been resolved. The server should now correctly accept incoming emails instead of bouncing them.
