---
title: "create-login-link"
date: 2024-01-23
weight: 4012580
---

### Generates a link that can be used to login to Virtualmin

This command can be used to login to Virtualmin as a domain owner without needing to enter a password. When a server is selected with either the `--domain` or `--user` flag, a URL will be displayed that when opened in a browser will immediately login as the owner of that server.

Alternately, you can use the `--usermin-user` flag to login to Usermin as a mailbox user. This must be followed by the full Unix username of the mailbox.

If you want to login as root, use `--root` flag only.

### Command line help

```text
virtualmin create-login-link [--domain name | --user name |
                              --usermin-user name | --root]
```
