---
title: "Virtualmin Podman 2.1.0 released"
date: 2026-10-28T02:47:24+01:00
tags: ["changelog", "virtualmin-podman-changelog"]
author: "Ilia Ross"
---

* Add a Percona Monitoring and Management Server recipe with rootless containers, persistent data and direct HTTPS access
* Add a phpIPAM recipe with a private database, generated administrator credentials and scheduled network discovery
* Add an IPv6 requirement for some recipes to fail early with a clear message when kernel IPv6 support is unavailable
* Fix to use HTTPS recipe URLs and secure cookies for Nginx SSL websites
* Fix to restrict custom pod flags to master administrators and trusted recipe deployments
* Fix to clean up user services, rootless Podman processes, subordinate UID and GID ranges, and migration files after deleting a domain's Unix account

{{< link "dark|outline|small" "forum" "https://forum.virtualmin.com/t/virtualmin-podman-module-2-1-0-released/138239" "View on the forum" >}}
