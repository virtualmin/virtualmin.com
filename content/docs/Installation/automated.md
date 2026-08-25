---
title: "Automated Installation"
date: 2026-01-21
author: "Ilia Ross"
draft: false
weight: 2010000
---

### Recommended system specifications
- A freshly installed [supported OS](/docs/os-support/)
- At least 1 GiB RAM (full install with mail, spam filtering, and virus scanning needs 4 GiB or more)
- At least 1 GiB free disk space (plus more for your domains and mail)
- A domain name with DNS records pointing to your server's IP address

### Installation
There are two ways to install Virtualmin: using the automated install script described here or following the [manual installation](/docs/installation/manual/) guide. Whenever possible, use the automated method because it reduces mistakes and configures everything correctly for virtual hosting in no time.

If you haven't already, read the [Download](/download/) page first, as it covers the steps needed for most installations on one page. Only move on to the more detailed docs if those steps don't work for your situation.

### Automated installation

In most cases, installing Virtualmin is as simple as installing a supported OS and then running the `virtualmin-install.sh` script. Supported systems are listed on the [OS Support](/docs/os-support/) page.

We recommend using a minimal server version instance of your preferable operating system. The Virtualmin `virtualmin-install.sh` script will install any additional packages that it requires.

### Running the install script

The OS-neutral `virtualmin-install.sh` script sets up the license key in `/etc/virtualmin-license`, configures your package manager for the Virtualmin repository, and then installs the `virtualmin-config` package, which completes the install for your OS and version.

