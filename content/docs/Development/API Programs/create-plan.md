---
title: "create-plan"
subSection: "Account Plans"
date: 2024-01-23
weight: 4012440
---

### Creates a new account plan for use with virtual servers

This command allows you to create a new account plan, which defines limits that can be applied to new or existing virtual servers. The only mandatory parameter is `--name`, which must be followed by a unique name for the plan to create.

Quotas for virtual servers on the plan can be set with the `--quota` or `--admin-quota` flags, followed by a quota in blocks (typically 1k in size). By default, plan quotas are unlimited.

Restrictions on the number of virtual servers, mailboxes, aliases and databases can be set with the `--max-doms`, `--max-mailbox`, `--max-alias` and `--max-dbs` parameters, followed by a number. By default, all of these are unlimited.

Allowed features for new virtual servers can be set with the `--features` flag, followed by a space-separated feature code list like `web dns mail`. Similarly, allowed editing capabilities can be set with `--capabilities` followed by a list of codes like `domain users aliases`. In both cases, the lists must be a single quoted parameter.

Scripts that virtual servers on the plan can install can be restricted by the `--scripts` flag, followed by a quoted list of script codes. To find available codes, use the `list-available-scripts` API command.

To create a plan that is owned by a reseller, use the `--owner` flag followed by an existing reseller name. To limit use of the plan to only some resellers, use `--resellers` followed by a list of reseller names. Or use `--no-resellers` to prevent any resellers from seeing it.

### Command line help

```text
virtualmin create-plan --name plan-name
                      [--owner reseller]
                      [--quota blocks]
                      [--admin-quota blocks]
                      [--max-mailbox limit]
                      [--max-alias limit]
                      [--max-dbs limit]
                      [--max-doms limit]
                      [--max-aliasdoms limit]
                      [--max-realdoms limit]
                      [--max-bw limit]
                      [--max-mongrels limit]
                      [--nodbname]
                      [--norename]
                      [--forceunder]
                      [--safeunder]
                      [--migrate]
                      [--features "web dns mail ..." | --no-features]
                      [--capabilities "domain users aliases ..."]
                      [--scripts "name name ..."]
                      [--no-resellers | --resellers "name name.."]
```
