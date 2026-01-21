---
title: "OS Support"
date: 2026-01-21
author: "Ilia Ross"
draft: false
weight: 900000
---

Virtualmin runs on top of Webmin. Webmin works on almost every UNIX-like OS, so with some manual setup Virtualmin can run on many of them, too. However, we only provide an [automated](/docs/installation/automated/) installation script and managed software updates for a smaller set of popular systems.

If you're new to Virtualmin and want a smooth install and easy maintenance, pick one of our Grade A supported systems. If you're unsure which one, use the latest supported version of the OS you know best.

### Grade A supported systems

Grade A systems have an automated installation script and a maintained software repository for updates, and are expected to work out of the box when you run the installer on a freshly installed system. We strongly recommend the current stable release of one of these systems for most users. We don't support beta or pre-release versions of any OS.

#### Enterprise Linux and derivatives
- Red Hat Enterprise Linux 8, 9, and 10 on x86_64 and aarch64
- AlmaLinux and Rocky Linux 8, 9, and 10 on x86_64 and aarch64

#### Debian Linux and derivatives
- Debian 12 and 13 on i386, amd64, and arm64
- Ubuntu 22.04 LTS and 24.04 LTS on i386, amd64, and arm64

### Grade B supported systems

These operating systems are **not** recommended for new or intermediate users. You should only use them if you're already comfortable with both your OS and Virtualmin. If you're unsure, choose a Grade A supported OS instead.

Most Grade B systems don't fully support automatic installation, but they can work well if you know how to configure and integrate the required services yourself. Virtualmin has been run on all of these, but they're only recommended for experienced admins. We'll try to help with Virtualmin issues on these platforms, but they get little or no direct testing.

#### Grade B systems with automatic installation support

To enable automatic installation on these systems, run the installer with:

```text
sudo sh virtualmin-install.sh --os-grade B
```

##### Enterprise Linux and derivatives
- Fedora Server 43 and later on x86_64 and aarch64
- CentOS Stream 8, 9, and 10 on x86_64 and aarch64
- Amazon Linux 2023 on x86_64 and aarch64
- Oracle Linux 8, 9, and 10 on x86_64 and aarch64
- openEuler 24.03 and later on x86_64 and aarch64
- CloudLinux 8 and 9 on x86_64  

##### Debian Linux and derivatives
- Ubuntu 26.04 developer preview on i386, amd64, and arm64
- Kali Linux Rolling on amd64 and arm64
- Ubuntu interim (non-LTS) releases on i386, amd64, and arm64

#### Grade B systems without automatic installation support
- Raspbian Linux
- openSUSE Linux
- FreeBSD
- OpenBSD
- NetBSD

### Others

If your UNIX-like OS isn't listed above, Virtualmin may still work. Start by installing Webmin; if Webmin works, you're partway to confirming that Virtualmin can, too. But getting all services working nicely together will be a manual, expert-level job.
