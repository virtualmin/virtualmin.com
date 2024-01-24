---
title: "create-template"
subSection: "Templates"
date: 2024-01-23
weight: 4012415
---

### Creates a template for use by new domains

This command can be used to create a new virtual server template, whose name is set by the `--name` parameter. You can either have the template created completely empty (so that all settings inherit from the default template) with the `--empty` flag, or you can clone an existing template with the `--clone` flag followed by a template name.

### Command line help

```text
virtualmin create-template --name template-name
                           --empty | --clone original-name
```
