---
title: "Virtualmin WP Workbench 2.0.1 released"
date: 2025-09-19T13:08:16+02:00
tags: ["changelog", "virtualmin-wp-workbench-changelog"]
author: "Ilia Ross"
---

* Fix to exclude its backup directory from backups to avoid recursion
* Fix to exclude itself from scheduled backups by default to reduce overhead
* Fix to correctly handle errors when the domain user quota is exceeded
* Fix to ignore domain user quotas when restoring backups to prevent failures
* Fix to prevent failures caused by domain user quota when backing up as the master administrator

{{< link "dark|outline|small" "forum" "https://forum.virtualmin.com/t/virtualmin-wp-workbench-module-version-2-0-1-released/135153" "View on the forum" >}}
