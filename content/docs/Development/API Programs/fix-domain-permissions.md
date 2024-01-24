---
title: "fix-domain-permissions"
date: 2024-01-23
weight: 4012630
---

### Set correct permissions on a domain's home directory

This command ensures that the ownership and permissions on one or more virtual server's home directories are correct. It can be run either with the `--all-domains` flag to update all virtual servers, or `--domain` followed by a single domain name. To include sub-servers of selected domains, you can also add the `--subservers` flag.

### Command line help

```text
virtualmin fix-domain-permissions --domain name | --all-domains
                                 [--subservers]
```
