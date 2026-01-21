---
title: "Troubleshooting Repositories"
date: 2026-01-21
author: "Ilia Ross"
weight: 2021000
---
Having your Virtualmin repositories configured correctly is essential to receive the latest updates and security fixes. If you are not getting updates for Virtualmin, Webmin, or Usermin, your repositories are likely outdated or misconfigured.


### Reconfiguring Virtualmin repositories

To reset and correct the Virtualmin repositories, run the command below in a terminal over SSH. It works on all Grade A and some Grade B supported [operating systems](/docs/os-support/), and is compatible with both Virtualmin GPL and Pro:

```bash
curl -fsSL https://download.virtualmin.com/repository | sudo sh -s -- -s -B stable
```

### Fixing repositories using the Virtualmin CLI

Virtualmin also provides a `setup-repos` CLI command to repair repository configuration:

```bash
sudo virtualmin setup-repos
```

By default, this uses the currently configured branch, or `stable` if none is set. You can change branches with `--branch stable`, `--branch prerelease`, or `--branch unstable`, but `prerelease` and `unstable` should only be used for testing, **not for normal production systems**.
