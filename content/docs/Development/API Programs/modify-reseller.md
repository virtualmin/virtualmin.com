---
title: "modify-reseller"
date: 2024-01-23
weight: 4012325
---

### Modify attributes for an existing reseller

This command can be used to change the details of a single reseller. Its only mandatory parameter is `--name`, which must be followed by the reseller's login name. The other parameters such as `--pass`, `--desc` and the `--max` options are the same as those for the `create-reseller` command.

The `--allow` parameter can be given multiple times to grant access to additional features to the reseller. Similarly, the `--disallow` feature can be used to take away access to features. Each instance of `--disallow` must be followed by the short code for the feature to remove, such as `web` or `dns`.

If you want the new reseller to use a custom IP address for created virtual servers, this can be specified with the `--ip-address` option followed by an IP active on your system. To remove any custom IP, use the `--no-ip-address` flag. For systems that support IPv6, the equivalent flags are `--ip6-address` and `--no-ip6-address`. Similarly, the default external IP address (for use in DNS records) can be set with the `--external-ip-address` and `--no-external-ip-address` flags.

Similarly, you can specify custom nameservers for the DNS domains he creates with the `--nameserver` flag. This can appear multiple times, and each instance must be followed by a valid nameserver hostname. To force use of the system default nameservers instead, use the `--no-nameserver` flag.

By default, resellers are allowed to select from any of the shared IP addresses on the system when creating new domains. The `--cannot-sharedips` flag can be used to prevent this, and the `--can-sharedips` flag to allow it.

If a plan already exists with the limits you want to apply to the reseller, you can use the `--plan` flag followed by a plan name. All domain, mailbox, alias and database limits will be copied, along with quotas, the bandwidth limit and allowed features.

Addition reseller permissions can be granted or removed with the flags:

`--can-schedule-backups` - Schedule and run backups

`--can-backups` - Run backups manually

`--can-plans` or `--cannot-plans` - Create and edit plans

`--can-admins` or `--cannot-admins` - Create and edit extra admins

`--can-create` or `--cannot-create` - Create virtual servers

`--can-rename` or `--cannot-rename` - Rename virtual servers

`--can-edit` or `--cannot-edit` - Edit virtual servers

`--can-delete` or `--cannot-delete` - Delete virtual servers

`--can-proxy` or `--cannot-proxy` - Manage proxy paths and create proxy virtual servers

A Unix account for the reseller can be enabled with the `--unix` flag, or disabled with the `--no-unix` flag.

You can control whether this reseller is allowed to create and edit other resellers with the `--can-create-resellers` or `--cannot-create-resellers` flag.

### Command line help

```text
virtualmin modify-reseller --name login
                          [--pass password | --passfile password-file]
                          [--lock | --unlock]
                          [--desc description]
                          [--email address]
                          [--max-doms number]
                          [--max-topdoms number]
                          [--max-aliasdoms number]
                          [--max-realdoms number]
                          [--max-quota number]
                          [--max-mailboxes number]
                          [--max-aliases number]
                          [--max-dbs number]
                          [--max-bw number]
                          [--allow feature]*
                          [--disallow feature]*
                          [--plan name|id]
                          [--read-only] | [--read-write]
                          [--subdom forced.parent | --no-subdom]
                          [--logo url|"none" | --no-logo]
                          [--link url | --no-link]
                          [--ip-address address | --no-ip-address]
                          [--ip6-address ipv6.address | --no-ip6-address]
                          [--can-sharedips | --cannot-sharedips]
                          [--external-ip-address address | --no-external-ip-address]
                          [--nameserver hostname | --no-nameserver]*
                          [--can-plans | --cannot-plans]
                          [--can-admins | --cannot-admins]
                          [--can-create | --cannot-create]
                          [--can-edit | --cannot-edit]
                          [--can-rename | --cannot-rename]
                          [--can-delete | --cannot-delete]
                          [--can-proxy | --cannot-proxy]
                          [--can-create-resellers | --cannot-create-resellers]
                          [--can-schedule-backups | --can-backups | --cannot-backups]
                          [--can-migrate | --cannot-migrate]
                          [--unix | --no-unix]
```
