---
title: "list-plans"
date: 2024-01-23
weight: 4012455
---

### List available account plans for new domains

The command simply outputs a list of available plans for use when creating new virtual servers, or for applying to existing servers.

To just display the plan names, you can give the `--name-only` parameter. Or to show full details about each plan in a more machine-readable format, use the `--multiline` option.

### Command line help

```text
virtualmin list-plans [--name-only | --multiline]
                      [--id number | --name "plan name"]
```
