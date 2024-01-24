---
title: "clone-domain"
date: 2024-01-23
weight: 4012045
---

### Duplicates an existing virtual server with a new name

 This command will duplicate an existing virtual server with a new domain name. Any web content, DNS records, mailboxes, mail aliases, databases and other settings associated with the original domain will be duplicated, where possible.

 The virtual server to clone is selected with the `--domain` flag, and the new name is set with the `--newdomain` parameter. When cloning a top-level server the `--newuser` and `--newpass` flags can be used to set the login and password of the new user that will be created as part of the cloning process.

 If the cloned virtual server has a private IP address, Virtualmin will allocate a new IP for the clone from the configured IP allocation range. If no ranges are defined or you want to use a specific address, the `--ip` flag can be given instead, followed by the address for the new domain to use.

 The cloning process will copy any databases associated with the original domain under new names, and duplicate their contents. However, it will _not_ update any scripts installed into the original domain that are configured to use the original databases - this must be done manually.

 
### Command line help

```text
virtualmin clone-domain --domain domain.name
                        --newdomain new.name
                       [--newuser name]
                       [--newpass password]
                       [--ip address [--ip-already]]

```
