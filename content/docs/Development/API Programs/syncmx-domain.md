---
title: "syncmx-domain"
date: 2024-01-23
weight: 4012085
---

### Updates allowed relay addresses in one or more domains

This command can be used to bring the lists of allowed addresses on secondary MX servers into sync with the master Virtualmin system for some or all domains. In general it should never need to be run, unless email addresses have been modified outside of Virtualmin's control.

The only flags it takes are `--domain` followed by domain name to sync, `--user` followed by the name of a user who owns domains, or `--all-domains`.
 
### Command line help

```text
virtualmin syncmx-domain [--domain domain.name]*
                         [--user username]*
```
