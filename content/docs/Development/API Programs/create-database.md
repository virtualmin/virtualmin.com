---
title: "create-database"
subSection: "Databases"
date: 2024-01-23
weight: 4012285
---

### Creates a database for a virtual server

This command creates a new MySQL/MariaDB or PostgreSQL database, and associates it with an existing virtual server. You must supply the `--domain` parameter to specify the server, `--name` to set the database name, and `--type` followed by either `mysql`, `postgres` or some plugin database type. It would typically be run something like:

```text
create-database.pl --domain foo.com --name foo_phpbb --type mysql
```

Some database types support additional creation-time options, specified using the `--opt` flag. At the time of writing, those available for MySQL/MariaDB are:

`--opt charset name` - Sets the character set (like latin2 or euc-jp) for the new database.

And for PostgreSQL, the options are:

`--opt encoding name` - Sets the text encoding (like LATIN2 or EUC_JP) for the new database.
 
### Command line help

```text
virtualmin create-database --domain domain.name
                           --name database-name
                           --type mysql|postgres
                           [--opt "name value"]*
```
