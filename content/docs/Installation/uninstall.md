---
title: "Uninstalling Virtualmin"
date: 2023-11-22
weight: 2020000
---

If you only want to stop using Virtualmin Pro features and keep Virtualmin on the server, use the `virtualmin downgrade-license` command documented in [downgrade-license](/docs/development/api-programs/downgrade-license/) instead. This page is only about removing Virtualmin itself.

### Uninstalling
There are many levels of uninstalling Virtualmin. The most extreme is using the `--uninstall` flag of the install script:

```text
sudo sh virtualmin-install.sh --uninstall
```
{{< note "This is a rather haphazard uninstall routine, that will remove pretty much everything Virtualmin installed, including its core dependencies. This should never be done on a system that is in production. It is very destructive. It is primarily for use when you tried an installation option (for example using Nginx instead of Apache) and have decided to change after trying it out." "Warning:" "exclamation" "danger" >}}
