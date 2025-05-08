---
title: "How to Backup and Restore Virtual Servers"
author: "Jamie Cameron"
date: "2024-05-03"
weight: 2510500
---

This tutorial provides detailed guidance on creating and restoring backups for virtual servers in Virtualmin, including steps for setting up scheduled, differential, and encrypted backups, purging old backups, and backing up global settings.

{{< alert primary exclamation "" "Virtualmin provides multiple tools to help you keep good backups automatically. The first step after any installation of Virtualmin should probably be thinking about your backup procedures and setting up Virtualmin to automate those procedures for you." >}}

### Introduction to domain level backups

The simplest way to backup your virtual servers is to use the backup feature built into the Virtualmin user interface, which can save them to local or remote files domain by domain. This allows you to restore the state of an entire virtual server (including all databases, users, and aliases), without affecting other parts of the system.

Each virtual server's backup is typically a single file in `tar.gz` format. This contains one or more files per Virtualmin feature that is included in the backup, such as the contents of databases, DNS records, Apache directives or the virtual server's home directory. It is also possible for a single backup file to contain multiple servers, although this format is generally not as easy to work with.

By default, only the master administrator (typically _root_ or _admin_) can perform backups, but it is possible to grant backup and restore rights to resellers and domain owners too. Only the master admin can restore all virtual server settings though, as some (such as the Apache configuration) could harm other system functions if a corrupt or malicious backup was restored.

### Backup destinations

Before you can backup anything, you need to decide where your backups are going to be stored. The simplest destination is a directory on the system running Virtualmin, such as `/backup`, but clearly this isn't going to be useful if the whole system dies. If you do want to backup to local files, at least make sure they are on a different hard drive than the home containing your `/home` directory.

A better alternative is to backup to another system, perhaps owned by you or maybe provided by your colocation company. The backup files can be transferred either via FTP or SSH, depending on which protocol the destination system supports. Almost all Unix systems will allow SSH logins, but some network attached storage devices will only support FTP.

Another option is to use one of the supported [cloud storage](/docs/backup-and-migration/cloud-storage-providers) providers. This is probably the safest option.

### Scheduling backups

The best way to have your system backed up is to have Virtualmin do it automatically on a regular schedule, such as once per day. The steps to set this up are:

- Login to Virtualmin as the master administrator, typically _root_.
- Open the **Backup and Restore** category on the left menu, and click on **Scheduled Backups**.
- Click on the **Add a new backup schedule** link to open the backup creation form.
- From the **Servers to save** menu, choose the domains that you want to backup. Selecting them all is generally the best bet.
- In the **Features and settings** section, make sure **Backup all features** is selected.
- In the **Backup destination** box, choose if you want to backup to a local file or a remote SSH or FTP server. For remote systems, you must enter the login details for the destination system.
- If you want to save each domain to a separate file (recommended), the destination path must be an existing directory like `/backup`. For the **Backup format**, select **One file per server**.
- In the **Schedule and reporting** section, enter your email address in the **Email backup report to** field.
- Unless you want to get email every time a backup is done, check the **Only send email on failure** box.
- In the **Scheduled backup time** section, select a schedule. It is recommended to just choose **Daily (at midnight)** option, but more complex times and dates can be chosen using the **Complex schedule** option.
- Click the **Create Schedule** button.

Once this is done, your virtual servers will be safely backed up every night. To force an immediate backup for testing purposes, go to the **Scheduled Backups** page and click on the **Backup** link next to your new schedule.

### One-off backups

Sometimes you just want to backup a few virtual servers to a different destination a single time, rather than on a regular schedule. To do this, click on the **Backup Virtual Servers** link on the left menu, and fill in the backup form as described above. When you click the **Backup Now** button then selected domains will be immediately backed up, and their progress displayed in your browser.

### Restoring virtual servers

If a virtual server has been accidentally deleted, or lost files, database content or users, you can restore some or all of its data from a backup. In the case where the whole domain is gone, Virtualmin will re-create it for you as part of the restore process.