Download the `virtualmin-install.sh` script directly from [download.virtualmin.com/install-script](https://download.virtualmin.com/install-script). The same script works for Virtualmin Pro too—either download a personalized copy from the [My Account → Dashboard](/account/) page, or pass your license through the [`SERIAL` and `KEY` environment variables](#license-via-environment-variables), which the **Pro** switch below builds for you.

Once the script is on your server, run it as root, using the toggles to add the flags matching your setup:

{{< install-command local >}}

The installer supports several options for different install types. Run it with `--help` to see the available choices.

```text
Usage: virtualmin-install.sh [options]

  If called without arguments, installs Virtualmin with default options.

  --bundle|-b <LAMP|LEMP>          bundle to install (default: LAMP)
  --type|-t <full|mini>            install type (default: full)
  --os-grade|-g <A|B>              operating system support grade (default: A)
  --branch|-B <stable|rc|devel>    install branch (default: stable)

  --extra|-E <name[,name..]>       install extra packages before stack install
  --exclude|-e <name[,name..]>     exclude plugin from configuration phase
  --include|-i <name[,name..]>     include plugin in configuration phase
  --module|-o                      load custom module in post-install phase

  --hostname|-n                    force hostname during install
  --no-package-updates|-x          skip package updates during install
  --no-hostname-ssl|-nhs           skip SSL certificate request for hostname

  --uninstall|-u                   remove all packages and dependencies
  --setup|-s                       reconfigure repos without installing
  --connect|-C <ipv4|ipv6>         test connectivity without installing
  --insecure-downloads|-I          skip SSL certificate check for downloads

  --force|-f|--yes|-y              assume "yes" to all prompts
  --force-reinstall|-fr            force complete reinstall (not recommended)
  --no-banner|-nb                  suppress installation messages and warnings
  --verbose|-V                     enable verbose mode

  --version|-v                     show installer version
  --help|-h                        show this help
```

#### Install script flags

The installation command above, as well as the ones on the [Download](/download/#download-and-run-install-script) and [My Account → Dashboard](/account/) pages, lets you select the most common options with a click and adds the matching flags to the command for you.

##### LAMP (Apache) vs. LEMP (Nginx)

The install script can set up either Apache or Nginx. Apache (LAMP) is the default and most common choice, but Nginx (LEMP) is also fully supported and can be installed using `--bundle LEMP` if you prefer Nginx.

The bundle cannot be switched after installation without significant manual work, so choose deliberately.

##### Full install vs. minimal install

The full LAMP or LEMP stack with mail, spam filtering, and virus scanning is heavy and needs at least about 4 GiB of RAM to run well (more is better). On low-memory systems, running the full mail stack alongside LAMP or LEMP is not recommended.

Use `--type mini` flag for a lighter setup that skips local mail handling, spam and virus filtering, local DNS, FTP, and Jailkit, but still provides a full web stack and works well with Cloud DNS. Minimal installs usually work well with around 1 GiB of RAM. Features skipped by the minimal install can be enabled later on the **System Settings ⇾ Features and Plugins** page once the needed packages are installed.

##### Operating system support grade

By default, the installer only runs on [Grade A supported systems](/docs/os-support/), which are fully tested and receive managed updates. Passing `--os-grade B` allows installation on Grade B systems, which get little or no direct testing and are only recommended for experienced admins. See the [OS Support](/docs/os-support/) page for the full list of systems in each grade.

##### Install branch

The `--branch` flag selects which repository branch to install from. The default stable branch is what production systems should use. The pre-release branch carries upcoming tested versions, and the unstable branch carries the latest development builds. Only use pre-release or unstable on disposable test systems, never in production.

##### Hostname and SSL

During installation, a TLS certificate is automatically requested for the system's hostname, so you can log in to Virtualmin without SSL warnings. Use `--no-hostname-ssl` to skip that certificate request, for example when the hostname doesn't resolve publicly yet. Use `--hostname` to force a specific fully qualified domain name during install instead of being asked interactively.

##### Including and excluding features

The `--include`, `--exclude`, and `--extra` flags fine-tune the configuration phase. `--include` enables extra configuration plugins, `--exclude` skips ones that would run by default, and `--extra` installs additional packages before the stack install. For example, to add PostgreSQL support as part of the initial install, see the [PostgreSQL](#postgresql) caveat below.

##### Maintenance and recovery

`--uninstall` removes all Virtualmin packages and dependencies. `--setup` reconfigures the software repositories without installing anything, which is useful for repairing a broken repository setup. `--connect` only tests connectivity to the repositories over IPv4 or IPv6 and then exits. `--force-reinstall` forces a complete reinstall over an existing system and is not recommended.

##### Behavior and output

`--force` assumes "yes" to all prompts, which is handy for unattended installs. `--no-package-updates` skips OS package updates during install. `--insecure-downloads` skips SSL certificate checks for downloads and should be avoided unless you know exactly why you need it. `--no-banner` suppresses informational messages, `--verbose` enables detailed output for troubleshooting, and `--version` and `--help` print the installer version and the full usage text.

##### License via environment variables

For Virtualmin Pro, the serial number and license key can be passed to the installer through the `SERIAL` and `KEY` environment variables:

```text
sudo env SERIAL=00000 KEY=AAAAAAAAAA sh virtualmin-install.sh
```

The personalized install script from the [My Account → Dashboard](/account/) page already handles this for you, so you normally don't need to set these by hand. Without them, the installer sets up Virtualmin GPL.

##### Examples

Install a minimal Nginx stack for a low-memory web server:

```text
sudo sh virtualmin-install.sh --bundle LEMP --type mini
```

Install on a Grade B system without requesting a hostname certificate:

```text
sudo sh virtualmin-install.sh --os-grade B --no-hostname-ssl
```

Unattended install with a preset hostname:

```text
sudo sh virtualmin-install.sh --hostname host.example.com --yes
```

#### Database caveats

##### MySQL vs. MariaDB

On Debian and its derivatives, the Virtualmin installer treats MariaDB and MySQL as drop-in replacements, so if MySQL is already installed it will use it. The easiest way to choose MySQL is the **MySQL** toggle under the install command on the [Download](/download/#download-and-run-install-script) page, which adds `--extra mysql-server,mysql-common,libdbd-mysql-perl` so the packages are installed before the stack. Doing it by hand, install those packages with your package manager before running the installer.

Choosing MySQL at install time is not available on EL systems, where only MariaDB is supported. On an EL system, MySQL can only be set up after the installation is done by adding the official [MySQL repository](https://dev.mysql.com/downloads/repo/yum/), removing the MariaDB packages together with the `/var/lib/mysql` data directory, installing the MySQL server packages, and re-running the database configuration with `virtualmin-config-system --include MySQL`. Removing the data directory deletes all existing databases, so do this on a freshly installed system or back them up first.

##### PostgreSQL

PostgreSQL is not installed by default. The easiest way to include it in the initial install is the **PostgreSQL** toggle under the install command on the [Download](/download/#download-and-run-install-script) page, which adds the right flags for your OS family. Doing it by hand, add `--include PostgreSQL` to your `virtualmin-install.sh` command, plus `--extra postgresql,postgresql-server` on EL systems or `--extra postgresql,postgresql-client` on Debian and derivatives. You can also skip MariaDB setup with `--exclude MariaDB`.

If Virtualmin is already installed, install the PostgreSQL packages for your OS, then run `virtualmin-config-system --include PostgreSQL` and lastly turn the PostgreSQL feature on in the "System Settings ⇾ Features and Plugins" page.

### Questions install script might ask you

Depending on your OS and the state of your system, the installer may ask a few questions.

#### Fully qualified domain name

If your system doesn't have a fully qualified domain name (FQDN), full installs that include mail will stop and ask you to set one. For minimal installs, it isn't required.

Use a name like `host.example.com`, not a name you'll host in Virtualmin itself. For example, if you'll host the `virtualmin.com` domain, you can call the system `host.virtualmin.com`, but not `virtualmin.com`.

### Completing the installation

Once you've answered any questions, installation continues automatically. After a few minutes, your system will be ready to use with Virtualmin.

If the TLS certificate request succeeded and your hostname resolves correctly, log in at:

```text
https://your-hostname:10000
```

This will usually avoid SSL warnings, since the certificate is issued for your hostname.

If DNS isn't set up yet or the certificate request failed, you can still log in using your server's IP address:

```text
https://your-ip:10000
```

In that case, you'll see an SSL warning. You can safely continue and fix the certificate after setup.

Log in as `root` or any *sudo*-capable user. You'll be guided through a short post-installation wizard. After that, click **Check Configuration** at the top of the **List Virtual Servers** page to let Virtualmin verify that everything is ready.

### Getting logged in

In most cases, you can just log in to Virtualmin with your *sudo*-capable user instead of `root`.

If you specifically want to log in as `root` and it doesn't have a password (common on cloud images that use SSH keys), set one with:

```text
sudo passwd root
```
