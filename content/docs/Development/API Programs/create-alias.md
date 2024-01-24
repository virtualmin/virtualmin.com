---
title: "create-alias"
subSection: "Mail Aliases"
date: 2024-01-23
weight: 4012210
---

### Create a new mail alias

This command can be used to add a new email alias to a virtual server. It takes three mandatory parameters as `--domain` followed by the domain name, `--from` followed by the name of the alias within that domain, and `--to` followed by a destination address. For example, to create an alias for `sales@example.com` that delivers mail to the user `joe`, you could run:

```text
virtualmin create-alias --domain example.com --from sales --to joe@example.com
```

The `--to` option can be given multiple times, to create more than one destination for the alias. To create an alias for all addresses in the domain that are not matched by another alias or mail user, use the option `--from "*"`.

Aliases can have short descriptions associated with them, to explain what the alias is for. To set one when creating, you can use the `--desc` option followed by a one-line description.

To more easily create aliases with auto-responders, you should use the `create-simple-alias` command, which is analogous to the simple alias creation form in Virtualmin user interface.

### Command line help

```text
virtualmin create-alias --domain domain.name
                        --from mailbox|"*"
                       <--to address>+
                       [--desc "Comment text"]
```
