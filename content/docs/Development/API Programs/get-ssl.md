---
title: "get-ssl"
date: 2024-01-23
weight: 4012655
---

### Output SSL certificate information for a domain

Given a domain name with the `--domain` flag, this command outputs information about the SSL certificate currently in use by that virtual server.

If the `--chain` flag is given, details of the CA certificate will be shown instead (if there is one).

### Command line help

```text
virtualmin get-ssl --domain name
                  [--chain]
```
