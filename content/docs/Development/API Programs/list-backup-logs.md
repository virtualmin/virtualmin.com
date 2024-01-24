---
title: "list-backup-logs"
date: 2024-01-23
weight: 4012670
---

### Outputs a list of backups that have been run

This command by default outputs logs of all backups made using Virtualmin, in a simple table format. To switch to a more detailed and parsable output format, add the `--multiline` flag to the command line.

To limit the display to backups that contain a specific domain, use the `--domain` flag followed by a virtual server name.

To limit to backups made by a particular Virtualmin user, use the `--user` flag followed by a username.

To only show backups made via the web UI, use the `--mode cgi` flag. To show scheduled backups, use `--mode sched`. Or to show backups made from the command line or remote API, use `--mode api`.

To only show backups that failed, add the `--failed` flag to the command line. Or to show backups that worked, use `--succeeded`. By default both are shown.

To limit the display to backups within some time range, use the `--start` flag followed by a date in _yyyy-mm-dd_ format to only show backups that started on or after this date. Or use `--end` to only show backups that started before the following date.

### Command line help

```text
virtualmin list-backup-logs [--domain domain.name |
                            [--user name]
                            [--failed | --succeeded]
                            [--mode "cgi"|"sched"|"api"]
                            [--start yyyy-mm-dd]
                            [--end yyyy-mm-dd]
                            [--multiline]
```
