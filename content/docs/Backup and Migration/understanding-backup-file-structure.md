---
title: "Exploring Backup Structure"
author: "Ilia Ross"
date: "2025-07-11"
weight: 2510503
---

This tutorial helps Virtualmin users understand what’s inside a Virtualmin
backup file, explaining how backup files are named, what each file represents,
and how file structures differ depending on your chosen backup format.

Virtualmin backups store your server data in a single downloadable file,
which, when extracted, reveals multiple smaller files. Knowing how these files
are organized makes troubleshooting, manual restores, or accessing specific data
easier.

## Backup file formats

Virtualmin creates backup archives using different compression formats based on
your selection:

- **TAR with GZ**: Creates `.tar.gz` files using GNU Tar with `gzip` compression
- **TAR with BZIP2**: Creates `.tar.bz2` files with better compression but slower processing
- **TAR**: Creates uncompressed `.tar` archives with no compression
- **ZIP**: Creates `.zip` files with compression, compatible with most systems
- **TAR with ZSTD**: Creates `.tar.zst` files with modern, efficient compression

## Understanding the file structure

When you extract a Virtualmin backup, you'll see lots of files with names like
`domain.tld_*` or `virtualmin_*`. These files are divided into two main groups:
those related to your domain and those for the global Virtualmin system
configuration. Let's break it down.

### Domain-specific files

Each virtual server (domain) has its own set of files, all prefixed with the
domain name. For example, if your domain is **domain.tld**, you'll see files
ending with an underscore followed by the Virtualmin feature name, for example:

#### `domain.tld_dir`
Contains the entire home directory of the domain, including all website files,
user data, and mail directories. This is typically the largest file in the
backup.

#### `domain.tld_dns`
Stores DNS configuration for the domain, including zone file settings and
nameserver records.

#### `domain.tld_logrotate`
Log rotation configuration that determines how your server logs (like webserver
access and error logs) are rotated and stored.

#### `domain.tld_mail_*`
Multiple files handling email configuration.

#### `domain.tld_mysql`
Database server configuration.

#### `domain.tld_mysql_[dbname]`
Individual database dumps. Each database gets its own file containing all tables
and data.

#### `domain.tld_spam_*`
Spam filtering configurations including SpamAssassin rules and user preferences.

#### `domain.tld_ssl_*`
SSL certificate files.

#### `domain.tld_virtualmin`
Contains domain-specific configuration, including domain user and group,
assigned IP addresses, enabled features, and other domain-related settings.

#### `domain.tld_virtualmin-[plugin]`
Configuration or actual backup files for Virtualmin plugins like AWStats or WP
Workbench.

#### `domain.tld_web`
Apache webserver configuration for the domain.

#### `domain.tld_web_[ae]log`
Access and error log files.

#### `domain.tld_webmin`
Webmin access permission settings for the domain owner for different Webmin
modules.

{{< alert primary note "" "Depending on the features selected during backup, you might see more or fewer files in this section." >}}

### Global configuration files
Virtualmin system-wide settings are stored in files beginning with
**virtualmin_**, for example:

#### `virtualmin_config`
Main Virtualmin module config containing global settings and feature defaults.

#### `virtualmin_templates`
Server templates that define default settings for new domains.

#### `virtualmin_templates_plans`
Account plans with resource limits and feature sets.

#### `virtualmin_mailserver_*`
Global mail server configuration for Postfix, OpenDKIM, and other mail-related
settings.

#### `virtualmin_resellers`
Reseller account information and permissions.

#### `virtualmin_scheds`
Scheduled backup configurations.

#### `virtualmin_scripts`
Script installer data and configurations.

#### `virtualmin_email`
Email templates for automated messages.

{{< alert primary note "" "Depending on the selected backup options, you may find more or fewer global configuration files in this section." >}}

## Compression format of nested archives
The format of nested archives within the backup matches the compression method
you select. Most components are not compressed, but some are. With tar-based
archives, these nested archives are never compressed—they simply bundle multiple
files together. In zip-based backups, nested archives are minimally compressed,
mainly to group files into a single archive. The internal structure remains
consistent; only the archive handling aligns with your selected backup method.

## Conclusion

Virtualmin backup files have a clear structure that makes managing your data
easy. Files starting with your domain name contain specific data and settings,
like website files, DNS records, or databases, while other files contain
settings that apply globally across the entire Virtualmin system.

No matter which compression method you choose, the internal organization stays
consistent.
