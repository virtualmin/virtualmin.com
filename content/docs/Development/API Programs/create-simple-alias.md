---
title: "create-simple-alias"
date: 2024-01-23
weight: 4012215
---

### Adds a mail alias to some domain, with simple parameters

This command allows aliases using auto-responders or other more complex destination types to be created more easily. You must supply at least the `--domain` and `--from` parameters, followed by a domain name and alias name (without the `@` sign) respectively. The optional `--desc` parameter can be used to set a comment or description for the alias. To create an alias that matches all email in the domain, use the option `--from "*"`.

To just forward email to some other address, the `--forward` parameter can be used. It can be given multiple times, and each instance must be followed by an email address.

To deliver directly to the inbox of some user (bypassing other forwarding), use the `--local` parameter, followed by a full username like `user.example`.

To bounce mail back to the sender, use the `--bounce` flag. This is useful if you have a catchall address setup for the domain.

To setup an auto-responder, use the `--autoreply` parameter followed by the text of the automatic reply message. The from address for automatic replies can be set with the optional (but highly recommended) `--autoreply-from` flag, and the interval in hours between replies to the same address with the `--autoreply-period` flag.

For example:

```text
virtualmin create-simple-alias --domain example.com --from user --autoreply `Gone fishing" --autoreply-from user@example.com --autoreply-period 24
```
### Command line help

```text
virtualmin create-simple-alias --domain domain.name
                               --from mailbox|"*"
                              [--forward user@domain]*
                              [--local local-user]
                              [--bounce]
                              [--everyone]
                              [--autoreply "some message"]
                              [--autoreply-period hours]
                              [--autoreply-from user@domain]
                              [--desc "Comment text"]
```
