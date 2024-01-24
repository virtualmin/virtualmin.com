---
title: "delete-shared-address"
date: 2024-01-23
weight: 4012605
---

### Removes an IP address that can be used by virtual servers

This command takes a single IP address out of the list available for use by multiple virtual servers, specified with the `--ip` flag. If the `--deactivate` flag is also given, the virtual interface associated with the IP will also be shut down.

### Command line help

```text
virtualmin delete-shared-address --ip address
                                [--deactivate]
```
