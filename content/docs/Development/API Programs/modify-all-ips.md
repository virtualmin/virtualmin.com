---
title: "modify-all-ips"
date: 2024-01-23
weight: 4012755
---

### Update all virtual servers with a new IP address

This command updates all virtual servers using the IP address specified with the `--old-ip` flag, and switches them to using the IP set by `--new-ip`. It can be useful if your system's IP address has just changed, for example if it is dynamically assigned or was moved to a new network.

For convenience, the flag `--default-old-ip` can be used instead of `--old-ip` to select the default address used before the last update. Similarly, the flag `--detect-new-ip` can be used instead of `--new-ip` to automatically discover the system's current default address.

### Command line help

```text
virtualmin modify-all-ips [--old-ip address | --default-old-ip]
                          [--new-ip address | --detect-new-ip]
```
