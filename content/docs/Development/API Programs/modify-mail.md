---
title: "modify-mail"
date: 2024-01-23
weight: 4012145
---

### Change mail-related settings for some domains

This command can be used to configure BCC of outgoing email and set the alias mode for one or more virtual servers. The domains to effect are set by the `--domain` flag, which can occur multiple times and must be followed by a virtual server name. Or you can use `--user` followed by an administrator's username to get all his domains, or `--all-domains` to modify all those on the system with mail enabled.

If your mail server supports it, BCC of relayed email by all users in the selected domains can be enabled with the `--sender-bcc` flag, which must be followed by an email address. To turn this off again, use the `--no-sender-bcc` flag.

Similarly, BCC of incoming email to all users in the selected domains can be enabled with the `--recipient-bcc` flag, which must be followed by an email address. To turn this off again, use the `--no-recipient-bcc` flag.

By default, Virtualmin implements mail alias domains with catchall aliases, which forward all email to addresses in the alias domain to the same address in the target. However, when using Postfix this prevents email to invalid addresses in the alias from being bounced at the SMTP conversation stage - instead, a bounce email is sent, which is regarded as poor mail server practice and can be abused by spammers.

To prevent this, the `--alias-copy` flag can be used to duplicate Postfix virtual table entries into the alias domain. To revert to the default mode, use the `--alias-catchall` flag.

If supported by your mail server and if the domain has a non-default IP address, the `--outgoing-ip` flag can be used to have email sent by addresses in the domain use its own IP address for outgoing SMTP connections. This can be useful for separating virtual servers from each other from the point of view of other mail servers. To disable this mode, use the `--no-outgoing-ip` flag.

To enable the Thunderbird or Outlook auto-configuration URL for this domain, use the `--autoconfig` flag. This allows email clients to find the SMTP and IMAP username, hostname, port and protocol just based on an email address. To turn this feature off, use the `--no-autoconfig` flag.

If DKIM is enabled on the system, by default all virtual servers share the same key for signing outgoing email. However, the `--dkim-key` flag followed by a path contained a PEM-format key can be used to select an alternate custom key for this domain. Alternately you can revert to the default key with the `--default-dkim-key` flag, or generate a new random key with the `--generate-dkim-key` flag.

To use a cloud mail filter, specify the `--cloud-mail-filter` flag followed by the name of a provider. This will update the MX records for the domain to point to that provider's filtering servers (which you typically must sign up for in advance). For some providers Virtualmin also needs to know a customer ID (used in the MX records), which is set with the `--cloud-mail-filter-id` flag. To revert to using only the local mail server, set the `--no-cloud-mail-filter` flag.

In Virtualmin Pro, to use a cloud SMTP provider, specify the `--cloud-smtp` flag followed by a provider name like `ses`. The selected provider must have already been configured in the Virtualmin user interface. To revert to direct email delivery, use the `--no-cloud-smtp` flag.

### Command line help

```text
virtualmin modify-mail --domain name | --user name | --all-domains
                      [--sender-bcc user@domain] |
                      [--no-sender-bcc]
                      [--recipient-bcc user@domain] |
                      [--no-recipient-bcc]
                      [--alias-copy] | [--alias-catchall]
                      [--outgoing-ip | --no-outgoing-ip]
                      [--autoconfig | --no-autoconfig]
                      [--dkim-key file | --default-dkim-key | --generate-dkim-key]
                      [--cloud-mail-filter name | --no-cloud-mail-filter]
                      [--cloud-mail-filter-id number]
                      [--cloud-smtp name | --no-cloud-smtp]
```
