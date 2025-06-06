---
title: "Spam and Virus Scanning"
author: "Jamie Cameron and Joe Cooper"
weight: 2235100
---

Virtualmin allows you to enable spam and virus scanning for email on a per-virtual-server basis, and to configure what happens to email classifies as spam or virus-laden. Under the hood, it scans email using the popular [SpamAssassin](https://spamassassin.apache.org) package for spam detection, and [ClamAV](https://www.clamav.net) for viruses.

SpamAssassin assigns each message it scans a score indicating how spammy it is, based on the content and servers it was sent from. Typically, anything with a score above 5 is regarded as most likely spam. ClamAV however just compares the message contents with a database of know virus signatures, and reports if any were found or not.

### Turning on spam and virus scanning
In a typical Virtualmin installation, you can enable filtering for a new or existing virtual server by just selecting the **Spam filtering enabled?** and **Virus filtering enabled?** checkboxes in the features section of the **Create** or **Edit Virtual Server** page.

If they do not appear, make sure that these features are enabled globally on your system. This can be done as follows:

 1. Login as _root_, open the **System Settings** category on the left menu, and click on **Features and Plugins**.
 2. Check the boxes next to **Spam filtering** and **Virus filtering**.
 3. Click **Save**. If you see any error messages about SpamAssassin or ClamAV not being installed, you'll need to install their packages on your system first.

### Spam and virus filtering and Procmail
Internally, Virtualmin creates an `/etc/procmailrc` file that in turn runs a Procmail include file under `/etc/webmin/virtual-server/procmail` directory, depending on the domain to which each email received is sent. This then invokes the `spamassassin` and `clamscan` commands, then uses their output to decide if email should be delivered to a special folder or deleted.

SpamAsssassin is run with command-line parameters that tell it to use configuration files under `/etc/webmin/virtual-server/spam`, which can be different for each domain. This way, domain owners can customize their own SpamAssassin rules, spam levels and message modification settings.

### Changing delivery destinations
By default, email classified as spam as delivered to the `~/Maildir/.spam` file under each user's home directory. This shows up as a folder named `spam` in users' mail clients, and in Usermin. Email that is detected as containing viruses is deleted by default, as virus detection is almost 99.99% accurate.

However, you can change these destinations on a per-domain basis using Virtualmin. Some users may prefer that spam be deleted outright, or delivered normally so that it can be filtered by their mail clients. To change the delivery rules, the steps to follow are:

 1. Login to Virtualmin as _root_ or as the domain owner.
 1. Select the domain from the left menu.
 1. Open the **Server Configuration** category, and click on **Spam and Virus Delivery**.
 1. Change the **Destination for spam emails** and **Destination for virus emails** to whatever you want.
 1. Click **Save**. The changes will take effect for email delivered from now on.

You can also select to have email whose virus score is above some threshold deleted instead of being delivered to a `spam` folder. This can be used to stop the delivery of messages that are obviously spam, saving on disk spam and the bandwidth used to download them.

To delete high-scoring spam, just follow the steps above and set the **Delete spam if score is above** field to some number like _10_.

### Default delivery destinations
If you have spam and virus delivery destinations that you want used for all new domains, you can set them as follows:

 1. Login to Virtualmin as _root_.
 2. Open the **System Settings** category on the left menu, and click on **Module Config**.
 3. Select the **Spam filtering options** section.
 4. Change the **Default delivery for spam** and **Default delivery for viruses** to whatever you want.
 5. Click **Save**.

To make changes for all existing domains, use the `modify-spam.pl` command-line API script.

### Automatic spam clearing
If Virtualmin is configured to deliver spam to a separate folder for each user, this can end up consuming a lot of disk space and disk quotas. To keep usage down, it is possible have Virtualmin automatically delete users' spam that is more than a certain number of days old, or is taking up more than some amount of disk space.

To set this up for a single domain, the steps to follow are:

 1. Select the domain from Virtualmin's left menu.
 1. Open the **Server Configuration** category, and click on **Spam and Virus Delivery**.
 1. In the **Automatically delete spam?** field, select **Yes, if older than** and enter a number of days into the adjacent text box. I suggest _5_ days, which is more than enough time for users to periodically check their spam folders for false positives.
 1. Click **Save**.

If you prefer to delete based on disk usage, select **Yes, when mailbox exceeds** instead and enter a maximum size for the spam folder. When this is exceeded, messages will be deleted oldest first until it is smaller than the specified size.

The default setting for new virtual servers can be set on the **Module Config** page in the **Spam filtering options** section. To make changes for all existing domains, use the `modify-spam.pl` command-line API script.

### Reducing CPU load with Clamd
In the default Virtualmin configuration, each email received is processed with the `clamscan` command to check if it contains viruses. Unfortunately, this can take anywhere from seconds to minutes to run, particularly on VPS systems that have limited IO bandwidth or CPU resources. Most of this time is spent loading the virus database, which is continually growing as new viruses are found by the ClamAV authors.

Slowness running `clamscan` can cause email delivery to be delayed by several minutes, during which messages stay in the Postfix mail queue. It can also lead to high CPU load on the system, which then slows down other services like Apache or MySQL.

Fortunately, there is a fix. The `clamd` server process, which loads the virus database just once and then stays running. When email arrives, the `clamdscan` command connects to it, passes over the message to be scanned, then reads back the results. This typically only takes a seconds, even on a system with limited resources.

If your system is receiving a large amount of email, it's recommended the use of `clamd`. It probably isn't worth running on a system used primarily as a web server though, as it consumes about 2G of RAM at all times. ClamAV is not suitable for use on a low-memory system.

To enable the use of the ClamAV server process, follow these steps:

 1. Login to Virtualmin as _root_.
 1. Open the **Email Messages** category on the left menu, and click on **Spam and Virus Scanning**.
 2. At the bottom of the page you should see a button labelled **Enable ClamAV Server**. Click it. If the button isn't visible, this means that Virtualmin doesn't know how to configure `clamd` on your operating system, and you will need to do it manually.
 3. After clicking, check the messages that appear to make sure that no errors were reported. If all went well, return to the **Spam and Virus Scanning** page.
 4. Change the **Virus scanning program** to **Local server scanner (_clamd_)** , and click **Save**.

Virtualmin will check if `clamd` and `clamdscan` are working properly, and if so configure all virtual servers to use it for virus classification from now on.

### Common ClamAV problems
If Virtualmin reports that the `clamscan` command is not working on your system, here are some things to try:

  * Run `freshclam` to download the virus database. On some systems, the standard ClamAV packages do not include any virus data files, so `clamscan` cannot run.
  * Remove the `Example` line from `freshclam.conf`. On some systems this line exists by default, to intentionally prevent `freshclam` from running!
  * Make sure that the virus database path in `clamd.conf` matches the directory updated by `freshclam`. If not, `clamd` will not start due to the lack of data files.

### Moving spam and virus scanning to another system
SpamAssassin and ClamAV can use up a lot of CPU time, which on a system that receives a lot of email can significantly slow down email processing. However, it is possible to move some of this load to a separate system, by making use of `spamd` and `clamd`, the SpamAssassin and ClamAV server processes.

These can be run on one or two other systems on your network, and Virtualmin on the master system that actually receives email configured to offload scanning to them.

In the instructions below, _serverip_ is the IP address of the system that will be running `spamd`, and _virtualminip_ is the IP of the Virtualmin machine.

#### Setting up Spamd on EL systems
 1. Login to the system you want to run `spamd` on as _root_.
 2. Install SpamAssassin with:
    ```text
    dnf install spamassassin
    ```

 3. Edit the file `/etc/sysconfig/spamassassin` and add the following to the `SPAMDOPTIONS` line:
    ```text
    -i serverip -A virtualminip
    ```
 * An example file would look like:
    ```text
    # Options to spamd
    SPAMDOPTIONS="-d -c -m5 -H -i 193.9.101.242 -A 193.9.101.104"
    ```

 4. Run the following commands to start `spamd` server:
    ```text
    systemctl enable --now spamassassin
    ```

 5. If you are using a firewall on this system, open up port 783 to enable connections to SpamAssassin

#### Setting up Spamd on Debian and derivatives
 1. Login to the system you want to run `spamd` on as _root_.
 2. Install SpamAssassin with:
    ```text
    apt-get install spamassassin
    ```

 3. Edit the file `/etc/default/spamassassin` , and change the line `ENABLED=0` to `ENABLED=1`.
 4. In the same file, add the following to the `OPTIONS` line:
    ```text
    -i serverip -A virtualminip
    ```
 * An example completed line would look like:
    ```text
    OPTIONS="--create-prefs --max-children 5 --helper-home-dir -i 193.9.101.120 -A 193.9.101.104"
    ```

 5. Run the following commands to start `spamd` server:
    ```text
    systemctl enable --now spamassassin
    ```

1. If you are using a firewall on this system, open up port 783 to enable connections to SpamAssassin

#### Configuring Virtualmin to use a remote Spamd
Once `spamd` is running on the remote system, you can configure Virtualmin to use it as follows. Note that this will prevent domains and mailboxes from having their own SpamAssassin rules, unless you setup `spam` to fetch them from a MySQL/MariaDB or LDAP database.

 1. Login to Virtualmin as _root_, and go to **Email Messages ⇾ Spam and Virus Scanning**.
 2. Change the **SpamAssassin client program** menu to **spamc**.
 3. Set the **Server host for spamc** to the IP address of the remote server you setup above.
 4. Click **Save**.

Now try sending email to a mailbox in one of the domains with spam filtering enabled on your Virtualmin server, and check if SpamAssassin `X-Spam` headers are added. If not, check `/var/log/mail*` on both the Virtualmin and spam scanning systems for error messages, and `/var/log/procmail.log` as well. 

#### Setting up Clamd on a remote system
The easiest way to setup `clamd` is to use Virtualmin's built-in support for configuring it. The steps to do this are:

 1. Install Virtualmin GPL or Pro on the system to be used for running `clamd`. You don't need to create any domains, or run any other servers like MySQL/MariaDB or Postfix.
 2. Login to the new Virtualmin, and go to **Email Messages ⇾ Spam and Virus Scanning**.
 3. Click the **Enable ClamAV Server** button.
 4. SSH into the system as _root_, and edit the file `clamd.conf` and make sure the line `TCPSocket 3310` exists and is not commented out.
 5. Ensure that the `TCPAddr` line is set to the IP address to which system connections to `clamd` will be directed.
{{< alert primary terminal-square "" "On systems with *systemd* socket activation, run `systemctl edit clamav-daemon.socket`, add `ListenStream=0.0.0.0:3310` under the new `[Socket]` section, then restart the socket and service to apply the change." >}}
{{< note "Avoid using `0.0.0.0` in production; instead, bind ClamAV to a specific trusted IP to reduce exposure." "Note:" "security" >}}
 6. Run the command `systemctl restart clamd@scan` on EL systems or `systemctl restart clamav-daemon` on Debian and derivatives to apply the configuration changes.
 7. If you are using a firewall on this system, open up port 3310 to enable connections to ClamAV.

### Configuring Virtualmin to use a remote Clamd
You can now configure Virtualmin to use it as follows:

 1. Login to Virtualmin as _root_, and go to **Email Messages ⇾ Spam and Virus Scanning**.
 2. Change the **Virus scanning program** to **Remote server scanner**.
 3. In the **Server host for remote scanner** field, enter the hostname of the system running Clamd that you setup in the previous section.
 4. Click **Save**.
