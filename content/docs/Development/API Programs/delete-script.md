---
title: "delete-script"
date: 2024-01-23
weight: 4012340
---

### Un-install one script from a virtual server

This program completely removes a third-party script from a server. It takes the usual `--domain` parameter to identify the server, and either `--id` followed by the install ID, or `--type` followed by the script's short name. The latter option is more convenient, but only works if there is only one instance of the script in the virtual server. If multiple different versions are installed, you can also use `--version` to select a specific one to remove.

Be careful using this program, as it removes all data files, web pages and database tables for the script, without asking for confirmation. If you want to make Virtualmin forget about a script without actually removing it, use the `--deregister` flag.

### Command line help

```text
virtualmin delete-script --domain domain.name
                        [--type name --version number] |
                        [--id number]
                        [--deregister]
```
