---
title: "restart-server"
date: 2024-01-23
weight: 4012785
---

### Restarts one of the servers managed by Virtualmin

This command stops and re-starts one of the servers managed by Virtualmin, such as Apache or BIND. The server to restart must be set using the `--server` flag, followed by a feature name like `web` or `dns`.

For server types that have multiple versions such as FPM, you can select the version to restart with the `--version` flag. Or use `--domain` to find automatically select the correct version for the given domain.

### Command line help

```text
virtualmin restart-server --server name
                         [--domain name | --version number]
                         [--quiet]
```
