---
title: "list-scripts"
date: 2024-01-23
weight: 4012345
---

### Display script installed into some virtual server

The virtual servers to display scripts for can be specified with the `--domain` parameter, which must be followed by a domain name and can appear multiple times. Alternately you can use `--all-domains` to select all of them, or `--user` to show scripts for virtual servers owned by a specific Virtualmin administrator.

The program displays a table of all scripts currently installed, including their install IDs and version numbers. To get more details in a parsable format, use the `--multiline` parameter. To just get a list of script names, use `--name-only`.

To limit the output to just scripts of some type, use the `--type` flag followed by a script code name, like `phpmyadmin`.
 
### Command line help

```text
virtualmin list-scripts --all-domains | --domain name | --user username
                       [--multiline | --name-only]
                       [--type script]
```
