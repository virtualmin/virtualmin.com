---
title: "delete-database"
date: 2024-01-23
weight: 4012290
---

### Deletes one database

To remove a single database from a virtual server and delete all of its contents, you can use this command. It takes the exact same parameters as the `create-database` command like `--domain`, `--name` and `--type`. Be careful using it, as the complete contents of the specified database will be removed without any prompting for confirmation.
 
### Command line help

```text
virtualmin delete-database --domain domain.name
                           --name database-name
                           --type mysql|postgres
```
