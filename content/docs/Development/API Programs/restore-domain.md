---
title: "restore-domain"
date: 2024-01-23
weight: 4012030
---

### Restore one or more virtual servers

 To restore a Virtualmin backup from the command line, you will need to use this program. It takes very similar parameters to `backup-domain`, with the exceptions that `--dest` is replace with `--source`, and the `--separate` and `--ignore-errors` options are not used.
 
 The extra option `--no-reuid` can be specified prevent the re-allocation of Unix UIDs and GIDs for virtual servers that are created by the restore process, so that UIDs the original system are preserved. Conversely, the flag `--reuser` will force re-allocation of Unix user and group names if necessary for the new system.

 Specific features to restore can be selected with the `--feature` flag, followed by a feature name like `dns` to just restore a domain's DNS records. However in most cases you will want to a full restore, in which case the `--all-features` parameter should be given.

 Restore options for specific features can be set with the `--option` flag followed by a feature name (like *mail*), an option name and value. Some of the more useful options are :

 `--option mail mailuser username` - restores only the mailbox `username`.

 `--option dir dirnohomes 1` - exclude the `homes` subdirectory from backups.

 `--option dir delete 1` - delete files that were not in the original backup.

 If a virtual server that does not currently exist is selected to be restored, it will be created as part of the restore process. Be careful using this program, as it will not prompt for confirmation before restoring, which will over-write the contents of restored directories, databases and configuration files.

 You can limit the restore to only domains that do not yet exist yet with the `--only-missing` flag. Conversely, you can specify only domains that already exist with the `--only-existing` flag, to prevent any new virtual servers in the backup from being created.

 If a virtual server is re-created as part of the restore, you can use the `--only-features` flag to limit the features it is created with to those that are being restored. Otherwise, it will be created with all original features regardless of whether or not they were backed up.

 To restore core Virtualmin settings (if included in the backup), the `--all-virtualmin` option can be specified as well. Alternately, you can select exactly which settings to include with the `--virtualmin` parameter. For example, `--virtualmin config` would only restore the module configuration.

 When restoring a virtual server that originally had a private IP address, the same address will be used by default. However, this may not be what you want if you are restoring a domain on a different system that is not on the same network. To use a different IP address, the `--ip` flag can be given followed by an address. Or you can use the `--allocate-ip` flag to have Virtualmin select one automatically, assuming that an allocation range is defined in the template used.

 If restoring multiple domains, some of which were on shared IP addresses and some of which had private IPs, the `--original-ip` flag can be used to force IP allocation for domains that had a private address originally. Domains which were on the old system's shared IP will be assigned this system's default address.

 When the restored server was on a shared address, it will by default be given the system's default shared IP. However, if you have defined additional shared addresses, a different one can be selected with the `--shared-ip` flag followed by an address.

 Flags similar to all those above also exist for IPv6, if your system supports it. The equivalent flags are named `--ip6`, `--allocate-ip6`, `--original-ip6` and `--shared-ip6` respectively. You can also use `--no-ip6` to turn off IPv6 for the domain entirely, even if it was enabled when the backup was taken.

 By default, if any non-fatal warnings encountered during the restore process will cause the restore to fail. However, you can force it to continue with the `--skip-warnings` flag. Similarly, the failure of any one domain will abort the entire restore unless the `--continue-on-error` flag is given.

 On a Virtualmin Pro system, you can use the `--key` flag followed by a backup key ID or description to select the key to decrypt this backup with. This must be the same key that the backup was originally encrypted with.

 By default, if the domain already exists Virtualmin will just restore the backup over it. This means that any files in the domain's home directory that were not included in the backup will still exist after the restore. To force the domain to be deleted before restoring, use the `--delete-existing` flag.

 When restoring a backup on a system that shares a home directory, MySQL database server or LDAP user database with the system the backup was take from, you can use the `--replication` flag to tell Virtualmin that it is expected that the directories, databases or users may already exist.

 
### Command line help

```text
virtualmin restore-domain --source file
                         [--test]
                         [--domain name] | [--all-domains]
                         [--feature name] | [--all-features]
                         [--except-feature name]
                         [--reuid | --no-reuid]
                         [--fix]
                         [--option "feature name value"]
                         [--all-virtualmin] | [--virtualmin config]
                         [--only-features]
                         [--shared-ip address | --ip address |
                          --allocate-ip | --original-ip]
                         [--default-ip6 |
                          --shared-ip6 address | --ip6 address |
                          --allocate-ip6 | --original-ip6 | --no-ip6]
                         [--only-missing | --only-existing]
                         [--skip-warnings]
                         [--continue-on-error]
                         [--delete-existing]
                         [--replication]
                         [--key id]
```

Multiple domains may be specified with multiple --domain parameters. Features must be specified using their short names, like `web` and `dns`.

The source can be one of:
 - A local file, like `/backup/yourdomain.com.tgz`
 - An FTP destination, like `ftp://login:pass@server/backup/yourdomain.com.tgz`
 - An SSH destination, like `ssh://login:pass@server/backup/yourdomain.com.tgz`
 - An S3 bucket, like `s3://accesskey:secretkey@bucket`
 - A Rackspace container, like `rs://user:apikey@container`
 - A Google Cloud Storage bucket, like `gcs://bucket`
 - A Dropbox folder, like `dropbox://folder`
