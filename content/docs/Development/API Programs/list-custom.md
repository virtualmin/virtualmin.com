---
title: "list-custom"
subSection: "Custom Fields"
date: 2024-01-23
weight: 4012275
---

### List custom fields for virtual servers

When this command is run with no parameters, it will display all custom fields set for all virtual servers. The `--domain` parameter can be used to limit the display to a single named server, while the `--names` parameter will switch the display to show field codes rather than their full descriptions.

By default all fields are shown, but you can use the `--field` flag followed by a code to show just that field. To further limit the display to just values, use the `--value-only` flag.

### Command line help

```text
virtualmin list-custom [--domain name]*
                       [--names]
                       [--field name]
                       [--value-only]
```
