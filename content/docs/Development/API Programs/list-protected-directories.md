---
title: "list-protected-directories"
date: 2024-01-23
weight: 4012870
---

### Lists protected directories owned by some virtual server

This command outputs a table of all protected web directories owned by some virtual server, identified by the `--domain` flag. You an also switch to a more easily parsed format with the `--multiline` flag, or get just a list of directories with the `--dir-only` flag.

### Command line help

```text
virtualmin list-protected-directories --domain name
                                     [--multiline | --dir-only]
```