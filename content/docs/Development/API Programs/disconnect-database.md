---
title: "disconnect-database"
date: 2024-01-23
weight: 4012295
---

### Removes a database from the control of a virtual server

This command removes access to a database from the virtual server that owns it, but does not actually delete the database itself. You must provide the `--domain` flag followed by a virtual server name, `--type` followed by the DB type (like `mysql` or `postgres`), and `--name` followed by the database name.

 
### Command line help

```text
virtualmin disconnect-database --domain domain.name
                               --name database-name
                               --type mysql|postgres
```
