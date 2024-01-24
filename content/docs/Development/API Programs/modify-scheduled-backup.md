---
title: "modify-scheduled-backup"
date: 2024-01-23
weight: 4012770
---

### Change some attributes of a scheduled backup

This command can be used to change some attributes of a scheduled backup that has been created in the Virtualmin user interface. The backup must be selected with the `--id` flag followed by a unique ID, as shown by the `list-scheduled-backups` command.

To stop a backup from running, you can use the `--disable` flag. Or to re-enable a backup that's been turned off, use the `--enable` flag.

### Command line help

```text
virtualmin modify-scheduled-backup --id backup-id
                                  [--enable | --disable]
```
