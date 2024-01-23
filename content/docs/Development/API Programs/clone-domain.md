---
title: "clone-domain"
author: ""
weight: 4012010
---

### Duplicate an existing virtual server with a new name
This command will duplicate an existing virtual server with a new domain name. Any web content, DNS records, mailboxes, mail aliases, databases and other settings associated with the original domain will be duplicated, where possible.

The virtual server to clone is selected with the `--domain` flag, and the new name is set with the `--newdomain` parameter. When cloning a top-level server the `--newuser` and `--newpass` flags can be used to set the login and password of the new user that will be created as part of the cloning process.

The cloning process will copy any databases associated with the original domain under new names, and duplicate their contents. However, it may _not_ update all scripts installed into the original domain that are configured to use the original databases.

### Command line help

```text
virtualmin clone-domain --domain domain.name
                        --newdomain new.name
                       [--newuser name]
                       [--newpass password]
                       [--ip address [--ip-already]]
```