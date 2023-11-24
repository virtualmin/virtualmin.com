---
title: "Installation Guides"
date: 2023-11-21
draft: false
weight: 2000
---
Virtualmin can be installed in a number of ways, including an automated install script, which uses the standard package management features of your OS, and software repositories containing our software in native package formats. We strongly recommend that you use the automated install script to install Virtualmin, if at all possible.

Most people can just follow the simple instructions on the [Download](/download/) page. Return here if that proves insufficient.

### Automated installation

Installation of the full Virtualmin stack using our automated install script. This is the recommended way to install Virtualmin.

### Manual installation

Installation of Virtualmin and related packages manually. This method is time-consuming, and requires a high level of technical experience. This is _not recommended_, except in cases where the automated installation is inappropriate or impossible.

### Installation troubleshooting

Troubleshooting common problems encountered during installation. 

### Uninstalling Virtualmin

Uninstallation, downgrading from Virtualmin Professional to Virtualmin GPL, and selective removal of packages.

---

### Installation FAQ

> #### Should I install Webmin before I run `virtualmin-install.sh` script?

No.  The install script runs best on a freshly installed Grade A [supported operating](/docs/os-support/#grade-a-supported-systems) system.

> #### Should I install Apache or Postfix, and other similar packages before I run `virtualmin-install.sh` script?

No. The install script runs best on a freshly installed Grade A [supported operating](/docs/os-support/#grade-a-supported-systems) system.

> #### What if I already installed Webmin on my system?

If you installed from the standard package type for your system downloaded from one of our repositories, everything should be fine.  Running `virtualmin-install.sh` should work without any trouble.

If you installed from a third party source, or you don't know where it came from (like it was provided on a dedicated server you've rented from your hosting provider), you should uninstall it, and make sure whatever software repository it came from has been disabled.

> #### What if Apache or Postfix, and other similar packages are already installed on my system?

If you installed from the OS standard repository for your OS, everything should be fine. If you installed from any third party sources, or from source, the installation will fail and things will go badly. The install script cannot accommodate packages installed from non-standard sources.

If you can re-install your OS, it is recommended that you start with a freshly installed Grade A [supported operating](/docs/os-support/#grade-a-supported-systems) system.

> #### I installed manually or using packages from a third party source, and I have the following error after install: "The `suexec` command on your system is configured to only run scripts under `/var/www`, but the Virtualmin virtual server home directory is `/home`. CGI and PHP scripts run as domain owners will not be executed."

The Apache `suexec` command on your system is misconfigured for use in a virtual hosting environment, and needs to be recompiled or configured (on systems that provide a configurable `suexec` command) with the docroot set to `/home`. On Debian/Ubuntu systems, you can install the `apache2-suexec-custom` package, and modify `/etc/apache2/suexec/www-data` to include `/home`. On other systems, you will need to recompile the Apache package or the `suexec` binary, which we strongly not recommend doing.
