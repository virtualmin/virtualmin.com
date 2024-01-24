---
title: "downgrade-license"
date: 2024-01-23
weight: 4012535
---

### Downgrade Virtualmin Pro system to GPL version

This program downgrades Virtualmin Pro system to GPL by performing various actions like, swapping Pro package with GPL variant, locking resellers accounts, automatically switching repositories and reverting the license to GPL. The only required parameter to perform downgrade is `--perform`. Be careful, this program will not ask for confirmation before performing downgrade.

### Command line help

```text
virtualmin downgrade-license --perform
```
