---
title: "delete-domain"
date: 2024-01-23
weight: 4012050
---

### Delete one or more virtual servers

To delete one or many servers (and all of their sub-servers and alias domains) from the system, use this program. The domains to remove can be specified with the `--domain` flag, which can be given multiple times. Alternately, you can select virtual servers by username, using the `--user` flag.

The `--only` option can be used to not actually delete the servers, but instead simply remove them from the control of Virtualmin. Similarly, the `--preserve-remote` flag tells Virtualmin to not delete any databases, home directories or users stored on remote systems. This can be useful when removing a domain that is replicated across multiple hosts with shared storage.

Be careful with this program, as unlike the server deletion function in the Virtualmin web interface, it will _not_ prompt for confirmation!
 
### Command line help

```text
virtualmin delete-domain [--domain domain.name]*
                         [--user username]*
                         [--only]
                         [--preserve-remote]
```
