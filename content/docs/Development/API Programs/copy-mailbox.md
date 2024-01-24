---
title: "copy-mailbox"
date: 2024-01-23
weight: 4012575
---

### Copy mail from one location to another, perhaps converting formats

The source mail is specified with the `--source` flag, and the destination with the `--dest` parameter. Both must be followed by a full path, which can end with a `/` to indicate that it is in `Maildir` format.

By default email is just coped, but the `--delete` flag can be given to have it moved instead.

### Command line help

```text
virtualmin copy-mailbox --source file
                        --dest file
                        [--delete]
```
