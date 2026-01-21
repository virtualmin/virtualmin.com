---
title: "setup-repos"
subSection: "Repository"
date: 2026-01-21
author: "Ilia Ross"
weight: 4012550
---

### Setup Virtualmin repositories

This command sets up or repairs Virtualmin software repositories.

By default, it uses the currently configured branch, or `stable` if none is set. You can choose a specific branch with `--branch stable`, `--branch prerelease`, or `--branch unstable`, but **`prerelease` and `unstable` are not recommended for normal users** and should only be used for testing or development.

You can also update the license serial and key used for Pro repositories by passing `--serial` and `--key`. If these are not provided, the existing values in `/etc/virtualmin-license` will be used. GPL users normally shouldn't use `--serial` and `--key` unless they are switching to Virtualmin Pro repositories.

If `--serial` and `--key` are given and the license is not valid, the command will return an error unless you also pass `--no-check`.

### Command line help

```text
virtualmin setup-repos [--branch <stable|prerelease|unstable>]
                       [--serial number] [--key id] [--no-check]
```
