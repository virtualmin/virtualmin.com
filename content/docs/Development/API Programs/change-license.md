---
title: "change-license"
subSection: "License"
date: 2024-01-23
weight: 4012530
---

### Change a system's Virtualmin license key

This program updates all files that we know contain a Virtualmin license key with a new serial and key. The two required parameters are `--serial` and `--key`, which of course are followed by a valid Virtualmin Pro serial number and key code respectively. If these are not actually valid, the program will refuse to apply them, unless the `--no-check` flag is given. If GPL detection must be disabled use the `--force-update` flag.
 
### Command line help

```text
virtualmin change-license --serial number
                          --key id
                         [--no-check]
                         [--force-update]
```
