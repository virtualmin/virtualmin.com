---
title: "setup-repos"
subSection: "Repository"
date: 2024-01-23
author: "Ilia Ross"
weight: 4012550
---

### Setup Virtualmin repositories

This program can be used to setup or fix Virtualmin repositories.

You can force to update license serial and key used in repos all in one go by passing `--serial` and `--key` params. If not set, existing keys found in `/etc/virtualmin-license` will be used. GPL users should not use `--serial` and `--key` params unless they want to use this command for a quick Virtualmin Pro repositories setup.

In case `--serial` and `--key` params are set and license is not actually valid, the error will be returned, unless the `--no-check` param is given.

### Command line help

```text
virtualmin setup-repos [--serial number] [--key id] [--no-check]
```
