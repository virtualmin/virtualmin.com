---
title: "disable-limit"
subSection: "Server Owner Limits"
date: 2024-01-23
weight: 4012235
---

### Removes access to some feature or edit capability for some virtual servers

This command can be used to deny the owner of some or all virtual servers access to some functions in the Virtualmin user interface. The domains that it applies to can be selected with the `--domain` flag, which can be given multiple times, or with `--all-domains`.

To prevent owners of matching domains from enabling or disabling some feature, use the feature code as a flag, such as `--ssl` or `--virtualmin-awstats`. To take away access to some capability, use flags like `--cannot-edit-users` or `--cannot-edit-dbs`.

### Command line help

```text
virtualmin disable-limit --domain name | --all-domains
                        [--dbname]
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
                        [--cannot-edit-domain]
                        [--cannot-edit-users]
                        [--cannot-edit-aliases]
                        [--cannot-edit-dbs]
                        [--cannot-edit-scripts]
                        [--cannot-edit-ip]
                        [--cannot-edit-dnsip]
                        [--cannot-edit-ssl]
                        [--cannot-edit-forward]
                        [--cannot-edit-redirect]
                        [--cannot-edit-admins]
                        [--cannot-edit-spam]
                        [--cannot-edit-phpver]
                        [--cannot-edit-phpmode]
                        [--cannot-edit-mail]
                        [--cannot-edit-backup]
                        [--cannot-edit-sched]
                        [--cannot-edit-restore]
                        [--cannot-edit-sharedips]
                        [--cannot-edit-catchall]
                        [--cannot-edit-html]
                        [--cannot-edit-allowedhosts]
                        [--cannot-edit-passwd]
                        [--cannot-edit-spf]
                        [--cannot-edit-records]
                        [--cannot-edit-disable]
                        [--cannot-edit-delete]
```
