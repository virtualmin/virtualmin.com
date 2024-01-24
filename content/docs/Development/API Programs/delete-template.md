---
title: "delete-template"
date: 2024-01-23
weight: 4012420
---

### Removes one virtual server template

This command can be used to delete a Virtualmin template, specified either by name with the `--name` parameter, or by ID with the `--id` flag. Any virtual servers still using the template will be un-effected.

### Command line help

```text
virtualmin delete-template --name template-name | --id template-id
```
