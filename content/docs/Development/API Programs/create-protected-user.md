---
title: "create-protected-user"
date: 2024-01-23
weight: 4012175
---

### Add a user to some protected directory

This command adds a user to a protected directory, identified by the `--domain` and `--path` flags. The login for the new user must be set with `--user`, and the initial password with the `--pass` flag (or `--encpass` if you have a pre-hashed password in the right format). To create a user that is initially blocked from logging in, use the `--disabled` flag.

### Command line help

```text
virtualmin create-protected-user --domain name
                                 --path directory
                                 --user username
                                [--pass password | --encpass hash]
                                [--enabled | --disabled]
```
