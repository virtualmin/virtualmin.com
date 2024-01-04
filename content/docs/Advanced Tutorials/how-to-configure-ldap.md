---
title: "How to Configure LDAP"
author: "Joe Cooper"
weight: 2900000
---

This documentation explains how Virtualmin can be setup to store users and mail aliases in an LDAP database, rather than using files in `/etc` as it does by default. It is particularly useful when you want to spread the load of virtual hosting across multiple systems, and need to them to all stay in sync.

{{< alert warning exclamation "" "The information presented on this documentation page may no longer reflect the most current developments or practices. For accuracy and the benefit of all users, this content should be reviewed and updated. Contributions are welcome; if you have the updated information, please consider submitting it through a pull request (PR) to our GitHub repository to help us keep our documentation current." >}}

## Introduction to LDAP

 LDAP (Lightweight Directory Access Protocol) is a way for clients to query and update a flexibly structured hierarchial database. In the Unix world, it is most commonly used to distribute user and group information from a central server to many client systems, so that users can login to any client. Typically it is combined with NFS, which makes user home directories available on all clients too.

Each object in the database has a DN (distinguished name), which is formatted like:

```
cn=joe,dc=example,dc=com
```

 As you can see, the DN is split into components, each of which is one element of the hierarchy. Most DNs are based on an internet domain name, although it is possible to use an organization's structure instead.

Each object in an LDAP database has one or more object classes. These determine what type of user it is, such as `posixAccount` for a Unix user, or `posixGroup` for a group. Users who have additional shadow password information will have the class `shadowAccount` too.

Each object has a list of attributes, each of which has a name and value. Typical attributes for Unix users are `uid` for the username, `homeDirectory`, `loginShell` and `userPassword`. The attributes allowed for each object differ depending on the object's classes.


## LDAP Access Control

 When a client connects to an LDAP server, it can either authenticate itself with a DN and password, or connect anonymously. The server's configuration determines which are allowed, and which objects and attributes a client is allowed to read or write based on this DN.

The popular OpenLDAP server has a special *root* DN which has read/write access to everything in the database. This DN does not even have to exist in the database, as it is defined in the server's configuration file.



