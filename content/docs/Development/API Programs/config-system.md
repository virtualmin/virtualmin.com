---
title: "config-system"
date: 2024-01-23
weight: 4012570
---

### Perform initial configuration of system services

This program is used to configure a system for use as a Virtualmin system. It can be used to configure a system for the first time, or to reconfigure a system that has been used for other purposes.

### Command line help

```text
virtualmin config-system  --help|-h          Print this summary of options and exit
                          --list-bundles|-s  List available installation bundles
                          --list-plugins|-p  List available plugins
                          --bundle|-b        A bundle of plugins to execute
                          --log|-l           Path to a file for logging actions
                          --include|-i       One or more extra plugins to include
                          --exclude|-x       One or more plugins to exclude
                          --test|-t          Test services after configured (when available)
```
