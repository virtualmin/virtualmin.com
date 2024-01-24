---
title: "create-shared-address"
date: 2024-01-23
weight: 4012590
---

### Adds an IP address for use by multiple virtual servers

This command can be used to make an existing IP address on your system available for multiple virtual servers. You must supply the `--ip` flag, followed by the address of an interface that is already active.

Alternately, it can select and activate a free IP address with the `--allocate-ip` and `--activate` flags. However, you must first have defined an allocation range in the Virtual IP Addresses section of the default server template.

### Command line help

```text
virtualmin create-shared-address --ip address | --allocate-ip
                                [--activate]
```
