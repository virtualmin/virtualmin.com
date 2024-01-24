---
title: "list-available-shells"
date: 2024-01-23
weight: 4012200
---

### List all shells for use with domain owners and mailboxes

When run with no flags, this command outputs a table of shells for use by domain owners and mailbox users. To limit it to just domain owners, the `--owner` flag can be given. Or to show only shells designated for use by mailboxes, add `--mailbox` to the command line.

To get a more parsable format with full details for each shell, use the `--multiline` parameter. Or to only output shell paths, use `--name-only`.
 
### Command line help

```text
virtualmin list-available-shells [--multiline | --name-only]
                                 [--owner | --mailbox | --reseller]
```
