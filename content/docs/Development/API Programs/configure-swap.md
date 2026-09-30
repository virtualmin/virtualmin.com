---
title: "configure-swap"
date: 2026-09-09
weight: 4012551
---

### Configure swap space

This command downloads the current installer and runs only swap setup, without installing packages or changing repositories.

Use `--size 2G` to create, resize or reuse a 2 GiB swapfile, or `--size 0` to remove the installer-managed swapfile and its boot configuration. Other swap stays untouched. Bare sizes mean MiB; suffixes `K`, `M` and `G`, with an optional `B`, use binary units and ignore case.

Without `--size`, automatic sizing uses RAM, active swap and free disk space, leaving an existing managed swapfile unchanged. Btrfs uses a dedicated swap subvolume. See [swap configuration](/docs/installation/automated/#swap) for sizing and filesystem requirements.

The command applies changes without prompting, including through the remote API. Details are saved to `virtualmin-swap.log` in the module's log directory. Only master administrators can use this command. Failures return a non-zero exit status.

### Command line help

```text
virtualmin configure-swap [--size <size>]
```

### Examples

```text
virtualmin configure-swap --size 2G
virtualmin configure-swap --size 0
virtualmin configure-swap
```
