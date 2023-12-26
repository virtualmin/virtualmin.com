---
title: "Sender Dependent Outgoing IP Address"
date: 2023-12-26
author: "Ilia Ross"
weight: 2235111
---

In a standard setup, your mail server uses the system's default IP address for SMTP connections, typically associated with `eth0`. This is the case even for emails sent from domains with dedicated private IP addresses. However, with specific configurations in Virtualmin and Postfix, you can alter this behavior so that outgoing emails from a domain use its assigned private IP address.

### Benefits of using domain-specific outgoing IPs

- **Domain isolation**: Helps in separating email traffic for domains, as viewed by other mail servers.
- **Reverse DNS setup**: Facilitates setting up per-domain reverse DNS records, which can improve email deliverability and reputation.

#### Configuring Postfix

1. **SSH into the server**: Access your server as `root` using SSH.

2. **Edit Postfix configuration**:
   - Open the Postfix configuration file located at `/etc/postfix/main.cf`.
   - Check for an existing line starting with `sender_dependent_default_transport_maps`. If it's present, your system is ready.
   - If not, add the following line:
     ```
     sender_dependent_default_transport_maps = hash:/etc/postfix/dependent
     ```

3. **Create dependent file**:
   - Execute the command: `touch /etc/postfix/dependent`
   - Then, run `postmap hash:/etc/postfix/dependent` to apply the changes.

### Enabling domain-specific outgoing IPs

After configuring Postfix, you can enable the use of a domain's IP address for outgoing SMTP connections within Virtualmin:

1. **Navigate in Virtualmin**: Go to **Mail Options** -> **Email Settings**.

2. **Adjust outgoing IP settings**: Change **Send outgoing email for domain from IP** to **Virtual server's address**.

3. **Save changes**: Click the **Save** button to apply the new configuration.

#### Using the API

This feature can also be enabled via Virtualmin's API. Use the `modify-mail` command with the `--outgoing-ip` flag to automate this process programmatically.
