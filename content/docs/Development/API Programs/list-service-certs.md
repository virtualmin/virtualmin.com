---
title: "list-service-certs"
date: 2024-01-23
weight: 4012740
---

### Output a virtual server's certificates used by other services

The only required flag is `--domain`, which must be followed by the domain name to display service certificates for. The optional `--multiline` param determines if full details of each service are displayed or not.
 
### Command line help

```text
virtualmin list-service-certs --domain name
                             [--multiline]
```
