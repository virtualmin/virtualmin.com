---
title: "Automated Installation"
date: 2023-11-21
draft: false
weight: 2010000
---

### Recommended system specifications
- Automated installation requires a freshly installed, [supported OS](/docs/os-support/)
- 1 GB RAM (less for the `--minimal` installation), more is better
- 1 GB free disk space, more for your domain data
- A domain name with DNS records pointing to your server's IP address

### Installation
There are two methods for installing Virtualmin. The first is a fully automated script described in this document, and the other is a manual installation documented in the [Manual Installation](/docs/installation/manual/) page. When possible, the automated installation described here is highly recommended, as it removes many possible errors during configuration and insures that all applications are built with appropriate options for virtual hosting within the Virtualmin system. If you haven't read the [Download](/download/) page yet, you should do so now, as it provides all of the steps needed for installation in _most_ cases on a single page. You should only proceed to more complex installation docs, if the steps provided on the download page won't work for you.

{{< html span "" "" "mysql-vs-mariadb" >}}
{{< alert primary exclamation "" "The Virtualmin installer treats MariaDB and MySQL as interchangeable, so if MySQL is already installed, it will recognize and use it. To ensure compatibility, install MySQL using your package manager with the `mysql-server` and `mysql-common` packages before running the installer, if you prefer the Oracle-managed MySQL over the community-driven MariaDB." >}}

### Automated installation using `virtualmin-install.sh` script
In most cases, installing Virtualmin is as simple as installing a supported operating system of your choice, followed by running the Virtualmin `virtualmin-install.sh` script.

A list of supported operating systems is provided at the [OS Support](/docs/os-support/) page.

We recommend using a minimal server version instance of your preferable operating system. The Virtualmin `virtualmin-install.sh` script will install any additional packages that it requires.

### Running the install script
Installation is performed automatically by the OS-neutral Virtualmin `virtualmin-install.sh` script. This script sets up the license key in `/etc/virtualmin-license` file and configures the appropriate package management and installation tool for use with the Virtualmin software repository. It will then install the `virtualmin-config` package, which performs the remainder of the installation, appropriate for your OS and version.

Download the file from the **Software Licenses** section of your [My Account](/account/) page, under the **Software Licenses tab, if you're using Virtualmin Pro. All of your purchased products will be available for download throughout the life of your license period. If you're using Virtualmin GPL, that can be downloaded from the [Download](/download/) page.

With the `virtualmin-install.sh` script on your server, run this command as root:

```text
sh virtualmin-install.sh
```

The `virtualmin-install.sh` has a number of options that can be used to perform a particular type of installation. The usage (`--help`) output describes the available options:

```
Usage:  virtualmin-install.sh [options]

  If called without arguments, installs Virtualmin.

  --help|-h                display this help and exit
  --bundle|-b <LAMP|LEMP>  choose bundle to install (defaults to LAMP)
  --minimal|-m             install a smaller subset of packages for low-memory/low-resource systems
  --unstable|-e            enable support for Grade B systems (not recommended, see documentation)
  --no-package-updates|-x  skip installing system package updates
  --setup|-s               setup Virtualmin software repositories and exit
  --hostname|-n            set fully qualified hostname
  --force|-f               assume "yes" as answer to all prompts
  --verbose|-v             increase verbosity
  --uninstall|-u           removes all Virtualmin packages (do not use on a production system)
```

### LAMP (Apache) vs. LEMP (Nginx)
The Virtualmin install script can setup Apache or Nginx. The default, and best-tested and most feature-complete, is Apache. But, if you prefer Nginx, you can install a bundle with the LEMP stack instead of the LAMP stack. Use the `--bundle LEMP` option for Nginx.

### Full install vs. minimal install
The full LAMP or LEMP stack, plus a full mail processing stack including SpamAssassin and ClamAV, is quite large, requiring about 2GB minimum system memory in order to function well (and more is better). If you're using a lower memory system, it's not recommended, and maybe not even possible, to run the full mail stack along with LAMP or LEMP.

We provide an installation option, `--minimal`, that leaves off much of the mail processing stack. The installed components can still send and receive mail from local processes, but spam and anti-virus scanning will need to be outsourced to a remote system (for example, a Cloudmin Services host), and several other ancillary packages will not be installed. The minimal installation type can most probably operate just fine with only 1GB of RAM (but more is still better).

If you want to locally host mail for end users (including IMAP/POP clients), the minimal installation target is not the right choice.

### Questions `virtualmin-install.sh` might ask you
Depending on your OS and the state of your system, the `virtualmin-install.sh` script may ask one or more questions.

#### Fully qualified domain name
If your system does not have a fully qualified domain name (FQDN), the installer will stop and ask you to choose one.  This is mandatory because many services rely on having a fully qualified domain name in order to function. Mail, in particular, but some Apache configurations and many of the Virtualmin-created configuration files, also require a valid fully qualified domain name to function correctly.  A fully qualified domain name is one of the form _host.example.com_, or simply _example.com_ (but do not use a name you'll be hosting in Virtualmin).  We recommend you choose a name that is not one for which you will be receiving mail, in order to simplify later configuration.  A good choice is to use a name server designator, such as _ns1.example.com_.  Some customers also choose something like _host.example.com_ or _primary.example.com_.  Any of these would be valid and would satisfy the install script and the services that rely on this option.  The install script will add this name to `/etc/hosts` file, which will satisfy all local services.  It is even better if this name resolves correctly when looked up from outside of the system -- this requires the name be added to your DNS zone for the second level domain.  If the Virtualmin server you are installing will be the authoritative name server for this zone, you can later use Webmin to add a record for this name to the zone.

### Completing the installation
Once the necessary questions have been answered, installation will proceed automatically.  After 3-10 minutes, depending on the speed of your network connection and hardware, your system will be configured for Virtualmin and ready to login to.  You can then login to Virtualmin.  Virtualmin runs on port 10000 and is encrypted using SSL.  Thus, you can connect to your system with an address of the form:

```text
https://host.example.com:10000 or https://192.168.1.1:10000
```

And then log in as the `root` user, or any user with _sudo_-capable user.

It will then walk you through a post-installation setup wizard, asking you a series of setup questions.

The final step in the installation is to perform the configuration check, by clicking the **Check Configuration** button at the top of the **List Virtual Servers** page.

### Setting a _root_ password
If your system does not have a password set for the `root` user, you may need to set a `root` password using the `passwd` command before you can login on port 10000. This can be the case when installing on an EC2 instance that uses an SSH key to login as _root_, or an Ubuntu system that uses _sudo_-capable user.
