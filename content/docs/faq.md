---
title: "FAQ"
date: 2023-11-24
author: "Ilia Ross"
weight: 4000000
---
## FAQ
### Installation

> **Should I install Webmin before I run `virtualmin-install.sh` script?**

No.  The install script runs best on a freshly installed Grade A [supported operating](/docs/os-support/#grade-a-supported-systems) system.

> **Should I install Apache or Postfix, and other similar packages before I run `virtualmin-install.sh` script?**

No. The install script runs best on a freshly installed Grade A [supported operating](/docs/os-support/#grade-a-supported-systems) system.

> **What if I already installed Webmin on my system?**

If you installed from the standard package type for your system downloaded from one of our repositories, everything should be fine.  Running `virtualmin-install.sh` should work without any trouble.

If you installed from a third party source, or you don't know where it came from (like it was provided on a dedicated server you've rented from your hosting provider), you should uninstall it, and make sure whatever software repository it came from has been disabled.

> **What if Apache or Postfix, and other similar packages are already installed on my system?**

If you installed from the OS standard repository for your OS, everything should be fine. If you installed from any third party sources, or from source, the installation will fail and things will go badly. The install script cannot accommodate packages installed from non-standard sources.

If you can re-install your OS, it is recommended that you start with a freshly installed Grade A [supported operating](/docs/os-support/#grade-a-supported-systems) system.

> **I installed manually or using packages from a third party source, and I have the following error after install: "The `suexec` command on your system is configured to only run scripts under `/var/www`, but the Virtualmin virtual server home directory is `/home`. CGI and PHP scripts run as domain owners will not be executed."**

The Apache `suexec` command on your system is misconfigured for use in a virtual hosting environment, and needs to be recompiled or configured (on systems that provide a configurable `suexec` command) with the docroot set to `/home`. On Debian/Ubuntu systems, you can install the `apache2-suexec-custom` package, and modify `/etc/apache2/suexec/www-data` to include `/home`. On other systems, you will need to recompile the Apache package or the `suexec` binary, which we strongly not recommend doing.

### License
> **How to upgrade Virtualmin license?**

When upgrading Virtualmin Professional licenses, it is never necessary to re-install Virtualmin! If you have purchased a new, upgraded, license, use the `virtualmin change-license` command to update to the new serial number and license key found on your [My Account → Software Licenses](/account/software-licenses/) page.

### Package upgrades
> **How to update Virtualmin and all related packages?**

When a new version is available, you will see a message on the **Dashboard** page stating that there are Virtualmin related package updates available. Other packages may be listed too, depending on what is available to be updated. To install these updates, just click the **Install All Updates Now** button and follow onscreen instructions.

Upgrading from the command line is also possible, using the `dnf` or `apt-get` commands, depending on your OS.

For example, on RHEL and derivatives, you can run the following command to update all system packages, including Virtualmin related ones:

```text
sudo dnf update -y
```

On Debian and derivatives, you can run the following command:

```text
sudo apt-get update && apt-get upgrade -y
```

Alternately, you can install specific packages, e.g.:

```text
sudo dnf update perl webmin wbm-virtual-server usermin -y
```

or

```text
sudo apt-get install perl webmin webmin-virtual-server usermin -y
```

> **Virtualmin and all related packages are outdated, and no updates are available. Why?**

This problem typically arises from outdated repositories. To resolve the issue, simply re-setup the Virtualmin repositories by executing the command below. This command is designed to function across all Grade A and some Grade B supported [operating systems](/docs/os-support/) and is compatible with both Virtualmin GPL and Pro versions:

```
sudo sh -c "$(curl -fsSL https://software.virtualmin.com/gpl/scripts/virtualmin-install.sh)" -- --setup
```

### User interface
> **What modules are included in the 'Un-used Modules' section in Webmin?**

Un-used modules means "Modules that are installed but for which the detection logic in the module did not find the related packages installed". Any module that has service detection functions will end up in un-used modules if it does not detect the service or application it manages. The way to get a module out of unused modules is to install the related package. Many standard modules will be in unused modules on any given system, because no system should be doing everything a Webmin system can manage, that'd be a chaotic.

