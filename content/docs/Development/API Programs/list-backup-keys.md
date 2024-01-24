---
title: "list-backup-keys"
date: 2024-01-23
weight: 4012035
---

### Lists all available backup encryption keys

When run with no flags, this command outputs a table of backup keys for use by scheduled and manula backups. To get a more parsable format with full details for each shell, use the `--multiline` parameter. Or to only output key IDs, use the `--id-only` flag.

### Command line help

```text
virtualmin list-backup-keys [--multiline]
                            [--id-only]
```
