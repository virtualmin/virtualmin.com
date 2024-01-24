---
title: "list-ports"
date: 2024-01-23
weight: 4012725
---

### Lists TCP ports associated with some virtual server

This command lists all TCP ports in use by or allowed to be used by the virtual server selected with the `--domain` flag. To output a list of just port numbers, use the `--port-only` flag. Or to show the full details of each port, use `--multiline`.

### Command line help

```text
virtualmin list-ports --domain name
                     [--multiline]
                     [--port-only]
```
