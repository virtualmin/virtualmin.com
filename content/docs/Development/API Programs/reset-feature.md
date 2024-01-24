---
title: "reset-feature"
date: 2024-01-23
weight: 4012775
---

### Reset some virtual server feature back to it's default

This command resets the configuration for one or more features for selected virtual servers back to their default configurations, while preserving any customization if possible.

The servers to reset are selected with the `--domain` or `--user` flags, and the features with flags like `--web` or `--dns`. By default the command will skip resetting if this would result in the loss of custom settings, but this can be over-ridden with the `--skip-warnings` flag.

To force a complete reset back to defaults for selected features, you can instead use the `--full-reset` flag.
 
### Command line help

```text
virtualmin reset-feature --domain name | --user name
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
                         [--skip-warnings]
                         [--full-reset]
```
