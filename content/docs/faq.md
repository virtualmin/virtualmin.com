---
title: "FAQ"
date: 2023-11-24
author: "Ilia Ross"
weight: 4000
---
> #### How to upgrade Virtualmin license?
When upgrading Virtualmin Professional licenses, it is never necessary to re-install Virtualmin! If you have purchased a new, upgraded, license, use the `virtualmin change-license` command to update to the new serial number and license key found on your [My Account → Software Licenses](/account/software-licenses/) page.

> #### How to update Virtualmin and all related packages?
When a new version is available, you will see a message on the **Dashboard** page stating that there are Virtualmin related package updates available. Other packages may be listed too, depending on what is available to be updated. To install these updates, just click the **Install All Updates Now** button and follow onscreen instructions.

Upgrading from the command line is also possible, using the `dnf` or `apt-get` commands, depending on your OS.

For example, on RHEL and derivatives, you can run the following command to update all system packages, including Virtualmin related ones:

```text
dnf update -y
```

On Debian and derivatives, you can run the following command:

```text
apt-get update && apt-get upgrade -y
```

Alternately, you can install specific packages, e.g.:

```text
dnf update perl webmin wbm-virtual-server usermin -y
```

or

```text
apt-get install perl webmin webmin-virtual-server usermin -y
```

> #### Virtualmin and all related packages are outdated, and no updates are available. Why?
This problem typically arises from outdated repositories. You can update the Virtualmin repositories, applicable to all [supported operating systems](/docs/os-support/) and both Virtualmin GPL and Pro versions, with the following command:


```
sudo sh -c "$(curl -fsSL https://software.virtualmin.com/gpl/scripts/virtualmin-install.sh)" -- --setup

```

If `curl` command is not available on your system, you can use `wget` instead:

```
sudo sh -c "$(wget -nv -O - https://software.virtualmin.com/gpl/scripts/virtualmin-install.sh)" -- --setup
```

> #### What modules are included in the 'Un-used Modules' section in Webmin? 
Un-used modules means "Modules that are installed but for which the detection logic in the module did not find the related packages installed". It has nothing to do with "official" modules. e.g. if you don't have BIND installed on your system, the BIND module (the most official module of them all, as it was, I believe, the very first module in Webmin) could be in un-used modules.

_Any_ module that has service detection functions will end up in un-used modules if it does not detect the service or application it manages. The way to get a module out of unused modules is to install the related package. Many standard modules will be in unused modules on any given system, because no system should be doing everything a Webmin system can manage, that'd be a chaotic as hell server performing 100 different tasks.

It is true that we can't take responsibility for 3rd party modules, but that has nothing to do with un-used modules. Un-used modules is about whether you're using them. If you don't have the BIND package installed, obviously you aren't using the BIND module, so there's no reason to clutter up the menus with it.

Edit: Also, every module that comes with Webmin is maintained by Jamie (or one of us, but mostly Jamie). There are no third-party modules in the Webmin package, by our definition. Once it is adopted into Webmin core, it becomes our responsibility even if much of the original code was written by someone else (e.g. the awesome/excellent Postfix and the new-ish HTML File Manager were mostly originally written by others, but they've been adopted into Webmin core years ago and are now maintained by us). Once it is in the standard Webmin package it is no longer a third-party module.

