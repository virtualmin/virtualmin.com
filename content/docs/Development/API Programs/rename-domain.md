---
title: "rename-domain"
date: 2024-01-23
weight: 4012080
---

### Change the domain name, home directory or username of a virtual server

This command is typically used to rename an existing server, selected with the `--domain` flag, and changed to the name set with the `--new-domain` option.

By default, the administration username, home directory and prefix for mailboxes will remaining unchanged. You can have these selected automatically based on the new domain name with the `--auto-user`, `--auto-home` and `--auto-prefix` flags. Alternately, you can set them directly with the `--new-user`, `--new-home` and `--new-prefix` flags followed by the settings you want.

This command can also be used to change the home directory or username for a domain without even changing the domain name, just set the `--new-home` or `--new-user` flags without `--new-domain`.
 
### Command line help

```text
virtualmin rename-domain --domain domain.name
                        [--new-domain name]
                        [--new-user login | --auto-user]
                        [--new-home directory | --auto-home]
                        [--new-prefix string | --auto-prefix]
```
