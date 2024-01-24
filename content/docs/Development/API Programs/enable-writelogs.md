---
title: "enable-writelogs"
date: 2024-01-23
weight: 4012625
---

### Enable logging via program

By default, Virtualmin configures Apache to log to files in each virtual server's home directory, under the `logs` sub-directory. However, if the domain owner deletes that directory, Apache will be unable to log and will fail to start! To avoid this, Virtualmin can turn on logging via a wrapper script which ignores this problem, which contains the damage. The only cost is a little more memory used by the wrapper programs.

The domains that it operates on are specified either using the `--domain` flag (which can appear multiple times), or `--all-domains` to turn off logging via script for all of them.

### Command line help

```text
virtualmin enable-writelogs --domain name | --all-domains
```
