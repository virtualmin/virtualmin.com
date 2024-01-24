---
title: "list-databases"
date: 2024-01-23
weight: 4012305
---

### Lists databases for some virtual server

This program simply displays a list of MySQL/MariaDB and PostgreSQL databases that are owned by one server. You must supply the `--domain` flag followed by the domain name of the server to list. By default the output is in a reader-friendly table, but the `--multiline` option can be used to switch to a format more suitable for reading by programs and containing more information.

To output just a list of database names, use the `--name-only` flag. To limit the list to databases of a particular type, use `--type` followed by a code like `mysql` or `postgres`.

### Command line help

```text
virtualmin list-databases --domain domain.name
                         [--multiline | --name-only]
                         [--type dbtype]
```
