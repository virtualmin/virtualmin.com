---
title: "unsub-domain"
date: 2024-01-23
weight: 4012100
---

### Convert a sub-domain into a sub-server

This command can be used to convert a sub-domain into a sub-server, by moving its web pages to under the virtual server's home directory, and extracting DNS records into a separate domain. Sub-domains are a legacy feature that should not be used in future, and have fewer features available than full sub-servers.

This command takes only one parameter, which is `--domain` followed by the domain name of the sub-domain to convert.
 
### Command line help

```text
virtualmin unsub-domain --domain domain.name
```
