---
title: "list-redirects"
date: 2024-01-23
weight: 4012730
---

### Lists web redirects and aliases in some domain

This command lists all the aliases configured for some domain identified by the `--domain` parameter. By default the list is in a reader-friendly table format, but can be switched to a more complete and parsable output with the `--multiline` flag. Or you can have just the alias paths listed with the `--name-only` parameter.
 
### Command line help

```text
virtualmin list-redirects --domain domain.name
                         [--multiline | --name-only]
```
