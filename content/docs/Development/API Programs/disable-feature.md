---
title: "disable-feature"
date: 2024-01-23
weight: 4012125
---

### Turn off some features for a virtual server

This program is very similar to `enable-feature`, and takes the same command line parameters, but disables the specified features instead. Be careful when using it, as it will not prompt for confirmation before disabling features that may result in the loss of configuration files and other data.

You can select the servers to update with the `--domain` and `--user` flags, each of which can be given multiple times. The `--dns-subdomains` flag will also include all DNS sub-domains that share the same zone file of those selected.

If the `--disassociate` flag is given, this command will simply remove the association between the domain and the underlying system configuration or database. For example, if disabling the MySQL/MariaDB with the `--disassociate` flag set, the underlying databases belonging to the domain would not be removed.

### Command line help

```text
virtualmin disable-feature --domain name | --user name | --all-domains
                          [--dns-subdomains]
                          [--disassociate]
                          [--unix]
                          [--dir]
                          [--dns]
                          [--mail]
                          [--web]
                          [--ssl]
                          [--logrotate]
                          [--mysql]
                          [--spam]
                          [--status]
                          [--webmin]
                          [--virtualmin-awstats]
```
