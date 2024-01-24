---
title: "list-admins"
date: 2024-01-23
weight: 4012270
---

### Lists administrators belonging to a virtual server

This program simply displays a list of extra administrators associated with one virtual server. You must supply the `--domain` followed by the domain name of the server to list. By default the output is in a reader-friendly table, but the `--multiline` option can be used to switch to a format more suitable for reading by programs.

To get a list of just the extra admin's usernames (for use in a script perhaps), add the `--name-only` command line flag.

### Command line help

```text
virtualmin list-admins --domain domain.name
                      [--multiline]
```
