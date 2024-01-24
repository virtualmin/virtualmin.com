---
title: "modify-database-user"
date: 2024-01-23
weight: 4012165
---

### Changes the MySQL/MariaDB or PostgreSQL login for some domain

This command changes the username that a domain's administrator uses to login to MySQL/MariaDB or PostgreSQL. The domain is selected with the `--domain` flag, the database type with `--type` and the new login is set with the `--user` flag.

Because this operation will rename the actual MySQL/MariaDB or PostgreSQL user, any application or scripts in the virtual server's directory that have the database login in their configuration files will be broken until those configurations are updated with the new username.
 
### Command line help

```text
virtualmin modify-database-user --domain name
                                --type mysql|postgres
                                --user new-name
```
