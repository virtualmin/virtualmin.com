---
title: "delete-proxy"
date: 2024-01-23
weight: 4012360
---

### Removes a proxy balancer from some domain

This command deletes one proxy path from the virtual server identified by the `--domain` flag. The proxy to remove must be identified by the `--path` parameter. Any backend services that the proxy previously mapped to will not be halted.
 
### Command line help

```text
virtualmin delete-proxy --domain domain.name
                        --path url-path
```
