---
title: "check-connectivity"
date: 2024-01-23
weight: 4012850
---

### Checks the external accessibility of virtual servers

This command will run various tests to ensure that one or more virtual server's web, DNS and mail servers are accessible from the rest of the Internet. This is useful for debugging various connectivity and configuration problems.

The virtual servers to check can be specified with the `--domain` flag followed by a domain name, or the `--user` flag followed by a Virtualmin administrator's name. Both can be given multiple times.
 
### Command line help

```text
virtualmin check-connectivity [--domain name]* | [--user username]*
```
