---
title: "list-features"
date: 2024-01-23
weight: 4012695
---

### Lists features available when creating a domain

This command outputs information about Virtualmin features that are available on this system. It is useful for scripts that are designed to run on many systems and need to check if some feature is available before creating a virtual server or enabling it for a domain.

By default it lists features available for new top-level servers. However, you can limit it to those that are available for a sub-server with the `--parent` flag, followed by a top-level server name. Similarly, the `--alias` and `--subdom` flags can be used to show features for an alias or sub-domain respectively.

Output is in table format by default, but you can switch to a more detailed and easily parsed list with the `--multiline` flag. Or to just get a list of feature codes, use the `--name-only` parameter.

### Command line help

```text
virtualmin list-features [--multiline | --name-only]
                         [--parent name | --subdom name | --alias name]
```
