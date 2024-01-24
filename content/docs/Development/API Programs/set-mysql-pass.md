---
title: "set-mysql-pass"
date: 2024-01-23
weight: 4012810
---

### Change the `root` MySQL password, even if the current password is unknown

This command can be used for forcibly change the MySQL password (typically for the _root_ user), even when the password is unknown. Be careful using it though, as it will shut down the MySQL server for up to 30 seconds during the password change process.

### Command line help

```text
virtualmin set-mysql-pass --pass password
                         [--user username]
                         [--force password change for non-administrative user]
```
