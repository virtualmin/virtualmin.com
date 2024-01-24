---
title: "list-protected-users"
date: 2024-01-23
weight: 4012195
---

### Lists users in some protected directory

This command outputs a table of all users with access to some protected directory, identified by the `--domain` and `--path` flags. You an also switch to a more easily parsed format with the `--multiline` flag, or get just a list of usernames with the `--name-only` flag.

### Command line help

```text
virtualmin list-protected-users --domain name
                                --path directory
                               [--multiline | --name-only]
```
