---
title: "validate-domains"
date: 2024-01-23
weight: 4012115
---

### Check the configuration of virtual servers

This program can be used to generate a report on selected features for selected virtual servers, to ensure that they are setup correctly. Validation is useful for detecting things such as manually removed Apache virtual hosts or BIND domains, wrong permissions and missing configuration files.

To specify the servers to check, you can either supply the `--all-domains` parameter, or `--domain` followed by the domain name. Similar, you can select features to check with the `--feature` parameter followed by a feature name (like web or dns), or the `--all-features` option. Both `--domain` and `--feature` can be given multiple times.

### Command line help

```text
virtualmin validate-domains --domain name | --all-domains
                           [--feature name]* | [--all-features]
                           [--problems]
```
