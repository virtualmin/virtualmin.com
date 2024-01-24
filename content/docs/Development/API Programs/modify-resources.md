---
title: "modify-resources"
date: 2024-01-23
weight: 4012250
---

### Changes resource limits for some virtual servers

This program allows you to change limits on processes, memory and CPU time for one or more virtual servers. It is the equivalent of the **Resource Limits** page in the Virtualmin user interface.

The virtual servers to modify can be selected with the `--domain` flag, which must be followed by a top-level server name. Alternately you can use `--user` to select domains by administration username, or `--all-domains` to update every one on the system. Because limits are applied on a per-administration user basis, they apply to all sub-servers of those selected.

Limits on the number of processes allowed can be set with the `--max-procs` flag followed by a process count, or remove with `--no-max-procs`.

Maximum per-process run time in seconds is set with `--max-time`, and removed with `--no-max-time`.

The maximum memory each process can use is set the `--max-mem`, which must be followed by a number in bytes (of at least 1 MB), or removed with `--no-max-mem`.

### Command line help

```text
virtualmin modify-resources --domain name | --user name | --all-domains
                           [--max-procs num | --no-max-procs]
                           [--max-mem bytes | --no-max-mem]
                           [--max-time minutes | --no-max-time]
```
