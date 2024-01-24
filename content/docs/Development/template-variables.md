---
title: "Template Variables"
weight: 4010020
---

This page lists many of the template variables that you can use in email messages to domain owners and mailboxes, initial website content, Apache and BIND configurations and many other places in Virtualmin.

In all cases, variables like `${DOM}` or `$DOM` will be replaced with the value from the domain or mailbox being created. Additional variables can be found by looking in one of the `/etc/webmin/virtual-server/domains` files. The parameters found in those files can all be used in the template variables.

### Domain template variables

These variables apply to virtual server templates:

| Variable        | Description                                                |
|-----------------|----------------------------------------------------------  |
| `$DOM`          | Domain name, e.g., `example.com`                           |
| `$IDNDOM`       | Domain name in native character set, e.g., `παράδειγμα.ευ` |
| `$USER`         | Virtual server's admin login and Unix username             |
| `$GROUP`        | Unix group for mailboxes                                   |
| `$PASS`         | Plain text password                                        |
| `$IP`           | IP address for the virtual server                          |
| `$OWNER`        | Virtual server description                                 |
| `$EMAILTO`      | Contact email address                                      |
| `$HOME`         | Home directory                                             |
| `$ID`           | Unique ID for each domain                                  |
| `$PARENT`       | Unique ID for the parent domain, if any                    |
| `$UID`          | Unix UID for the server's Unix user                        |
| `$GID`          | Unix GID for the server's Unix group                       |
| `$PREFIX`       | Prefix/suffix for mailbox users                            |
| `$QUOTA`        | Quota for Unix user and all mailboxes                      |
| `$UQUOTA`       | Quota for Unix user only                                   |
| `$BW_LIMIT`     | Monthly bandwidth limit                                    |
| `$BW_USAGE`     | Bandwidth used this month                                  |
| `$RESELLER`     | Reseller's login name, if any                              |
| `$DB`           | Default database name                                      |
| `$MYSQL_USER`   | Username for MySQL login                                   |
| `$MYSQL_PASS`   | Password for MySQL login                                   |
| `$RESELLER_DESC`| Reseller's description                                     |
| `$DISABLED`     | List of disabled services                                  |
| `$DISABLED_WHY` | Reason for virtual server being disabled                   |

When the template is related to a sub-server, variables for the parent server are also available with `PARENT_DOMAIN_` prefix, like `$PARENT_DOMAIN_HOME` and `$PARENT_DOMAIN_DOM`. Variables corresponding to the custom fields will use the format `$VIRTUALSERVER_FIELD_fieldname` with `fieldname` representing the custom field's name.


### Domain feature variables

The following variables are available in any virtual server related template, and will be set to `1` if the feature they are related to is enabled, `0` if not. They are most useful in blocks like `${IF-DNS} ... ${ENDIF-DNS}`.

| Variable        | Description                                                |
|-----------------|----------------------------------------------------------  |
| `$DIR`          | Virtual server has a home directory                        |
| `$UNIX`         | Server has a Unix login                                    |
| `$VIRT`         | Private IP address is associated with virtual server       |
| `$WEB`          | Website enabled                                            |
| `$MAIL`         | Email for the domain is accepted                           |
| `$SSL`          | Website with SSL support enabled                           |
| `$DNS`          | DNS domain exists                                          |
| `$LOGROTATE`    | Log rotation for web/FTP logs enabled                      |
| `$MYSQL`        | Server has MySQL login/databases                           |
| `$POSTGRES`     | Server has PostgreSQL login                                |
| `$WEBALIZER`    | Web traffic reporting by Webalizer                         |
| `$FTP`          | Virtual anonymous FTP site enabled                         |
| `$SPAM`         | Spam filtering for email enabled                           |
| `$VIRUS`        | Virus filtering enabled                                    |
| `$STATUS`       | Website status monitoring active                           |

Plugin feature-related variables:

| Variable                      | Description                                                |
|-------------------------------|------------------------------------------------------------|
| `$VIRTUALMIN-DAV`             | DAV access to website                                      |
| `$VIRTUALMIN-SVN`             | SVN access to repositories                                 |
| `$VIRTUALMIN-MAILMAN`         | Mailing lists for the server                               |
| `$VIRTUALMIN-AWSTATS`         | AWstats web traffic reporting                              |
| `$VIRTUALMIN-GOOGLE-ANALYTICS`| Analytics tracking                                         |
| `$VIRTUALMIN-REGISTRAR`       | DNS domain registration                                    |
| `$VIRTUALMIN-SLAVEDNS`        | DNS domain is a slave                                      |
| `$VIRTUALMIN-MAILRELAY`       | Email relayed to another server                            |
| `$VIRTUALMIN-INIT`            | Commands run at boot time                                  |

### Mailbox variables

Variables for mailbox/FTP user templates:

| Variable    | Description                                 |
|-------------|---------------------------------------------|
| `$USER`     | Full Unix username                          |
| `$MAILBOX`  | Email address' first part before `@` sign   |
| `$PASS`     | Encrypted password                          |
| `$PLAINPASS`| Plain-text password                         |
| `$QUOTA`    | Disk quota                                  |
| `$UQUOTA`   | Disk space used                             |
| `$EMAIL`    | Full email address                          |
| `$EXTRA`    | Additional email addresses                  |
| `$HOME`     | Home directory                              |
| `$REAL`     | Real name of the user                       |
| `$SHELL`    | Unix shell                                  |
| `$UID`      | Mailbox Unix user's UID                     |
| `$GID`      | Unix user's GID                             |
| `$FTP`      | Set to `1` if FTP access, `0` if not        |
| `$SSH`      | Set to `1` if SSH access, `0` if not        |

### Variables in domain modification scripts

If you've set up Virtualmin to execute a script before or after making modifications to a virtual server, all the variables mentioned on this page are accessible as Unix environment variables. However, they begin with `VIRTUALSERVER_` prefix, such as `$VIRTUALSERVER_DOM` and any dashes are substituted with underscores.

For details and examples, see [Domain Management API](/docs/development/domain-management-api) page.
