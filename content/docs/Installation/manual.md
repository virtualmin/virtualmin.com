---
title: "Manual Installation"
date: 2023-11-22
weight: 2015000
---

Unlike the [Automated Virtualmin installation](/docs/installation/automated/), to make use of this installation type, your OS does not need to be freshly installed, nor does it need to be a [supported operating system](/docs/os-support/). This method, however, requires significantly more knowledge on the part of the person doing the installation, and a much larger time investment to insure that all necessary configuration is performed and all Virtualmin managed services are working correctly. If you are not extremely comfortable with your operating system, the services used in a hosting system, and performing various configuration tasks from the command line, you are advised to use the automatic installation on a Grade A supported operating system.

### Partitioning
The partitions on your Virtualmin server should be allocated in one of the the following two ways, depending on your requirements and preference. Either partition scheme is supported by the Virtualmin Professional Installer. Other partition layouts may lead to incorrect configuration of filesystem quotas, but can be corrected after installation is completed if other partitioning schemes are preferred.

#### One partition
In this partition layout, you will only have one system partition plus a swap partition and `/boot` partition. The system partition contains `/home` for users, `/var` for logs and databases, as well as all of the normal system executable files, documentation and libraries. It is often simpler to deploy. Traditionally, "one big partition" was considered problematic from an administration standpoint, but most such issues have been resolved by modern filesystems, backup utilities, and improved hardware reliability.
  
  - **swap**: The `swap` partition should be at least twice the size of RAM on the system.
  - **/boot**: The `/boot` partition should be large enough to accommodate a few system kernels and initrd images. Your OS vendor probably knows best what size this should be.
  - **/**: The remainder of the disk(s) should be devoted to `/`. This is where all system and user data will go.
    
    If you plan to use disk quotas, you should be aware of a few potential gotchas with this type of deployment. Quotas apply to all files on a given partition, regardless of the directory. In the case of mail delivery and processing, there are several very sneaky ways for this to cause failures of various types. Because of this, if you are using disk quotas, you probably want to make `/home` its own very large partition.

#### Multiple partitions
This layout spreads files across a few partitions, in order to facilitate usage some types of backup utility as well as making some types of administrative task easier (for example, installing larger disks for some partitions at a later time). Historically, multiple partitions were considered wise administrative policy, but most modern systems and backup utilities eliminate the reasons for utilizing multiple partitions.

 - **/**: This partition is used for all of the operating system files, executables, and configuration files. This partition should be at least 4GB for most operating systems.
 - **/boot**: The `/boot` partition should be large enough to accommodate a few system kernels and initrd images. Your OS vendor probably knows best what size this should be.
 - **swap**: The `swap` partition should be at least twice the size of RAM on the system.
 - **/var**: The `/var` partition is where system logs, various changing data, and MySQL and PostgreSQL databases are stored. Depending on whether you will allow your domain users to use the database features, this partition may be between 2 and 10 or more GB. If users are expected to be heavy database users, you may opt to divide the remaining disk space between `/var` and `/home`.
 - **/home**: The `/home` partition is where all of your domain users data, email, CGI scripts, logs etc. will be stored. Pretty much anything that belongs to your users, except for MySQL and PostgreSQL databases, will reside on `/home`. Devote the remainder of your disk to `/home`, as usage will likely grow rapidly if you have many users.

### Dependencies
Install the following applications, using whatever method is appropriate for your operating system:

*   Apache or Nginx
*   BIND
*   Postfix
*   Procmail
*   SpamAssassin
*   ClamAV
*   Dovecot
*   ProFTPd
*   MySQL or MariaDB (optional)
*   PostgreSQL (optional)
*   Mailman (optional)

Standard versions of these applications are usually sufficient, as long as they are reasonably modern and have all security patches applied. Additionally, if your system supports disk quotas, and you will be using them with Virtualmin, you need the management tools for disk quotas. Webmin also provides support for firewall management on most UNIX and Linux platforms, assuming the appropriate command line tools are available.

