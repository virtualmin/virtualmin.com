---
title: "Troubleshooting Repositories"
date: 2023-11-24
weight: 2021000
---
It is important to have Virtualmin repositories configured correctly to make sure the latest packages are installed.

If you cannot receive Virtualmin or Webmin and Usermin upgrades on time, it means your Virtualmin repositories are either outdated or configured incorrectly.

### How to re-setup Virtualmin repositories?
To resolve the issue, simply update the Virtualmin repositories. Execute the command below in the terminal via SSH. This command is designed to function across all Grade A and some Grade B supported [operating systems](/docs/os-support/) and is compatible with both Virtualmin GPL and Pro versions:


```bash
sudo sh -c "$(curl -fsSL https://software.virtualmin.com/gpl/scripts/virtualmin-install.sh)" -- --setup
```

{{< note "Script will automatically setup correct repositories depending on your installation type and version. Virtualmin Professional users do not need to take any extra steps." "Note:" "notification" >}}

### How to fix Virtualmin repositories using Virtualmin CLI?
Virtualmin versions 7.5 and above have a new CLI command to fix repositories. It is called `setup-repos` and can be used as follows:

```bash
sudo virtualmin setup-repos
```