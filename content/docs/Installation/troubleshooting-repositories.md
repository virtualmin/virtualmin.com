---
title: "Troubleshooting Repositories"
date: 2026-01-21
author: "Ilia Ross"
weight: 2021000
---
Having your Virtualmin repositories configured correctly is essential to receive the latest updates and security fixes. If you are not getting updates for Virtualmin, Webmin, or Usermin, your repositories are likely outdated or misconfigured.


### Reconfiguring Virtualmin repositories

To reset and correct the Virtualmin repositories, run one of the commands below in a terminal over SSH. Both methods work on all Grade A and some Grade B supported [operating systems](/docs/os-support/), and are compatible with both Virtualmin GPL and Pro.

If Virtualmin is already installed, use the CLI command:

```bash
sudo virtualmin setup-repos
```

The CLI command uses the currently configured branch, or `stable` if none is set. You can change branches with `--branch stable`, `--branch prerelease`, or `--branch unstable`, but `prerelease` and `unstable` should only be used for testing, **not for normal production systems**.

If Virtualmin is not installed yet, or the `virtualmin` command is not available, use the repository setup script:

```bash
curl -fsSL https://download.virtualmin.com/repository | sudo sh -s -- -s -B stable
```

This configures [download.virtualmin.com](https://download.virtualmin.com), the production repository for Virtualmin and related packages.

### Webmin module packages

Starting with Virtualmin 8, Webmin packages from the Virtualmin repositories are modular. A new Virtualmin system gets the Webmin core modules by default, and additional Webmin modules can be installed only when you need them.

{{< alert primary exclamation "" "For new manual and automated installs, treat [download.virtualmin.com](https://download.virtualmin.com) as the production repository. The development repository at [download.webmin.dev](https://download.webmin.dev) uses the same modular Webmin layout, but is for testing new builds before they reach production." >}}

If an older Virtualmin system is still using the [software.virtualmin.com](https://software.virtualmin.com) repository, running the repository setup command above, or `virtualmin setup-repos`, automatically switches it to [download.virtualmin.com](https://download.virtualmin.com). During that switch, Virtualmin keeps the Webmin modules the system was already using by installing the matching modular `webmin-*` packages for modules from the previous full Webmin install.

Older Webmin packages usually installed every standard Webmin module in one large package. That meant a Virtualmin server could have modules for services it would never run, such as Samba, Squid, LDAP, clustering tools, NFS, iSCSI, or other system-specific services.

New installs from the Virtualmin repositories install the Webmin core set instead. This includes the modules most Virtualmin systems need for normal hosting and server administration, such as users, groups, packages, cron, logs, filesystems, firewalls, SSH, Apache, Nginx, BIND, Postfix, Dovecot, ProFTPd, MySQL/MariaDB, quotas, Usermin, and the Webmin configuration modules.

Modules outside that core set are still available. They are just separate packages now, so they do not have to be present on every server. The module name is the Webmin module directory name, such as `postgresql`, `samba`, `squid`, `ldap-server`, or `webalizer`. The package name is normally `webmin-` plus the module name, for example `webmin-postgresql`.

Keeping optional modules separate means new installs are cleaner, with few, if any, unused modules in the Webmin menu. Servers install fewer files and fewer service-specific dependencies, updates can be smaller and more focused, and administrators can add only the modules that match the services they actually run.

{{< alert warning exclamation-triangle "" "If you intentionally want the older full Webmin package with all standard modules bundled together, the standard Webmin repository at [download.webmin.com](https://download.webmin.com) and the legacy Virtualmin repository at [software.virtualmin.com](https://software.virtualmin.com) still provide full Webmin builds. The production repository at [download.virtualmin.com](https://download.virtualmin.com) provides the modular core Webmin package instead." >}}