The steps to restore a domain are:

- Open the **Backup and Restore** category on the left menu, and click on **Restore Virtual Servers**.
- In the **Restore source** section, enter the local or remote path to restore from. If you are just restoring one server, it is best to enter the full path to its backup file, like `/backup/example.com.tar.gz`.
- Under **Features and settings**, you can control if all attributes of the virtual server are restored (overwriting any that it currently has), or just some. For example, if you wanted to restore just the domain's databases, you could select **Only those selected below** and then check the box next to the MySQL feature. By default, everything will be restored.
- Click the **Show What Will Be Restored** button at the bottom of the page.

After this step, the backup will be downloaded from its source FTP or SSH server and a confirmation page displayed showing which domains and features will be restored. Be careful when restoring existing domains, as any aliases, databases or mailboxes that they have will be removed and replaced with those in the backup.

If everything looks okay, click the **Restore Now** to begin the restore process. As it runs, the progress of each domain and feature will be displayed by Virtualmin.

### Backups by domain owners

Individual virtual server owners can backup their own top-level domains and sub-servers, if granted permission on the **Edit Owner Limits** page in the **Allowed capabilities and features** section. They can even be given the rights to run scheduled backups, although that right should not be granted to users you don't trust not to abuse it, as a large number of scheduled backups could overwhelm the system.

The user interface for server owner backups is almost identical to that for the master administrator, with the exception that local backups can only be made to the `.virtualmin-backup` directory under their top-level server's home directory. There are no limits on remote FTP, SSH and cloud backups though.

When allowed, restored features by domain owners are even more limited to prevent configuration file corruption or hacking attempts by corrupt backups, only home directory and database contents can be restored, and local restores can only be from the `.virtualmin-backup` directory, not any file on the system.

### Differential backups

If your system hosts virtual servers that contain a large amount of content in their home directories which does not change often (such as images, PDFs or video files), backing them up daily will be both slow and wasteful. Almost all the contents of each backup will be identical to the previous run, so most of the data transferred is not really necessary.

Fortunately, Virtualmin has a solution by utilizing differential backups. These contain only files that have changed or been added since the last full (non-differential) backup, and are thus much faster. Typically you should schedule a full backup for once a week, and a differential backup for the same domains every night but to a different directory.

Enabling differential mode for a scheduled backup is as simple as changing the **Backup level** option to **Differential**. This will only apply to home directory contents, as Virtualmin does not support detection of differential changes to databases, so if your virtual servers have a large amount of data in a database, the saving will probably be minimal.

{{< alert warning question "" "The differential backup connects to the latest full backup for the domain, regardless of its destination. Virtualmin currently does not support multiple full and differential schedules for different destinations, but multiple destinations can be set up using the state-preserving option “Neither (all files, and don’t update the state)” for compatibility." >}}

When restoring, the latest full backup must be restored first, followed by the latest differential. This ensures that all files are returned to their state at the time the differential backup was made.

### Date-based backups

If you have enough disk space, keeping backups made over several days or months is a good idea, as it allows you to return virtual servers to their state before some disaster occurred, which may not have been immediately noticed. The standard way to do this in Virtualmin is to use a backup path that contains special tokens that vary based on the current date and time.

For example, the path `/backup/%Y-%m-%d` would be converted to `/backup/2024-01-14` on January 14, 2024. All tokens supported by the Unix `strftime` function can be used in backup paths, but the most useful are:

- `%Y` - Year, as a 4 digit number
- `%m` - Month of the year, padded to 2 digits
- `%d` - Day of the month, padded to 2 digits
- `%H` - Hour of the day, padded to 2 digits
- `%M` - Minute of the hour, 2 digits
- `%a` - The short weekday name, like `Sat`

To use these tokens in backup paths, you must check both the `Do strftime-style time substitutions on file or directory name` and `Create destination directory` boxes on the backup form.

### Purging old backups

