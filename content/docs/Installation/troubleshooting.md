---
title: "Troubleshooting Installation"
date: 2023-11-22
weight: 2021000
---

Most installation problems are related to having third party repositories enabled, attempting to run the install script on an unsupported operating system, and sometimes network connectivity.

### Installation "freezes" and never completes
Check the `/root/virtualmin-install.log`. It is possible that your package manager is configured to use a local CD ROM device for packages, and the disk is unavailable. Another possibility is that connections to one or more repositories are timing out, and causing the system to install packages very slowly.

### Third party repositories and package conflicts
If your package manager is configured to use non-OS package repositories, or if you have installed alternative versions of packages before installation, conflicts are likely to occur during installation. If you plan to use non-OS standard packages (other than those provided by Virtualmin repositories), they should be installed _after_ installation of Virtualmin, and you should add an exclude directive to the `dnf` or `apt-get` configuration in order to insure similar conflicts do not happen in the future. Also note that if you are using non-OS standard packages, you may need to configure the relevant Webmin module to make it aware of the location of the configuration files. Note that if your Linux distribution was installed by your ISP (such as with a VPS image), you may want to verify that no additional repositories were setup.

### Package manager errors
Sometimes package manager metadata can end up in a broken state. Try cleaning the metadata to see if it resolves the problem.

On EL systems (Alma/Rocky/CentOS):

```text
dnf clean all
```

On Debian and derivatives (Ubuntu):

```text
apt-get clean ; apt-get update
```

Then try the installation again.

### `/tmp` directory is mounted noexec

If you have run any so-called "hardening scripts" on your system before running `virtualmin-install.sh`, your `/tmp` directory may be mounted `noexec`. It is always best to run the install script on a freshly installed supported operating system, though this particular issue can be resolved. The install script cannot complete if this is the case, and `/tmp` will need to be remounted to allow executables. To do that:

```text
mount -o remount,exec /tmp
```

If you wish to switch back to your original settings after installation, you can use this command to reset the **noexec** option:

```text
mount -o remount,noexec /tmp
```

### ClamAV outdated errors
ClamAV is updated frequently by the upstream developers. Your OS repository may not have the latest version, which causes ClamAV to issue very scary warnings. These warnings are *non-fatal*, and can generally be safely ignored.

### ClamAV lookup error
We don't know why this happens. ClamAV has become very fragile in recent years. Usually, you can work around it though.

Before starting a scan, it's important to update the virus database by running:

```text
freshclam
```

Afterwards, try manually starting `clamd` service from the command line.

On EL systems:

```text
systemctl start clamd@scan
```

On Debian and derivatives:

```text
systemctl start clamav-daemon
```

Then trying again in the post-install wizard.

### Getting Help
Virtualmin Professional customers receive free installation service if the automated installation process fails to work correctly on any Grade A supported operating system listed on the [OS Support](/docs/os-support/) page. Open a ticket in the [issue tracker](/support/) with a description of your problem and the relevant portion of the `virtualmin-install.log`, and we will try to walk you through to a solution, or log into your system and complete the installation free of charge. Virtualmin GPL users can make use of the [forums](https://forum.virtualmin.com/) to ask for assistance with any problems that arise during installation.