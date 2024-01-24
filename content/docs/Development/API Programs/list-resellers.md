---
title: "list-resellers"
date: 2024-01-23
weight: 4012330
---

### List existing resellers

When run with no parameters, this program simply displays a reader-friendly table of existing Virtualmin resellers. The only supported options are `--multiline`, which causes it to show more details about each reseller in a format suitable for reading by other programs, `--name-only` to dump just a list of reseller usernames, and `--simple-multiline` to display details that can be computed quickly.

### Command line help

```text
virtualmin list-resellers [--multiline |
                           --simple-multiline |
                           --name-only]
                          [--name username]
```
