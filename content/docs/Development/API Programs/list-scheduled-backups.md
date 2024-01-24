---
title: "list-scheduled-backups"
date: 2024-01-23
weight: 4012025
---

### Outputs a list of scheduled backups

 By default, this program displays a table of all scheduled backups on the system. You can limit it to those owned by some virtual server with the `--domain` or `--user` flag, or to a reseller with the `--reseller` flag. These must be followed by a domain name, administration username or reseller login respectively.

 To switch to a more detailed and parsable output format, add the `--multiline` flag to the command line. To show only scheduled backup IDs, use the `--id-only` flag.
 
### Command line help

```text
virtualmin list-scheduled-backups [--domain domain.name |
                                   --user name |
                                   --reseller name]
                                  [--multiline | --id-only]

```
