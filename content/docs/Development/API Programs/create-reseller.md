---
title: "create-reseller"
subSection: "Reseller Accounts"
date: 2024-01-23
weight: 4012315
---

### Create one reseller account

This command adds a single reseller account to your Virtualmin system. The required parameters are `--name` and `--pass` to specify the login name and password respectively, but you can also use other parameters to set limits on the reseller to control the number of servers and other resources he can use.

The optional `--email` flag can be used to set an email address Virtualmin will use when sending messages to the reseller, such as when a domain is created. The `--from` flag sets the email address used when Virtualmin sends mail as the reseller.

The following command would create a reseller called `reseller1` who is allowed to create up to 5 servers and allocate 1 GB in disk quota space. A new reseller will also be granted access to a standard set of virtual server features:

```text
virtualmin create-reseller --name reseller1 --pass smeg --desc `Bob Smith` --max-doms 5 --max-quota 1000000 --allow dir --allow unix --allow webmin --allow web --allow ssl --allow dns --allow mysql
```

The `--max-doms` parameter sets the maximum number of servers that can be created by this reseller, and by the owners of any virtual servers that he manages. Similarly, the `--max-dbs` option sets a limit on the number of MySQL/MariaDB and PostgreSQL databases that can be created in servers that the reseller owns.

The `--max-quota` option sets the maximum disk quota that the reseller can allocate to virtual servers that he creates. The option `--max-mailboxes` sets a limit on the number of mail/FTP/database users that can be created in servers managed by the reseller.

The `--allow` option can be given multiple times, each instance of which must be followed by the short code for a feature to allow the reseller to use. Only allowed features can be selected when the reseller is creating a new virtual server.

If a plan already exists with the limits you want to apply to the new reseller, you can use the `--plan` flag followed by a plan name. All domain, mailbox, alias and database limits will be copied, along with quotas, the bandwidth limit and allowed features.

If you want the new reseller to use a custom IP address for created virtual servers, this can be specified with the `--ip-address` option followed by an IPv4 active on your system. For systems that support IPv6, you can use the `--ip6-address` followed by an active IPv6 address to use for this reseller's name-based servers.

Similarly, you can specify custom nameservers for the DNS domains he creates with the `--nameserver` flag. This can appear multiple times, and each instance must be followed by a valid nameserver hostname.

To set the external IP address (used in DNS records) for this reseller's new domains, use the `--external-ip-address` flag. This is useful if your system has multiple external IPs that are NATd to one or more addresses on the system.

By default, resellers are allowed to select from any of the shared IP addresses on the system when creating new domains. However, the `--cannot-sharedips` flag can be used to prevent this.

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

To create a reseller with an associated Unix login, use the `--unix` flag to this command. Or to prevent a Unix account from being created, use the `--no-unix` flag. If none are given, the default configured behavior will be used.

By default resellers are not allowed to create or manage other resellers. However, this can be changed with the `--can-create-resellers` command line flag. Be careful using this though, as it effectively allows a reseller access to all virtual servers.

### Command line help

```text
virtualmin create-reseller --name login
                           --pass password |
                           --passfile password-file
                          [--lock]
                          [--desc description]
                          [--email address]
                          [--from address]
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
                          [--plan name|id]
                          [--read-only]
                          [--hide]
                          [--subdom forced.parent]
                          [--logo url|"none"]
                          [--link url]
                          [--ip-address address]
                          [--ip6-address ipv6.address]
                          [--can-sharedips | --cannot-sharedips]
                          [--external-ip-address address]
                          [--nameserver hostname]*
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