### Webmin and Usermin
Download and install Webmin and Usermin, from [Webmin](https://www.webmin.com/download) website. There are multiple package types of available, so choose the most appropriate one for your OS. Installation instructions can be found on the Webmin site.

### Virtualmin modules
Once Webmin is operational you can download and install the Virtualmin modules in either `rpm` format (for RPM-based Linux distributions), `deb` format (for Debian-based Linux distributions), or `wbm` format (for any other UNIX or Linux system), and install them using the Webmin Modules module found in **Webmin ⇾ Webmin Configuration** page.

### Virtualmin Professional
The modules can be found in the following locations:

  - https://software.virtualmin.com/vm/7/wbm - Webmin format modules
  - https://software.virtualmin.com/vm/7/pro/rpm - RPM format modules
  - https://software.virtualmin.com/vm/7/pro/apt - Debian and Ubuntu module packages
  
You will need to make a note of your serial number and license key, found on your [My Account](/account/) page at Virtualmin.com, so that you can login using the serial number as the username and the license key as the password.

### Virtualmin GPL
The modules can be found in the following locations:

 - https://software.virtualmin.com/vm/7/gpl/wbm - Webmin format modules
 - https://software.virtualmin.com/vm/7/gpl/rpm - RPM format modules
 - https://software.virtualmin.com/vm/7/gpl/apt - Debian and Ubuntu module packages

### Service configuration

#### Apache or Nginx
Apache or Nginx web server should be installed.

#### BIND
BIND should be installed in you plan to host DNS locally.

#### Postfix
Postfix should be installed, and configured for virtual hosting. The best way to do this for the vast majority of deployments is to use a simple map file. Edit `main.cf` and add the following line: `virtual_alias_maps = hash:/etc/postfix/virtual`. Also, make sure that `home_mailbox` is set to `Maildir/`. Save it, and restart Postfix.

#### Procmail
Procmail is necessary if you plan to make use of the spam and anti-virus filtering capabilities in Virtualmin. A reasonable starting `procmailrc` might be:

```text
LOGFILE=/var/log/procmail.log
TRAP=/etc/webmin/virtual-server/procmail-logger.pl
:0wi
VIRTUALMIN=|/etc/webmin/virtual-server/lookup-domain.pl $LOGNAME
EXITCODE=$?
:0
* ?/bin/test "$EXITCODE" = "73"
/dev/null
EXITCODE=0
:0
* ?/bin/test "$VIRTUALMIN" != ""
{
INCLUDERC=/etc/webmin/virtual-server/procmail/$VIRTUALMIN
}
ORGMAIL=$HOME/Maildir/
DEFAULT=$HOME/Maildir/
DROPPRIVS=yes
:0
$DEFAULT
```

#### Procmail-Wrapper

The `procmail-wrapper` program is necessary for for mail to work properly, and in particular, spam and virus processing. First, put the following code into a file named `procmail-wrapper.c`:

```text
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main(int argc, char **argv)
{
int i;
for(i=0; argv[i] != NULL; i++) {
	}
if (i != 6) {
	fprintf(stderr, "Wrong number of args (%d)\n", i);
	return 1;
	}
if (strcmp(argv[1], "-o") != 0) {
	fprintf(stderr, "argv[1] must be -o\n");
	return 1;
	}
if (strcmp(argv[2], "-a") != 0) {
	fprintf(stderr, "argv[2] must be -a\n");
	return 1;
	}
if (strcmp(argv[4], "-d") != 0) {
	fprintf(stderr, "argv[4] must be -d\n");
	return 1;
	}
setuid(geteuid());
setgid(getegid());

execv("/usr/bin/procmail", argv);
return 0;
}
```

Then, run the following commands to compile the code, install it into `/usr/bin`, and give it the proper permissions:

```text
gcc -o /usr/bin/procmail-wrapper procmail-wrapper.c
chmod 6755 /usr/bin/procmail-wrapper
```

Lastly, edit `/etc/postfix/main.cf`, and set `mailbox_command` to the following:

```text
mailbox_command = /usr/bin/procmail-wrapper -o -a $DOMAIN -d $LOGNAME
```

#### SpamAssassin

SpamAssassin should be installed if you will be using the spam filtering features of Virtualmin.

#### ClamAV

ClamAV should be installed if you will be using the anti-virus features of Virtualmin.

#### Dovecot

Dovecot should be installed and configured for use with Maildir mail spools. PAM or shadow authentication should be used.

#### ProFTPd

ProFTPd should be installed. PAM or shadow authentication should be used.

#### MySQL

If you plan to use MySQL, or any of the **Install Scripts** in Virtualmin Professional that rely on MySQL, it should be installed, and accessible to `localhost`. The _root_ account should have a password set. Once Webmin is installed, you will need to configure the MySQL module to know the _root_ MySQL password.

{{< alert warning exclamation-triangle "" "Virtualmin does not require MySQL, and no Virtualmin-related user data is stored in MySQL. If you've read setup guides on the web for virtual mail hosting that require MySQL, we strongly recommend you ignore them. This is a very common source of confusion for new users, and there's simply no reason to introduce the complexity of this kind of deployment." >}}

#### PostgreSQL

If you plan to use PostgreSQL or any of the Install Scripts in Virtualmin Professional that rely on PostgreSQL, it should be installed, and accessible to `localhost`.

#### SASL

If users will be sending email through your server, you will need to configure `saslauthd` service. This requires interaction with your MTA (probably Postfix), and it should be configured to use PAM or shadow authentication. When enabled, Virtualmin can allow your users to create and manage Mailman mailing lists.