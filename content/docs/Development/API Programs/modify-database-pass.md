---
title: "modify-database-pass"
date: 2024-01-23
weight: 4012760
---

### Changes the MySQL/MariaDB or PostgreSQL password for some domain

This command changes the password that a domain's administrator uses to login to MySQL/MariaDB or PostgreSQL. The domain is selected with the `--domain` flag, the database type with `--type` and the new password is set with the `--pass` flag.

Because this operation will change the actual MySQL/MariaDB or PostgreSQL password, any application or scripts in the virtual server's directory that have the database password in their configuration files will be broken until those configurations are updated with the new username.

### Command line help

```text
virtualmin modify-database-pass --domain name
                                --type mysql|postgres
                                --pass new password
```
