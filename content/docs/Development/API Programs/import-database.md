---
title: "import-database"
date: 2024-01-23
weight: 4012300
---

### Adds an existing database to a virtual server

This command finds a MySQL/MariaDB or PostgreSQL database that is not currently owned by any virtual server and associates it with the server specified with the `--domain` parameter.

The database to import is set with the `--type` flag followed by either `mysql` or `postgres` , and the `--name` flag followed by a database name. You cannot import a DB that is owned by another domain, or has a special purpose like the `mysql` or `template0` databases.

### Command line help

```text
virtualmin import-database --domain domain.name
                           --name database-name
                           --type mysql|postgres
```
