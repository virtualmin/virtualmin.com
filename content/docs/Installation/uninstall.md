---
title: "Uninstalling Virtualmin"
date: 2023-11-22
weight: 2020000
---

### Uninstalling
There are many levels of uninstalling Virtualmin. The most extreme is using the `--uninstall` flag of the install script:

```text
sh virtualmin-install.sh --uninstall
```
{{< note "This is a rather haphazard uninstall routine, that will remove pretty much everything Virtualmin installed, including its core dependencies. This should never be done on a system that is in production. It is very destructive. It is primarily for use when you tried an installation option (for example using Nginx instead of Apache) and have decided to change after trying it out." "Warning:" "exclamation" "danger" >}}

### Downgrading Virtualmin Professional to GPL

If you no longer need the features of Virtualmin Professional, but wish to continue to use Virtualmin on your system, you can downgrade quite easily by running:

```text
virtualmin downgrade-license --perform
```
{{< note "It will completely replace Virtualmin Pro package with GPL variant, making it impossible to use Pro features anymore. It will also disable all reseller accounts. By downgrading to GPL, you will no longer support the product development." "Note:" "notification" "primary" >}}

