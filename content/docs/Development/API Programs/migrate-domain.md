---
title: "migrate-domain"
date: 2024-01-23
weight: 4012065
---

### Imports a virtual server from some other product

Virtualmin has the capability to import servers from other hosting programs, such as cPanel and Plesk. This program can perform an import from the command line, which will create a new server in Virtualmin with all the same settings and content as the original server.

The `--source` parameter must be followed by the name of the backup or export
file to migrate from. The `--type` parameter must be followed by the short name
of the product that originally created the backup, such as `cpanel`, `plesk` or
`directadmin`.

By default, Virtualmin will attempt to work out the domain name from the backup automatically. However, this can be overridden with the `--domain` parameter, which must be followed by a domain name. Similarly, the original username and password will be used unless set with `--user` and `--pass` respectively. Some migration formats do not contain the password, in which case `--pass` must be given, as an error will be displayed if it is missing.

To migrate a server under the ownership of an existing Virtualmin user, use the `--parent` parameter to specify the name of the parent domain. The optional `--webmin` parameter will cause a Webmin login to be created for the migrated server, which is typically what you want unless using `--parent`.

If the original server had a private IP address, either the `--ip` or `--allocate-ip` parameter should be used to create an IP for the new virtual server. Failure to do this may cause the migration attempt to be rejected, or for features of the migrated server to not work properly, such as its SSL virtual website. If you want to use a virtual IP that is already active on the system, you must add the `--ip-already` command-line option.

When the migrated server was on a shared address, it will by default be given the system's default shared IP. However, if you have defined additional shared addresses, a different one can be selected with the `--shared-ip` flag followed by an address.

Flags similar to all those above also exist for IPv6, if your system supports it. The equivalent flags are named `--ip6`, `--allocate-ip6`, `--original-ip6` and `--shared-ip6` respectively.

The `--template` parameter can be used to specify a Virtualmin template by name to use when creating the migrated virtual server. If not given, the default settings template will be used.
 
### Command line help

```text
virtualmin migrate-domain --source file
                          --type cpanel|plesk|directadmin
                          --domain name
                         [--user username]
                         [--pass "password"]
                         [--webmin]
                         [--template name]
                         [--parent domain]
                         [--prefix string]
                         [--delete-existing]
                         [--shared-ip address | --ip address |
                          --allocate-ip]
                         [--default-ip6 |
                          --shared-ip6 address | --ip6 address |
                          --allocate-ip6]
                         [--test]
```
The source can be one of:

- A local file, like `/backup/yourdomain.com.tgz`
- An FTP destination, like `ftp://login:pass@server/backup/yourdomain.com.tgz`
- An SSH destination, like `ssh://login:pass@server/backup/yourdomain.com.tgz`
- An S3 bucket, like `s3://accesskey:secretkey@bucket`
- A Rackspace container, like `rs://user:apikey@container`
- A Google Cloud Storage bucket, like `gcs://bucket`
- A Dropbox folder, like `dropbox://folder`