The only problem with keeping old backups around using date-based paths is the amount of disk space consumed. However, removing those older than some number of days is relatively easy to setup in Virtualmin. When creating or editing a scheduled backup, use the **Delete old backups** field to enter a maximum age in days before backups are removed.

This can only be used if your backup path contains date substitution tokens, like `/backup/virtualmin-%Y-%m-%d`. If not, Virtualmin will not be able to work out which files and directories are backups that it made in order to safely delete them.

In addition, it is recommended against using the same directory to store backups made using other programs, as if their filenames are similar to Virtualmin backups they may be deleted as well if too old.

### Using backups to transfer virtual servers

If you have more than one system running Virtualmin, backups and restores can be used to transfer domains between them easily. The restore process will even re-create the virtual servers on the target system, and adjust the backups to match the target's mailbox format, mail server, home directory base and other system-specific settings.

The steps to transfer a virtual server between systems are:

1. Create a backup on the source system containing the top-level server you want to transfer, and all sub-servers. The **Include sub-servers** checkbox on the backup form makes this easy.
2. Copy the backup file(s) across to the target system, if they weren't already transferred directly as part of the backup process.
3. Use the restore form to re-create the domains from the backup files. If you select them all at once, any top-level servers will be restored before sub-servers, and their hierarchy correctly preserved.
4. Update DNS entries or change nameservers at your registrar so that the new system serves the domains.
5. Verify that everything is working on the new system, paying particular attention to PHP applications that may have unexpected dependencies on the old system.
6. Delete the virtual servers from the source system.

### Encrypted backups

Virtualmin Pro supports the encryption and signing of backups with GPG keys. This can be used to protect the contents of a sensitive backup from prying eyes or modification if stored on an un-trusted remote system.

Before a backup can be encrypted, you must create or import at least one key at **Backup and Restore ⇾ Backup Encryption Keys** page. A key can either be generated by Virtualmin, or imported from an existing GPG secret key file in ASCII format.

Once a key has been created, it can be selected on the one-time or scheduled backup form using the **Encrypt backup with key** field. When the backup is restored, the same key must also be selected using the field with the same name on the restore form.

{{< alert warning exclamation-triangle "" "In case a backup key is lost, any backups made using it will not be recoverable! For this reason, you should save the ASCII format key text separately. This can be found on the **Backup Encryption Keys** page, by clicking on a key. This way if your Virtualmin system fails and you need to restore backups onto a new system, the key can be imported first." >}}

### Backing up global settings

In addition to virtual servers, backups made by the master administrator can also contain Virtualmin settings that apply to the whole system, such as templates and custom fields. If you have created your own templates or heavily customized the module configuration, you should back these settings up too as follows:

1. Create a new scheduled backup, as described above.
2. In the **Servers to save**, choose the **Only selected** option but do not select any domains.
3. Under **Features and settings**, check all the boxes in the **Virtualmin settings to also backup** section. Or if you only want to save some global settings, just check the ones you want.
4. Select a backup destination as normal. This can either be a single `tar.gz` file which will contain all the global settings, or a directory. In the latter case, a file named `virtualmin.tar.gz` will be created in the target directory to store the global configuration backup.
5. Select a schedule, and click the **Create Schedule** button.

It is also possible to include global Virtualmin settings in your backups of virtual servers, by selecting the ones to include in the **Virtualmin settings to also backup** field.

### Restoring global settings

The various global Virtualmin configuration settings can be restored in exactly the same way as you would restore domains. Just select the `virtualmin.tar.gz` file as the source to restore from, and in the **Virtualmin settings to restore** section check the types of global settings to include.

This can even be used to migrate templates, custom fields, script installers, content styles, resellers and email messages to a new system.

### Command line backup tools

If you prefer to work at the command line, backups and restores can be done using the tools listed on the [Backup and Restore API](/docs/development/api-programs/backup-domain) page. These allow you to create your own scripts for backing up on complex schedules, emailing backups to somewhere, using rsync to transfer home directory contents, or whatever you can come up with.
