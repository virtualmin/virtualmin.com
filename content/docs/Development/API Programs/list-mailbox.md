---
title: "list-mailbox"
date: 2024-01-23
weight: 4012205
---

### Dump inbox email for one user

This program is primarily for debugging and testing. It finds the email inbox for the user in the virtual server identified by the `--domain` flag whose login is set with the `--user` parameter, and outputs the contents in `mbox` format. Alternately you can use the `--filesonly` flag to just have it print all the files containing the user's mail (typically just one if the system using `mbox` format, or many if `Maildir` is in use).

By default the user's inbox is listed, however you can select any folder owned by the user with the `--folder` flag followed by either a path or a unique folder ID.

### Command line help

```text
virtualmin list-mailbox --domain domain.name
                        --user name
                       [--folder name|path]
                       [--filesonly]
```
