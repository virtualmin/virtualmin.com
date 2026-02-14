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

{{< html span "" "" "mysql-vs-mariadb" >}}
{{< alert primary exclamation "" "On Debian and its derivatives, the Virtualmin installer treats MariaDB and MySQL as drop-in replacements, so if MySQL is already installed it will use it. To use Oracle MySQL instead of MariaDB, install `mysql-server`, `mysql-common`, and `libdbd-mysql-perl` with your package manager before running the installer. This is not available on EL-based systems, where only MariaDB is supported." >}}

{{< html span "" "" "postgresql" >}}
{{< alert primary exclamation "" "PostgreSQL and the Webmin PostgreSQL module are no longer installed by default. If you want PostgreSQL as part of the initial install, add `--include PostgreSQL` to your `virtualmin-install.sh` command, and also add `--extra webmin-postgresql,postgresql,postgresql-server` on EL systems or `--extra webmin-postgresql,postgresql,postgresql-client` on Debian and derivatives. You can also skip MariaDB setup with `--exclude MariaDB`. If Virtualmin is already installed, install the PostgreSQL packages and the Webmin PostgreSQL module for your OS, then run `virtualmin-config-system --include PostgreSQL` and lastly turn PostgreSQL feature on in the \"System Settings ⇾ Features and Plugins\" page." >}}

### Automated installation

In most cases, installing Virtualmin is as simple as installing a supported OS and then running the `virtualmin-install.sh` script. Supported systems are listed on the [OS Support](/docs/os-support/) page.

We recommend using a minimal server version instance of your preferable operating system. The Virtualmin `virtualmin-install.sh` script will install any additional packages that it requires.

### Running the install script

The OS-neutral `virtualmin-install.sh` script sets up the license key in `/etc/virtualmin-license`, configures your package manager for the Virtualmin repository, and then installs the `virtualmin-config` package, which completes the install for your OS and version.

If you're using Virtualmin Pro, download `virtualmin-install.sh` from [My Account → Dashboard](/account/) page. If you're using Virtualmin GPL, download it from the [Download](/download/) page.

Once the `virtualmin-install.sh` script is on your server, run it as root:

```text
sudo sh virtualmin-install.sh
```

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

### LAMP (Apache) vs. LEMP (Nginx)

The install script can set up either Apache or Nginx. Apache (LAMP) is the default and most common choice, but Nginx (LEMP) is also fully supported and can be installed using `--bundle LEMP` if you prefer Nginx.

### Full install vs. minimal install

The full LAMP or LEMP stack with mail, spam filtering, and virus scanning is heavy and needs at least about 4 GiB of RAM to run well (more is better). On low-memory systems, running the full mail stack alongside LAMP or LEMP is not recommended.

Use `--type mini` flag for a lighter setup that skips local mail handling, spam and virus filtering, local DNS, FTP, and Jailkit, but still provides a full web stack and works well with Cloud DNS. Minimal installs usually work well with around 1 GiB of RAM.

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
