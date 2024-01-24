---
title: "start-stop-script"
date: 2024-01-23
weight: 4012820
---

### Stops, starts or restarts the server process for some script

This command can be used to start, stop or restart the server process behind some script, such as one using Node.js. It takes the usual `--domain` parameter to identify the server, and either `--id` followed by the install ID, or `--type` followed by the script's short name. The latter option is more convenient, but only works if there is only one instance of the script in the virtual server. If multiple different versions are installed, you can also use `--version` to select a specific one to manage.

The action to take on the chosen script must be specified with exactly one of the `--start` , `--stop` or `--restart` flags.
 
### Command line help

```text
virtualmin start-stop-script --domain domain.name
                            [--type name --version number] |
                            [--id number]
                             --start | --stop | --restart

```
