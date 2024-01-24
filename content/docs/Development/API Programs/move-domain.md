---
title: "move-domain"
date: 2024-01-23
weight: 4012075
---

### Change the owner of a virtual server

This command can be used to move a sub-server from one parent domain to another, thus changing the administrator who is responsible for it. It can also be used to convert a parent server into a sub-server under some existing owner.

In this mode, it takes only two parameters, as `--domain` followed by the domain name to move, and `--parent` followed by the domain name of the new parent server. Naturally the new parent must be different from the old one, and a server cannot be moved under itself.

This command should be used with care when moving a parent server, as information that is specific to it such as the password, quotas and bandwidth limit will be lost. Instead, the settings from the new parent will apply.

The `move-domain` command can also be used to convert a sub-server into a top-level server. In this case, you must give the `--newuser` and `--newpass` parameters, which are followed by the username and password for the new top-level server respectively. The original owner of the domain will no longer have access to it once the command completes.
 
### Command line help

```text
virtualmin move-domain --domain domain.name
                      [--parent domain.name]
                      [--newuser username]
                      [--newpass password]
```
