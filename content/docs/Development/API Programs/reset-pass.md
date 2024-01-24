---
title: "reset-pass"
date: 2024-01-23
author: "Ilia Ross"
weight: 4012780
---

### Resets the password for some or all users in some or all virtual servers

This command can be used to mass update the passwords of all users in a virtual server, or just those matching some criteria.

For example, to reset the password for all users in the domain `example.com`, run:

```text
virtualmin reset-pass --domain example.com
```

To update the password for just the user `joe` in `example.co`m, run:

```text
virtualmin reset-pass --domain example.com --user joe
```

To update the password for all users in all domains, run:

```text
virtualmin reset-pass --all-domains
```

To update the password for all users in all domains except the owners, run:

```text
virtualmin reset-pass --all-domains --exclude-owner
```

All passwords will be set to a random value, unless the `--pass` flag is given, in which case the same password will be used for all users.

### Command line help

```text
virtualmin reset-pass --all-domains | --domain name
                     [--exclude-owner]
                     [--user name]
                     [--pass]
```
