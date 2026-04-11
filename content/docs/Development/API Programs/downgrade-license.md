---
title: "downgrade-license"
date: 2024-01-23
weight: 4012535
---

### Downgrade Virtualmin Pro system to GPL version

If you want to keep using Virtualmin on the same server but no longer need Virtualmin Pro features, use this command to downgrade to Virtualmin GPL instead of uninstalling Virtualmin.

This is not a full uninstall. Your existing virtual servers and other GPL-supported services remain in place. The downgrade switches the system to GPL licensing and repositories, replaces the Pro package with the GPL package, removes Pro-only plugins, and locks reseller accounts.

### Command line help

```text
virtualmin downgrade-license
```

The command asks for confirmation before making changes.

### What changes during downgrade

- The Virtualmin license is changed to GPL
- Virtualmin repositories are switched to the GPL repositories
- The Virtualmin Pro package is replaced with the GPL package
- Pro-only plugins such as Virtualmin Support, Virtualmin WP Workbench and Virtualmin Podman are removed
- Reseller accounts are locked, because reseller management is a Pro-only feature
