---
title: "modify-domain"
date: 2024-01-23
weight: 4012070
---

### Change parameters of a virtual server

This command can be used to modify various settings for an existing virtual server from the command line. The only mandatory parameter is `--domain`, which must be followed by the domain name of the server to update. The actual changes to make are specified by the other optional parameters, such as `--pass` to set a new password, `--desc` to change the server description, and `--quota` and `--uquota` to change the disk quota.

To add a private IP address to a virtual server that currently does not have one, the `--ip` or `--allocate-ip` options can be used, as described in the section on `create-domain`.

To revert a server with a private IP back to the system's default shared address, use the `--default-ip` flag. If the system has more than one shared address, the `--shared-ip` flag can be used to change it.

To add an IPv6 address to a virtual server that currently does not have one, the `--ip6` or `--allocate-ip6` options can be used. To remove a v6 address, you can use `--no-ip6` instead.

To change a server's domain name, the `--newdomain` option can be used. It must be followed by a new domain name, which of course cannot be used by any existing virtual server. When changing the domain name, you may also want to use the `--user` option to update the administration username for the server. Both of these options will effect sub-servers as well, where appropriate.

To change a virtual server's plan and apply quota and other limits from the new plan, use the `--apply-plan` parameter followed by the plan name or ID. Alternately, you can switch the plan without applying any of it's limits with the `--plan` flag.

You can also have the domain's enabled features updated to match the current or new plan with the `--plan-features` flag. This will disable or enable features to match those that are allowed on the plan by default.

If your system is on an internal network and made available to the Internet via a router doing NAT, the IP address of a domain in DNS may be different from it's IP on the actual system. To set this, the `--dns-ip` flag can be given, followed by the external IP address to use. To revert to using the real IP in DNS, use `--no-dns-ip` instead. In both cases, the actual DNS records managed by Virtualmin will be updated.

If your system supports chroot jails with Jailkit, the `--enable-jail` flag can be used to force all commands run by the domain to execute in a jail. Conversely, this can be turned off with the `--disable-jail` flag. To re-sync files in the Jail, use the `--copy-jail` flag.

If you have configured additional remote (or local) MySQL servers, you can change the one used by this domain with the `--mysql-server` flag followed by a hostname, hostname:port or socket file. All databases and users will be migrated to the new server.

To specify an alias server that will be used for any links inside Virtualmin to this server, use the `--link-domain` flag followed by a domain name. To revert to the normal behavior, use `--no-link-domain`.

By default, virtual server plan changes that modify features will be blocked if any warnings are detected, such as an existing database or SSL certificate conflict. These can be overridden with the `--skip-warnings` flag.

To update actual filesystem quotas to match what Virtualmin thinks the domain should have, use the `--apply-quotas` flag. Or use `--apply-all-quotas` to also re-apply quotas for mailbox users. These flags are useful if underlying quotas have been corrupted or lost, for example via a filesystem move.

### Command line help

```text
virtualmin modify-domain --domain domain.name
                        [--desc new-description]
                        [--user new-username]
                        [--pass "new-password" | --passfile password-file]
                        [--email new-email]
                        [--quota new-quota|UNLIMITED]
                        [--uquota new-unix-quota|UNLIMITED]
                        [--apply-quotas | --apply-all-quotas]
                        [--newdomain new-name]
                        [--bw bytes|NONE]
                        [--reseller reseller|NONE]
                        [--add-reseller reseller]*
                        [--delete-reseller reseller]*
                        [--ip address] | [--allocate-ip] |
                        [--default-ip | --shared-ip address]
                        [--ip6 address | --allocate-ip6 |
                         --no-ip6 | --default-ip6 |
                         --shared-ip6 address]
                        [--prefix name]
                        [--template name|id]
                        [--plan name|id | --apply-plan name|id]
                        [--plan-features]
                        [--add-exclude directory]*
                        [--remove-exclude directory]*
                        [--add-db-exclude db|db.table]*
                        [--remove-db-exclude db|db.table]*
                        [--dns-ip address | --no-dns-ip]
                        [--enable-jail | --disable-jail]
                        [--mysql-server hostname]
                        [--link-domain domain | --no-link-domain]
                        [--skip-warnings]
```
