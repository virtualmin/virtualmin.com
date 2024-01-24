---
title: "delete-backup"
date: 2024-01-23
weight: 4012595
---

### Delete one previous logged backup

This command removes a Virtualmin backup, which can be identified either using the `--id` flag followed by a backup log ID (from the `list-backup-logs` command), or `--dest` followed by a destination path like `/backups/foo.com.tar.gz`.
 
### Command line help

```text
virtualmin delete-backup [--id backup-id]
                         [--dest url]
```
