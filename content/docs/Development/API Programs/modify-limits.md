---
title: "modify-limits"
date: 2024-01-23
weight: 4012245
---

### Changes the owner limits for some virtual server

This command allows you to change various limits that apply to the owner of a virtual server when they are logged into the web interface. The domain to effect is selected with the `--domain` or `--user` flag, which must be followed by a top-level domain name or administrator's username respectively.

To grant the domain owner access to some Virtualmin feature, such as `mysql` or `webalizer`, use the `--allow` flag followed by the feature code. To prevent access, use `--disallow` instead. Both flags can be given multiple times.

To change the number of domains that can be created, use the `--max-doms` flag followed by a number or the word `UNLIMITED`. To prevent him from creating domains at all, use `--max-doms NONE`. Separate limits can be imposed on the number of alias and non-alias domains with the `--max-aliasdoms` and `--max-realdoms` flags.

Limits on the numbers of databases, mailboxes and mail aliases that can be created are set with the `--max-dbs`, `--max-mailboxes` and `--max-aliases` flags respectively. Each must be followed either with a number, or the word `UNLIMITED`.

To grant the domain owner access to Virtualmin user interface capabilities such as editing aliases or users, the `--can-edit` flag should be used, followed by a capability code. Supported codes and their meanings are:

`domain` - Edit Virtual server details such as the description and password

`users` - Manage mail / FTP users

`aliases` - Manage email aliases

`dbs` - Manage databases

`scripts` - List and install scripts

`ip` - Change the IP address of virtual servers

`dnsip` - Change the externally visible (DNS) IP address of virtual servers

`ssl` - Generate and upload SSL certificates

`forward` - Setup proxying and frame forwarding

`redirect` - Create and edit website aliases and redirects

`admins` - Manage extra administrators

`spam` - Edit spam filtering, delivery and clearing settings

`phpver` - Change PHP versions

`phpmode` - Change website options and PHP execution mode

`mail` - Edit email-related settings

`backup` - Backup virtual servers

`sched` - Schedule automatic backups

`restore` - Restore virtual servers (databases and home directories only)

`sharedips` - Move to different shared IP addresses

`catchall` - Create catchall email aliases

`html` - Use the HTML editor

`allowedhosts` - Can edit the remote IPs allowed access to MySQL

`passwd` - Can change a virtual server's password

`spf` - Can edit the DNS sender permitted from record

`records` - Can edit other DNS records

`disable` - Disable virtual servers

`delete` - Delete virtual servers

Access to capabilities can also be taken away with the `--cannot-edit` flag.

To restrict the virtual server owner to only installing certain scripts, you can use the `--scripts` flag followed by a quoted list of script codes. To grant access to all script installers, use the `--all-scripts` flag instead.

### Command line help

```text
virtualmin modify-limits --domain domain.name | --user name
                        [--max-doms max|UNLIMITED|NONE]
                        [--max-aliasdoms max|UNLIMITED]
                        [--max-realdoms max|UNLIMITED]
                        [--max-mailboxes max|UNLIMITED]
                        [--max-dbs max|UNLIMITED]
                        [--max-aliases max|UNLIMITED]
                        [--can-dbname] | [--cannot-dbname]
                        [--can-rename] | [--cannot-rename]
                        [--can-migrate] | [--cannot-migrate]
                        [--force-under] | [--noforce-under]
                        [--safe-under] | [--nosafe-under]
                        [--ipfollow] | [--noipfollow]
                        [--read-only] | [--read-write]
                        [--allow feature]*
                        [--disallow feature]*
                        [--can-edit capability]*
                        [--cannot-edit capability]*
                        [--shell nologin|ftp|ssh]
```
