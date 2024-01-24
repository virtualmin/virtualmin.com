---
title: "delete-user"
date: 2024-01-23
weight: 4012160
---

### Delete a mail, FTP or database user

This command deletes one mail, FTP or database user from a virtual server, along with him home directory. It takes only two parameters, both mandatory, as `--domain` followed by the domain name, and `--user` followed by the full or short username. Be careful with this program, as it does not prompt for confirmation before deleting.

### Command line help

```text
virtualmin delete-user --domain domain.name
                       --user username
```
