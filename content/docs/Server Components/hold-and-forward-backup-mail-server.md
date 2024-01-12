---
title: "Hold and Forward Backup Mail Server"
date: 2023-12-26
author: "Ilia Ross"
weight: 2235121
---

A secondary MX (Mail Exchange) server acts as a backup for handling emails if the primary mail server goes offline. This setup is essential for maintaining continuous mail service. Virtualmin Professional is required on the primary server, while either Virtualmin Professional or Virtualmin GPL can be used on the secondary mail server.

### Pre-requisites for configuration

Effective implementation requires:

- Virtualmin Professional on the primary server with an operational mail and DNS server.
- Virtualmin Professional or GPL on the secondary mail server with a functional mail server.
- Postfix mail server across both servers, correctly configured in Virtualmin.

### Preventing backscatter spam

Virtualmin can set up the secondary mail server to accept emails only for addresses existing on the primary server. To configure Postfix on the secondary mail server:

1. Edit `/etc/postfix/main.cf` and add:
   ```text
   relay_recipient_maps = hash:/etc/postfix/relay_recipients
   ```
2. Create and map an empty file:
   ```text
   touch /etc/postfix/relay_recipients ; postmap hash:/etc/postfix/relay_recipients
   ```
3. Restart Postfix:
   ```text
   systemctl restart postfix
   ```

### Configuring Virtualmin on the primary server

#### Adding the secondary mail server to Webmin

1. **Access Webmin**: Click on the **Webmin** link in Virtualmin's left menu.
2. **Webmin servers index**: Under **Webmin**, select **Webmin Servers Index**.
3. **Register new server**: Click **Register a new server**, provide the secondary mail server's hostname and Webmin port, choose **Login via Webmin with username and password**, and enter the admin credentials.
4. **Save the server**: Click **Save** to add the secondary mail server to the index.

#### Enabling secondary mail server in Virtualmin

1. **Virtualmin settings**: In Virtualmin, click on **Addresses and Networking** and select **Secondary Mail Servers**.
2. **Activate the server**: Choose the newly added server and enable it as a secondary mail server.
3. **Apply to existing domains**: Optionally, select **Add all existing mail domains to secondary MX servers** if you want to apply this to existing domains.
4. **Save changes**: Click **Save**.

#### Synchronizing allowed addresses

To synchronize valid email addresses from the primary to secondary mail servers, SSH into the primary server as _root_ and run:

```text
virtualmin syncmx-domain --all-domains
```

This command updates the secondary mail server with valid addresses to prevent backscatter spam.

### Understanding the technical details

This feature in Virtualmin Professional leverages mail RFCs to enhance mail delivery reliability:

- **Additional MX record**: An extra MX record with a lower priority than the primary is created.
- **Mail relay entry**: The secondary mail server is set to relay mail for the domain, holding emails in its queue if the primary is offline.
- **Automatic resending**: The secondary mail server will periodically try resending emails to the primary. If the primary remains offline for an extended period, emails are bounced back to the sender.

By following these steps, you can set up a reliable secondary MX server, ensuring continuous mail service even during primary server downtime.
