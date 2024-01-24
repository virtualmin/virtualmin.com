---
title: "delete-reseller"
date: 2024-01-23
weight: 4012320
---

### Delete one reseller

This program deletes a single reseller account, specified by the `--name` parameter. It does not effect any of the virtual servers owned by the reseller, except to mark them as no longer owned by any reseller. It does _not_ prompt for confirmation before deleting either.

### Command line help

```text
virtualmin delete-reseller --name login
```
