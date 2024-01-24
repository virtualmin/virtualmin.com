---
title: "enable-limit"
date: 2024-01-23
weight: 4012240
---

### Grants access to some feature or edit capability for some virtual servers

This command can be used to grant the owner of some or all virtual servers access to some functions in the Virtualmin user interface. The domains that it applies to can be selected with the `--domain` flag, which can be given multiple times, or with `--all-domains`.

To allow owners of matching domains to enable or disable some feature, use the feature code as a flag, such as `--ssl` or `--virtualmin-awstats`. To grant access to some capability, use flags like `--can-edit-users` or `--can-edit-dbs`.

### Command line help

```text
virtualmin enable-limit --domain name | --all-domains
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
                       [--can-edit-domain]
                       [--can-edit-users]
                       [--can-edit-aliases]
                       [--can-edit-dbs]
                       [--can-edit-scripts]
                       [--can-edit-ip]
                       [--can-edit-dnsip]
                       [--can-edit-ssl]
                       [--can-edit-forward]
                       [--can-edit-redirect]
                       [--can-edit-admins]
                       [--can-edit-spam]
                       [--can-edit-phpver]
                       [--can-edit-phpmode]
                       [--can-edit-mail]
                       [--can-edit-backup]
                       [--can-edit-sched]
                       [--can-edit-restore]
                       [--can-edit-sharedips]
                       [--can-edit-catchall]
                       [--can-edit-html]
                       [--can-edit-allowedhosts]
                       [--can-edit-passwd]
                       [--can-edit-spf]
                       [--can-edit-records]
                       [--can-edit-disable]
                       [--can-edit-delete]
```
