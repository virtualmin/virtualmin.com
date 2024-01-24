---
title: "modify-template"
date: 2024-01-23
weight: 4012430
---

### Changes one or more settings in a template

This command can be used to change several settings in a Virtualmin template, specified either by name with the `--name` parameter, or by ID with the `--id` flag.

The setting to change is specified with the `--setting` flag, followed by a template variable name like `uquota`. Each occurrence of this flag must be followed by the `--value` parameter, followed by the value to use for the previously named setting.

Multi-line values can be instead read from a file, by using the `--value-file` parameter followed by a full path to a file.

### Command line help

```text
virtualmin modify-template --name template-name | --id template-id
                          [--setting name --value newvalue]+
                          [--fix-options]
```
