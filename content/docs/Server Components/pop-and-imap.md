---
title: "IMAP/POP3 and SMTP Authentication"
author: "Ilia Ross"
weight: 2235000
---

Virtualmin automates the configuration of Dovecot for IMAP/POP3 services and configures Cyrus `saslauthd` for SMTP authentication, facilitating compatibility with various email clients.

### POP3/IMAP username details

Usernames for accessing email services can be located within Virtualmin's virtual server environment. On the **Edit Users** page, click the **Show Email Client Settings** button to reveal detailed login credentials including the username.

### Username conventions

Virtualmin has updated its approach, moving away from the practice of utilizing system login names with a period separator. Now, by default, it adopts just the first part of the domain name for virtual server owner logins. The settings for username format are customizable and can be adjusted by navigating to **System Settings ⇾ Virtualmin Configuration**, selecting the **Defaults for new domains** section, and setting the desired format in the **Domain name style in username** field.

Support for full email-style usernames, i.e. `user@domain.tld` is a standard feature in Virtualmin. Unlike before, Postfix now handles `@` in email addresses without the need for creating auxiliary usernames. Although, the settings for username format are customizable and can be adjusted by navigating to **System Settings ⇾ Server Templates**, selecting the **Mail for domain** section, and setting the desired format in the **Format for usernames that include domain** field.

### Automatic configuration of `saslauthd`

Previously, enabling SMTP authentication for email-style usernames required manual configuration:

- On EL systems, this was done by adding the `-r` flag to `FLAGS=` in `/etc/sysconfig/saslauthd`.
- On Debian and derivatives, you would add the `-r` flag to `PARAMS=` in `/etc/default/saslauthd`.

These configurations ensured that `saslauthd` could interpret `user@domain.tld` formatted usernames.

### Current automated setup

Now, the `virtualmin-config-system` automates this setup process, without manual intervention. This is part of Virtualmin's commitment to ease of use and efficiency.

### Confirming your configuration

After setting up your email clients, verify access using the provided credentials. SMTP authentication should work seamlessly with your `user@domain.tld` usernames in all modern setups.