## Installing an LDAP Server

 An LDAP server is responsible for managing the data files that make up an LDAP database, and providing access to that data to clients via the network. The most popular free LDAP server is OpenLDAP ([http://www.openldap.org/](http://www.openldap.org/ "http://www.openldap.org/")), which is available for pretty much all Unix-like operating systems.

If you are running EL system, such as Alma, Rocky, Fedora, Oracle or Red Hat, OpenLDAP can be installed with the command :

```
dnf install openldap openldap-servers openldap-devel openldap-clients perl-LDAP
```

To start and enable the server, run the following command :


```
systemctl enable --now slapd
```

On an Ubuntu or Debian system, the command to use is :

```
apt-get install slapd libnet-ldap-perl
```

On other operating systems, you will probably have to download, compile and install OpenLDAP manually. You should also install the `Net::LDAP` Perl module, which Webmin and Virtualmin need to talk to the server.



## Setting up Webmin's LDAP Server Module

 This module allows you to configure an OpenLDAP server, manage objects in its database, and setup access control for objects. It can be found in Webmin under the **Servers** category. By default, it should be configured automatically to find the OpenLDAP package provided by the your Linux distribution vendor.

Before the LDAP server can be used to store users and groups, a few configuration steps must be performed. These can be skipped if you have already manually setup the server.

1. Click on the **OpenLDAP Server Configuration** icon.
2. In the **Root DN for LDAP database** field, enter a base DN for your LDAP database. This is typically based on your domain name, so for a domain like `foo.com` you would enter *dc=foo,dc=com* .
3. In the **Administration login DN** field, enter a DN like *cn=Manager,dc=foo,dc=com* .
4. In the **New administration password** field, select **Set to** and enter a new password of your choice.
5. Click **Save**.
6. Open the **Manage Schema** page, and make sure the `nis` schema is checked.
7. If not, check it and click **Save**.
8. Back on the main page, click **Apply Configuration** or **Start Server**.
9. If Webmin prompts you to create the root DN you just specified, click the button to do so.

 Verify that the server is running and serving your base DN by clicking on the **Browse Database** icon. You should see the attributes of your new base object, which will have a class like `domain`.

Since we want the LDAP server to remain running from now on, on the module's main page select **Yes** next to the **Start at boot** button, and click it. This will enable the `/etc/init.d` script provided by your Linux distribution.



## Creating LDAP Trees

 Now you have a root DN, you will want to create another DN under it to contain your LDAP users. This can be considered like a sub-directory, and even though you *could* create all objects under one DN, it isn't particularly neat and will slow down database searches.

To create a new DN for users, do the following :

1. Click on the **Create Tree** icon.
2. Select **Distinguished name**, and in the adjacent text field enter something like *dc=Users,dc=foo,dc=com* .
3. Change **Create example object under new DN?** to **Unix user**.
4. Click **Create**.

 If all goes well, the Users DN will be created, and an example Unix user object created under it. You can see them by navigating around on the **Browse Database** page.

You should then repeat the same steps to create a sub-tree for LDAP groups :

1. Click on the **Create Tree** icon.
2. Select **Distinguished name**, and in the adjacent text field enter something like *dc=Groups,dc=foo,dc=com* .
3. Leave **Create example object under new DN?** set to **No**.
4. Click **Create**.



## Storing Users in LDAP

 Most Unix-like operating systems (including Linux) can query an LDAP database for user and group information, which is then used by all programs and servers on the system. This means that LDAP users can login via SSH and FTP, own files, run processes and do everything that a user in `/etc/passwd` can do.



### Introduction to NSS

 On Linux, NSS (Name Service Switch) is the library that determines where user and group information comes from. On a typical system only the `/etc/passwd` and `/etc/group` files were used, but because NSS is extensible it is possible to add support for any type of data source. Another that is often used is NIS, which has a similar client-server architecture to LDAP, but is losing popularity in favour of LDAP.

Before your system can fetch users from an LDAP database, the NSS module for it must be installed. On a Alma, Rocky, Fedora, Oracle or Red Hat system the command to do this is :

```
dnf install nss_ldap  nss-pam-ldapd openldap-clients
```

While on Debian or Ubuntu Linux, the command to use is :

```
apt-get install libnss-ldap
```

 When run from the command line, this may ask several questions about the hostname of the LDAP server, the root DN and administration login. You should be able to answer them all based on the LDAP server setup done above.



### Introduction to PAM

 PAM is a set of libraries and configuration files similar to NSS, but it deals only with passwords. It was designed to make the implementation of alternate authentication types (like RSA tokens or networked user databases) easier. Because you want users in the LDAP database to be able to login, you will need to install the a PAM module for it.

On Debian or Ubuntu Linux, the command to install is :

```
apt-get install libpam-ldap
```

 When run from the command line, this may ask several questions about the LDAP root DN and administration login. The answers should be the same as what you gave to the `libnss-ldap` package.

For reasons unknown to me, Debian and Ubuntu systems have two separate configuration files for LDAP integration, one for NSS and one for PAM - even though they really should contain the same information. To reduce your system to using just one, run the commands :

```
mv /etc/pam_ldap.conf /etc/pam_ldap.conf.old
ln -s /etc/libnss-ldap.conf /etc/pam_ldap.conf
```

On Alma, Rocky, Fedora, Oracle or Red Hat systems the needed PAM libraries are part of the `nss_ldap` or `nss-pam-ldapd` package that you should have already installed in the previous step.

### Setting Up an LDAP Client System

 By now, you should have an LDAP database running with an example user in it. Your system has to be configured to actually use this database, which is best done using Webmin's LDAP Client module (found under the **System** category).

First, your system has to be told which LDAP server to use. To do this :

1. Click on the **LDAP Server Configuration** icon.
2. In the first row of the **LDAP servers** table, enter your system's hostname or `localhost` in the **Hostname** field.
3. In the **Login for root user** field, enter the full administrator's DN, like *cn=Manager,dc=foo,dc=com* .
4. In the **Password for root user** field, enter the password you selected when setting up the LDAP server.
5. Click **Save**.

 Next, your system needs to know where in the LDAP database to find users :

1. Click on **LDAP Search Bases**.
2. In the **Global search base** field, enter your server's base DN, like *dc=foo,dc=com* .
3. In **Base for Unix users** enter the DN for your users' sub-tree, like *dc=Users,dc=foo,dc=com* .
4. Enter the same DN in **Base for Unix passwords**.
5. Similarly, in **Base for Unix groups** enter *dc=Groups,dc=foo,dc=com* .
6. Click **Save**.

 At this point, you should be able to click on the **LDAP Browser** icon in this module and see the user and group sub-trees in your database. If it displays an error, check the settings made in the steps above.

Finally, the system has to be told to use LDAP to find user and group details. To enable this :

1. Click on **Services Using LDAP**.
2. Click the **Unix users** entry in the table. On the page that appears, next to **Second data source** select *LDAP*, then hit **Save**.
3. Do the same for **Unix groups** and **Unix shadow passwords**.
4. If buttons appear on the module's main page to start the local LDAP daemon and enable it at boot time, do that now..

 To verify that everything is really working, click the **Validate Configuration** button on the main page of the **LDAP Client** module. It should find and display the `example` Unix user that was created when you setup your LDAP server. If not, use the error message to work out what might have gone wrong.

If you get an error like *user does not exist* even when you are sure everything is correct, try restarting Webmin with the `/etc/webmin/restart` command run as root at the command line. On some systems, user and group data sources are cached by running server processes until they are restarted.

These same steps can be repeated on any other system on your network that should share users and groups. Naturally, they will also need to NSS and PAM LDAP modules installed too. These other systems should share the base directory for users' homes (typically `/home`) via NFS, so that users can login to any LDAP client and access their files.

On some systems (notably Debian and Ubuntu), the www-data user Apache runs as cannot be a member of any domains' groups, which prevents websites from working in a default Virtualmin setup. To fix this, edit the /etc/ldap.conf file, find the nss_initgroups_ignoreusers line and remove www-data from it.

NFS can be setup by using the **NFS Exports** module to share `/home` to the other client systems, and the **Disk and Network Filesystems** module on clients to add an NFS filesystem that mounts it. Typically one system will be both the LDAP and NFS server, but that doesn't strictly have to be case, as long as they can all write to `/home`.



### Setting up PAM

 PAM has it's own configuration files that determine when LDAP is used to check and change passwords. Unless they are setup, users created in LDAP will exist but will not be able to login. A command like `id -a example` will display a user from LDAP, but you will not be able to change his password with a command like `passwd example`.

This can be setup in Webmin's **PAM Authentication** module, found under the **System Category**. The exact steps to take differ slightly between Redhat-based and Debian-based distributions though. Once they are done, you should be able to use the `passwd` command to set a password for the `example` user.



#### PAM Setup On Debian and Ubuntu

 Debian-based systems have a separate PAM include file for each step. LDAP support needs to be added to each as follows :

1. Click on **common-account** in the list of services.
2. Select `pam_ldap.so` from the **Add step for** menu, then click the button.
3. Change the **Failure level** to **Sufficient**, then click **Create**.
4. Use the up arrow to move the new `pam_ldap.so` step above the existing `pam_unix.so` entry.

 These same steps should then be repeated for the **common-auth**, **common-password** and **common-session** services.



#### PAM Setup on Alma, Rocky, Fedora, Oracle or Red Hat

 Redhat-based systems have a single common PAM service that is called by all others. LDAP support can be added to it as follows :

1. Click on **system-auth** in the list of services.
2. In the **Authentication steps** section, select `pam_ldap.so` from the **Add step for** menu, then click the button.
3. Change the **Failure level** to **Sufficient**, then click **Create**.
4. Use the up arrow to move the new `pam_ldap.so` step above the existing `pam_unix.so` entry.
5. Repeat 1,2 and 3 in the **Account verification**, **Session setup** and **Password change** steps on the same page.

### Setting Up Webmin's LDAP Users and Groups Module

 Even though you could theoretically add a user to an LDAP database using the LDAP Server module's browser, it is much easier to use a Webmin module that takes care of selecting all the correct attributes for you. The **LDAP Users and Groups** module under the **System** category is similar to the more commonly used **Users and Groups** module, but operates directly on a local or remote LDAP database.

Assuming that your system has been setup as an LDAP client, when you open the module it should display a list of existing users and groups, including the `example` user. If it displays an error about connecting to the database or searching for users, you may need to adjust settings on the **Module Config** page.

To ensure that user creation is working, try clicking on **Add a new LDAP user**, filling in the **Username**, **Real name** and **Password**, and clicking **Create**. If the user is added to the list with no errors, and if you can SSH into the system as the user, congratulations!

If you get an error like `no strucutural object class provided` when adding a user, the cause is almost certainly that your LDAP schema requires that users have the `person` object class. Webmin versions 1.404 and later add this automatically, but to have it added in older versions you should do the following :

1. Click on the **Module Config** link, and enter *person* in the  **Other objectClasses to add to new users** field.
2. Go to the **LDAP attributes** section, and in the **LDAP properties for all new users** box enter

```
sn: ${REAL}
```

3. Click **Save**.
4. Re-try creating a user.



### Creating LDAP Users with Virtualmin

 Once the **LDAP Users and Groups** module is working, you can configure Virtualmin to add new domain users and mailboxes to LDAP instead of files in `/etc`. This can be done as follows :

1. Open the **System Settings** category on Virtualmin's left menu, and click on **Virtualmin Config**.
2. Change **Store users and groups** to **LDAP database**, and click **Save**.
3. If prompted, click the button to re-check the Virtualmin configuration.
4. Go to Webmin's **Bootup and Shutdown** module under the **System** category, and look for an `nscd` action. If you see it, check the box next to it and then click **Disable Now and On Boot**. The Name Service Caching Daemon causes problems for Virtualmin, as it adds delay between when a user is added to the database and when it becomes visible to other programs.

 Any domains or mailboxes created from now on will be added to LDAP. To avoid confusion, I suggest only making this change on a system that isn't hosting any domains yet, so that they are all added to the same database.

The most common error is something like `failed to create administration user` or `administration user was created but does not exist`. This means that Virtualmin added an LDAP entry successfully, but when it used the `getpwnam` system call to check if the user is really known to Unix, he was not found. The most common cause is an incorrect LDAP client configuration, which should be revealed by the **Validation Configuration** button in the **LDAP Client** module. Another common cause is the `nscd` daemon, which adds a delay before users are visible and should be disabled.



## Storing Email Aliases in LDAP

 Just as users and groups can be stored in LDAP, so can email aliases used by mail servers like Postfix. These can then be read by multiple mail servers sharing the same configuration, to distribute the mail delivery load.

These instructions assume that you already have a working LDAP server as explained above, but don't require that the system be setup to use LDAP for users or groups. Also, only Postfix is covered (even though Sendmail has similar capabilities), as only the Postfix Webmin module supports LDAP at the time of writing.



### Postfix's LDAP Suppport

 Postfix stores aliases, virtual address mappings and other configuration tables in **maps**, which are typically DBM format files built from text files. However, with the right plugin modules it can use a MySQL or LDAP database instead, which can be queried over the network.

On Debian or Ubuntu systems, the command to install LDAP support for Postfix is :

```
apt-get install postfix-ldap
```

 On other systems, Postfix may come with LDAP support already enabled. If not, you may need to download and compile it manually. To check if your Postfix supports LDAP, run the command :

```
postconf -m
```

 and look for ldap in the output.



### Setting up the LDAP Schema

 I've found that there doesn't seem to be any consistent agreement on which LDAP object class and attributes to use for Postfix objects. However, the `misc` schema that comes with OpenLDAP defines a `inetLocalMailRecipient` class that is almost good enough.

To configure the schema fully, do the following :

1. Go to the **LDAP Server** module, and click on **Manage Schema**.
2. Check the box next to the `misc` schema (if it isn't already), and click **Save**.
3. Go back to the schema page, and click the **Edit** link next to the `misc` schema.
4. Find the definition for the `inetLocalMailRecipient` class, which should be like : 

```
objectclass ( 2.16.840.1.113730.3.2.147
	NAME 'inetLocalMailRecipient'
	DESC 'Internet local mail recipient'
	SUP top AUXILIARY
	MAY	( mailLocalAddress $ mailHost $ mailRoutingAddress ) )
```

5. Change the `AUXILIARY` to `STRUCTURAL`, and click **Save**.
6. Go back to the module's main page, and click **Apply Configuration**.

### Creating LDAP Trees for Postfix

Each Postfix map should have a separate sub-tree in the LDAP database. With Virtualmin, you will need at least trees for the `alias` and `virtual` maps, which can be created as follows :

1. Click on **Create Tree**.
2. Select **Distinguished name**, and in the adjacent field enter something like *dc=Aliases,dc=foo,dc=com*.
3. Click **Create**.
4. Repeat these steps to create the *dc=Virtual,dc=foo,dc=com* tree.


### Configuring the Webmin Postfix Module

 Now that the LDAP server is set, Postfix has to be told to talk to it. The first step is to have it use the correct LDAP object class, by doing :

1. Go to the **Postfix Mail Server** module, and click on **Module Config**.
2. Find the **LDAP options** section.
3. Change the **Object classes for maps** to *inetLocalMailRecipient* .
4. Change the  **Key attribute for map objects** to *mailLocalAddress* .
5. For **Create separate DN for each domain?**, select **No** .
6. Click **Save**.

 Now you need to edit the maps for aliases and virtual domains to add LDAP data sources, as follows :

1. Go to the **Postfix Mail Server** module, and click on **Mail Aliases**.
2. Click the **...** button next to **Alias databases used by the local delivery agent**. By default, this field will just contain something like `hash:/etc/aliases`.
3. In the popup window, scroll down to the **Map source 2** section and select **LDAP server**.
4. Enter your LDAP server's hostname in the **LDAP server hosts** field.
5. Set the **LDAP search base DN** to the DN you created previously, such as *dc=Aliases,dc=foo,dc=com* .
6. Set the **Query filter** to *mailLocalAddress=%s* .
7. Set the **Result attribute** to *mailRoutingAddress* .
8. In the **Server login** field, enter your LDAP server's administration login, like *cn=Manager,dc=foo,dc=com* .
9. Enter the LDAP administration password in the **Server password** field.
10. Click **Save** at the bottom of the popup window.
11. Click **Save** again back on the **Mail Aliases** page.

 It is also possible to use a different login, such as an LDAP account who just has read-write access to the aliases sub-tree.

You must now do the same thing on the **Virtual Domains** page. The only difference should be in the **LDAP search base DN** field, which should be set to something like *dc=Virtual,dc=foo,dc=com* .

To verify that everything is working, try adding an alias using Webmin and ensure that it shows up in the list of aliases. Then send email to the new alias, and check that it is forwarded correctly. If not, check the Postfix logs in `/var/log/mail*` for errors that explain why it couldn't talk to the LDAP database.



### Creating LDAP Aliases with Virtualmin

 Once Webmin's Postfix module is configured to use LDAP, Virtualmin should automatically detect this and create any new aliases in the same LDAP database. To verify that it is all working, click on **Re-Check Config** on the left menu, and look for any messages about problems talking to the database server.

If that all checks out OK, try adding a mail aliases in Virtualmin, sending email to it, and verifying that it is delivered OK. Do the same for a mailbox user, as each has at least one `virtual` map entry for his address.

If you plan to run more than one mail server, each must have the same LDAP map configuration. This can be simplified by just copying across the configuration files in `/etc/postfix` that you will see referenced in the map definitions.