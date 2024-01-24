---
title: "get-template"
date: 2024-01-23
weight: 4012425
---

### Outputs all settings in a template

This command can be used to output all settings in a Virtualmin template, specified either by name with the `--name` parameter, or by ID with the `--id` flag. By default only values actually set in the template are output, but you can add the `--inherited` flag to include settings from the default template too.

By default all settings are output, formatted like:

```text
aliascopy: 1
aliasdomslimit: none
aliaslimit: none
append_style: 6
default: 1
dns: none
...
```

Any newlines in multi-line values are converted to `\n` for the output. However, if you select to output just a single setting with the `--setting` option followed by a setting name, newlines in it's value will not be converted.

### Command line help

```text
virtualmin get-template --name template-name | --id template-id
                       [--setting name]
                       [--inherited]
```
