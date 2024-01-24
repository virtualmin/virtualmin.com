---
title: "unalias-domain"
date: 2024-01-23
weight: 4012095
---

### Convert an alias domain into a sub-server

This command can be used to convert an alias server into a sub-server, so that it can have its own separate web pages, mailboxes and mail aliases. Once it is run, the former alias domain will no longer serve the same web pages as the target virtual server, and will no longer forward email.

This command takes only one parameter, which is `--domain` followed by the domain name of the sub-domain to convert.
 
### Command line help

```text
virtualmin unalias-domain --domain domain.name
```
