---
title: "list-templates"
date: 2024-01-23
weight: 4012435
---

### List available templates for new domains

The command simply outputs a list of available templates for use when creating new virtual servers. For each the ID number and description are displayed.

To just display the template names, you can give the `--name-only` parameter. This is useful when iterating through them in other scripts.

By default, deleted templates are not included in the list unless you add the `--deleted` flag.

### Command line help

```text
virtualmin list-templates [--name-only | --multiline]
                          [--deleted]
```
