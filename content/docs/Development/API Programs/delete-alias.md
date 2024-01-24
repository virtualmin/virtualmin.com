---
title: "delete-alias"
date: 2024-01-23
weight: 4012220
---

### Delete a mail alias

This program simply removes a single mail alias from a virtual server. It takes only two parameters, `--domain` to specify the server domain name, and `--from` to specify the part of the alias before the `@` sign. Be careful using it, as it does not prompt for confirmation before deleting. To delete the catch-all alias for a domain, use the option `--from "*"`.

No program exists for updating existing aliases, but the same thing can be achieved by using the `delete-alias` and `create-alias` commands to remove and re-create an alias with new settings.
 
### Command line help

```text
virtualmin delete-alias --domain domain.name
                        --from mailbox|"*"
```
