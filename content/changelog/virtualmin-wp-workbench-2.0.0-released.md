---
title: "Virtualmin WP Workbench 2.0.0 released"
date: 2025-09-08T14:23:44+02:00
tags: ["changelog", "virtualmin-wp-workbench-changelog"]
author: "Ilia Ross"
---

* Add a new bulk management interface in UI and CLI, across local and remote WordPress instances
* Add detailed listing for instances' core, plugins, and themes in the new bulk management interface
* Add scheduled backup and restore support to the new bulk management interface
* Add a new dashboard tab with site preview, disk and memory usage, backup count and size
* Add option to choose thumbnail providers for website preview
* Add extended info display for core, plugins, and themes, plus integrity checks for core and plugins
* Add ability to set up password protection for the WP admin dashboard
* Add database search-and-replace feature for individual instances
* Add support for installing and upgrading WP-CLI command
* Add caching for all local and remote instances for ultimate performance
* Change `--script-type` parameter to `--app` for consistency in `configure-script` and `configure-all-scripts` CLI subcommands
* Change `--opt` CLI parameter to `--apply` for consistency in `configure-script` subcommand
* Change backup location to `~/wp-workbench-backups` under the user's home directory

{{< link "dark|outline|small" "forum" "https://forum.virtualmin.com/t/virtualmin-wp-workbench-module-version-2-0-0-released/134924" "View on the forum" >}}
