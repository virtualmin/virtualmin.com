---
title: "backup-domain"
subSection: "Backup and Restore"
date: 2024-01-23
weight: 4012020
---

### Backup one or more virtual servers

This program is analogous to the Backup Virtual Servers page in the Virtualmin web interface. It will create either a single backup file or multiple separate files containing the domains specified on the command line, either locally or on a remote SCP or FTP server.

The `--dest` option sets the backup destination, and can be a simple path like `/backup/virtualmin.tgz` , an FTP URL like `ftp://user:pass@server:/backup/virtualmin.tgz` , or an SCP URL like `ssh://user:pass@server:/backup/virtualmin.tgz` . When backing up to a single file, the path specifies a file that will be created. When creating one backup per domain, it specifies a directory instead.

The `--domain` and `--all-domains` options can be used to control which virtual servers are included in the backup. The `--domain` parameter followed by a domain name can be given multiple times, to select more than one server.

Alternately, virtual servers can be selected with the `--user` flag followed by an administrator's username, `--plan` followed by a plan name, or `-reseller` followed by a reseller name. In all cases, all sub-servers will be included too.

Typically the `--all-features` option will be used to include all virtual server features in the backup, but you can instead use the `--feature` option one or more times to control exactly what gets included. In this case, it is wise to use at least `--feature dir` to include each server's home directory.

The `--newformat` option tells the backup program to create a separate file for each virtual server. As long as the entire domain is being backed up, this format also uses less temporary space as all databases and other additional files are included in the home directory archive.

Using the `--ignore-errors` option means than any errors encountered backing up one feature or server will be reported and ignored, rather than terminating the whole backup as happens by default.

To include core Virtualmin settings in the backup, the `--all-virtualmin` option can be specified as well. Alternately, you can select exactly which settings to include with the `--virtualmin` parameter. For example, `--virtualmin config` would only backup the module configuration.

By default, backups include all files in each domain's home directory. However, if you use the `--incremental` parameter, only those changed since the last non-incremental backup will be included. This allows you to reduce the size of backups for large websites that rarely change, but means that when restoring both the full and incremental backups are needed.

The alternative parameter `--no-incremental` can be used by prevent Virtualmin from clearing the list of files that were included in the last full backup. This is used if you have a scheduled incremental backup setup, and don't want to change its behavior by doing an ad-hoc full backup.

To exclude some files from each virtual server's home directory from the backup, use the `--exclude` flag followed by a relative filename, like *public_html/stats* or *.bashrc*. Alternately, you can limit the backup to only specific files and directories with the `--include` flag.

To have Virtualmin automatically replace strftime-style date formatting characters in the backup destination, you can use the `--strftime` flag. When this is enabled, the `--purge` flag can also be given, followed by a number of days. The command will then delete backups in the same desination directory older than the specified number of days. To see more detail about which files were consisered for purging, add the `--purge-debug` flag.

On a Virtualmin Pro system, you can use the `--key` flag followed by a backup key ID or description to select the key to encrypt this backup with. Keys can be found using the `list-backup-keys` API call.

By default, only one backup to the same destination can be running at the same time - the second backup will immediately fail. You can invert this behavior with the `--kill-running` flag, which terminates the first backup and allows this one to continue. Or you can use the `--wait-running` flag to delay the backup until the first one completes.

To override the default compression format set on the Virtualmin Configuration page, use the `--compression` flag followed by one of `gzip`, `bzip2`, `tar` or `zip`.


### Command line help

```text
virtualmin backup-domain [--dest file]+
                         [--test]
                         [--domain name] | [--all-domains]
                         [--user name]
                         [--reseller name]
                         [--plan name]
                         [--feature name] | [--all-features]
                                            [--except-feature name]
                         [--ignore-errors]
                         [--newformat]
                         [--onebyone]
                         [--strftime] [--purge days]
                         [--incremental] | [--no-incremental]
                         [--all-virtualmin] | [--virtualmin config] |
                                              [--except-virtualmin config]
                         [--option "feature name value"]
                         [--as-owner]
                         [--exclude file]*
                         [--include file]*
                         [--purge days]
                         [--purge-debug]
                         [--key id]
                         [--kill-running | --wait-running]
                         [--compression gzip|bzip2|tar|zip]
```

Multiple domains may be specified with multiple `--domain` parameters. Features must be specified using their short names, like `web` and `dns`.

The destination can be one of:
 - A local file, like `/backup/yourdomain.com.tgz`
 - A local directory can be given while passing `--newformat` option, like `/backup/`
 - An FTP destination, like `ftp://login:pass@server/backup/yourdomain.com.tgz`
 - An SSH destination, like `ssh://login:pass@server/backup/yourdomain.com.tgz`
 - An S3 bucket, like `s3://accesskey:secretkey@bucket`
 - A Rackspace container, like `rs://user:apikey@container`
 - A Google Cloud Storage bucket, like `gcs://bucket`
 - A Dropbox folder, like `dropbox://folder`

Multiple destinations can be given, if they are all remote.

