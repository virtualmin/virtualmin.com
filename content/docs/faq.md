---
title: "FAQ"
date: 2023-11-24
author: "Ilia Ross"
weight: 800000
---
## FAQ
### Installation

> ##### Should I install Webmin before I run `virtualmin-install.sh` script?

No.  The install script runs best on a freshly installed Grade A [supported operating](/docs/os-support/#grade-a-supported-systems) system.

> ##### Should I install Apache or Postfix, and other similar packages before I run `virtualmin-install.sh` script?

No. The install script runs best on a freshly installed Grade A [supported operating](/docs/os-support/#grade-a-supported-systems) system.

> ##### What if I already installed Webmin on my system?

If you installed from the standard package type for your system downloaded from one of our repositories, everything should be fine.  Running `virtualmin-install.sh` should work without any trouble.

If you installed from a third party source, or you don't know where it came from (like it was provided on a dedicated server you've rented from your hosting provider), you should uninstall it, and make sure whatever software repository it came from has been disabled.

> ##### What if Apache or Postfix, and other similar packages are already installed on my system?

If you installed from the OS standard repository for your OS, everything should be fine. If you installed from any third party sources, or from source, the installation will fail and things will go badly. The install script cannot accommodate packages installed from non-standard sources.

If you can re-install your OS, it is recommended that you start with a freshly installed Grade A [supported operating](/docs/os-support/#grade-a-supported-systems) system.

> ##### I installed Apache manually or using packages from a third party source

I have the following error after install: "The `suexec` command your system is configured to only run scripts under `/var/www`, but the Virtualmin virtual server home directory is `/home`. CGI and PHP scripts run as domain owners will not be executed."

The Apache `suexec` command on your system is misconfigured for use in a virtual hosting environment, and needs to be recompiled or configured (on systems that provide a configurable `suexec` command) with the docroot set to `/home`. On Debian/Ubuntu systems, you can install the `apache2-suexec-custom` package, and modify `/etc/apache2/suexec/www-data` to include `/home`. On other systems, you will need to recompile the Apache package or the `suexec` binary, which we strongly not recommend doing.

> ##### What if I need to install it on a server that is already setup and running?
It's highly recommended to install Virtualmin on a new, [Grade A](/docs/os-support/#grade-a-supported-systems) supported operating system. If installation on an active server is necessary, make sure to back up all data beforehand.

The final results will depend on how invasive the changes to the running system were. Anything that conflicts with what the Virtualmin install script does would be a source of trouble. What kind of trouble is difficult to predict. The biggest risk would be causing some packages you use to be uninstalled (to satisfy dependencies of Virtualmin).

The safer way to do it would be to do the following, instead of using the full `virtualmin-install.sh` installer:

Setup Virtualmin repos:

```text
./virtualmin-install.sh --setup
```

Install dependencies but carefully. Look at the list of what will be installed, and more importantly, what will be removed:

```text
apt install virtualmin-lamp-stack
```

or

```text
dnf group install --setopt=group_package_types=mandatory,default "Virtualmin LAMP Stack"
```

Or, if you want to keep it as small as possible to start, to reduce the surface area for problems (or if you're not hosting mail):

```
apt install virtualmin-lamp-stack-minimal
```

or

```text
dnf group install --setopt=group_package_types=mandatory,default "Virtualmin LAMP Stack Minimal"
```

Assuming default configuration of `apt` or `dnf`, it'll ask before doing any removals. Don't type "y" until you know the changes being made won't break something you depend on.

Then install Virtualmin itself:

```
apt install virtualmin-core
```

or

```text
dnf group install --setopt=group_package_types=mandatory,default "Virtualmin Core"
```

Then, assuming everything seems to be fine, run the appropriate configuration bundle (this step also has some risks, and you won't be given any warning about what it's doing, it assumes that if you tell it to do something you mean it):

```text
virtualmin-config-system --bundle LAMP
```

Or use the `MiniLAMP` bundle if you did the minimal dependency install above.

Assuming everything goes right, you'd then have roughly the same system the Virtualmin install script would produce, but it would give you a couple of opportunities to bail if something disastrous is about to happen.

It's also possible to selectively run the config step. Or selectively install dependencies, but I'll leave that as an exercise for the reader. The things `virtualmin-config-system` does can be found in [Virtualmin config](https://github.com/virtualmin/Virtualmin-Config/tree/master/lib/Virtualmin/Config) GitHub repo.

If you wanted to handroll an installation that's exactly the things you need and nothing you don't. But, that's a lot more work. If you don't have any mail setup and if you don't have much in the Apache configuration, yet, then running the automated stages of the install manually if probably safe-ish.

### License

> ##### How do I upgrade from GPL to Pro

Once you have a serial number and a license key, you would need to undergo GPL to Pro upgrade by going to **System Settings ⇾ Upgrade to Virtualmin Pro** page. No other commands mentioned below should be run in this type of upgrade.

> ##### How to upgrade Virtualmin license?

Upgrading your Virtualmin Professional license is straightforward and does not require a reinstallation of Virtualmin! Once you've purchased your new license, just run the `virtualmin change-license` command. This action will update your system with the new serial number and license key. All existing licenses details can be found in the [My Account → Software Licenses](/account/) page on the Virtualmin website.

> ##### How do I renew an expired license?

To re-activate a system with an expired license, simply buy a new license in our shop, and use the `change-license` command to apply it to your server. Your server will instantly be activated on the new license. The `change-license` command can be used for Virtualmin, like this:

```text
virtualmin change-license --serial NEWSERIAL --key NEWKEY
```

> ##### How do I cancel a recurring license?

Licenses can be canceled in your Virtualmin account. Click on **My Account**, and then **Software Licenses**, and then find the license you want to cancel. Click the related subscription number in the licenses table. From there you can **Cancel** or make other changes. If your license does not have a related subscription it will automatically end when the license term is complete.

> ##### How do I upgrade or downgrade a license?

As with cancellations, you can make changes to your licenses in the **My Account** page under **Software Licenses**. Find the license you want to modify, click the related subscription, and choose to upgrade or downgrade. Confirm the order to make the change. If your license does not have a related subscription, that means it was purchased before 2021 and is not known to the new commerce system. To make changes, you'll need to purchase a new license and switch to it using the `virtualmin change-license` command as described above.

> ##### Where are my expired licenses?

Expired licenses don't have any intrinsic value and are removed from the **Software Licenses** page one month after their expiration date.

> ##### Why do I see a license error message?

If you receive a warning about your Virtualmin license, it indicates the license, meant for only one server, is in use on multiple servers. This is temporarily acceptable during server migration, and the warning will automatically disappear within a few days after deactivating the old server. If you're using the license on multiple servers for other reasons, you'll need to buy an extra license.

> ##### How do I update payment information or find my invoices?

If your billing information has expired, we will not be able to renew your licenses automatically. To add a new default payment method, browse to **My Account ⇾ Payment methods**, and then click the **Add payment method** button.

### Packages and webapps upgrades

> ##### Virtualmin and all related packages are outdated, and no updates are available. Why?

This problem typically arises from outdated repositories. To resolve the issue, simply re-setup the Virtualmin repositories by executing the command below. This command is designed to function across all Grade A and some Grade B supported [operating systems](/docs/os-support/) and is compatible with both Virtualmin GPL and Pro versions:

```
sudo sh -c "$(curl -fsSL https://software.virtualmin.com/gpl/scripts/virtualmin-install.sh)" -- --setup
```

> ##### How to update Virtualmin and all related packages?

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

> ##### How can I make sure my web applications are up-to-date without having to wait for the next Virtualmin release?

In Virtualmin, go to **System Settings ⇾ Script Installers / Installer Updates**, and ensure **Download script updates** is set to **Yes** to automatically receive the latest install script updates.

### System upgrade

> ##### How do I upgrade my system from one major version to another?

Upgrading major versions of your Linux distribution, such as from Ubuntu 22.04 to 24.04, AlmaLinux 8 to 9, or Debian 11 to 12, is a significant process and is not something we can assist with. It's important to note that distro upgrades can sometimes lead to complications. Some users might experience issues that require manual intervention to resolve, while others may find the upgrade process smooth and without major problems. We strongly recommend that such questions be directed to the respective forums or support communities. They are better equipped to provide detailed, distribution-specific advice and guidelines for the upgrade process.

Remember, it's always a good idea to backup your data before attempting any major system upgrade.

### User interface

> ##### What are the key terminology differences between cPanel and Virtualmin

Virtualmin and cPanel have key differences in terminology --- in Virtualmin, what cPanel refers to as "domain" is called "virtual server", a "sub-domain" is called "sub-server" and "parked domain" is called "alias server".

> ##### What modules are included in the 'Un-used Modules' section in Webmin?

Un-used modules means "Modules that are installed but for which the detection logic in the module did not find the related packages installed". Any module that has service detection functions will end up in un-used modules if it does not detect the service or application it manages. The way to get a module out of unused modules is to install the related package. Many standard modules will be in unused modules on any given system, because no system should be doing everything a Webmin system can manage, that'd be a chaotic.
