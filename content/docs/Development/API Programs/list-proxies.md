---
title: "list-proxies"
date: 2024-01-23
weight: 4012370
---

### Lists web proxy balancers in some domain

This command lists all the proxies configured for some domain identified by the `--domain` parameter. By default the list is in a reader-friendly table format, but can be switched to a more complete and parsable output with the `--multiline` flag. Or you can have just the proxy paths listed with the `--name-only` parameter.
 
### Command line help

```text
virtualmin list-proxies --domain domain.name
                       [--multiline | --name-only]
```
