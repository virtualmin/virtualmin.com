---
title: "modify-database-hosts"
date: 2024-01-23
weight: 4012310
---

### Adds or removes an allowed MySQL host for some or all domains

This command can change the remote hosts that are allowed to login to the MySQL/MariaDB databases owned by some virtual servers and all their sub-servers. The domains to modify are selected with the `--domain` flag, or you can select all (with MySQL/MariaDB enabled) with the `--all-domains` command-line parameter. The `--type` flag must be given, and followed by a database type to modify. Currently, only `mysql` databases support configuration of allowed remote hosts.

To add a remote system to allowed list, use the `--add-host` flag followed by a hostname, IP address or IP pattern like `192.168.1.%`. To take away a host, use `--remove-host`. To clear all existing remote hosts and specify a new list, use `--set-host`. All of these flags may appear multiple times, but if you use `--set-host` the other two cannot be used.

Access from the system running Virtualmin is always granted, and cannot be removed.

### Command line help

```text
virtualmin modify-database-hosts --domain name | --all-domains
                                 --type mysql|postgres
                                [--add-host ip]
                                [--remove-host ip]
                                [--set-host ip]
```
