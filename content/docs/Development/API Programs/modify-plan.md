---
title: "modify-plan"
date: 2024-01-23
weight: 4012450
---

### Modifies an existing account plan for use with virtual servers

This command allows you to modify the limits for an existing account plan, and optionally apply it to all virtual servers currently on that plan (with the `--apply` flag). Its parameters are exactly the same as `create-plan`, so for full documentation you should refer to that command.

To change the name of a plan, use the `--new-name` flag followed by the new name of your choice.
 
### Command line help

```text
virtualmin modify-plan --name plan-name | --id number
                      [--new-name plan-name]
                      [--owner reseller | --no-owner]
                      [--quota blocks | --no-quota]
                      [--admin-quota blocks | --no-admin-quota]
                      [--max-mailbox limit | --no-max-mailbox]
                      [--max-alias limit | --no-max-alias]
                      [--max-dbs limit | --no-max-dbs]
                      [--max-doms limit | --no-max-doms]
                      [--max-aliasdoms limit | --no-max-aliasdoms]
                      [--max-realdoms limit | --no-max-realdoms]
                      [--max-bw limit | --no-max-bw]
                      [--max-mongrels limit | --no-max-mongrels]
                      [--nodbname | --no-nodbname]
                      [--norename | --no-norename]
                      [--forceunder | --no-forceunder]
                      [--safeunder | --no-safeunder]
                      [--migrate | --no-migrate]
                      [--features "web dns mail ..." |
                       --auto-features | --no-features]
                      [--capabilities "domain users aliases ..." |
                       --auto-capabilities]
                      [--no-resellers | --resellers "name name.." |
                       --all-resellers]
                      [--apply]
```
