---
title: "fix-domain-quota"
date: 2024-01-23
weight: 4012635
---

### Set the Unix quotas for some domains to match the Virtualmin configuration

This command can be used to bring the Unix quotas for domain owners back into sync with what Virtualmin expects, if the quota file has been lose or manually edited. It can be run either with the `--all-domains` flag to update all virtual servers, or `--domain` followed by a single domain name.
 
### Command line help

```text
virtualmin fix-domain-quota --domain name | --all-domains
```
