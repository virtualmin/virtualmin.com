---
title: "modify-user"
date: 2024-01-23
weight: 4012170
---

### Change attributes of a mail, FTP or database user

After a user has been created from the command line or web interface, you can use this program to modify or rename him. The virtual server and user to change must be specified with the `--domain` and `--user` parameters, which are followed by the server domain name and username respectively.

To change the user's password, use the `--pass` parameter followed by the new password. To modify his real name, use the `--real` option followed by the new name (which must typically be quoted, in case it contains a space). If you want to change the user's login name, use the `--newuser` option, followed by the new short username (without a suffix).

A user can be temporarily disabled with the `--disable` option, or re-enabled with the `--enable` option. This will not effect his files or password, but will prevent FTP, IMAP and other logins.

To set the user's disk quota, the `--quota` option must be used, followed by the disk quota in 1 kB blocks. An unlimited quota can be set with the parameters `--quota UNLIMITED` instead (although of course the user will still be limited by total server quotas).

A user can be granted or denied FTP access with the `--enable-ftp` and `--disable-ftp` options respectively. Similarly, his primary email address can be turned on or off with the `--enable-email` and `--disable-email` options.

Extra email addresses can be added and removed with the `--add-email` and `--remove-email` options. Both of these must be followed by an address to add or remove, and both can occur multiple times on the command line.

Access to MySQL/MariaDB databases in the domain can be granted with the `--add-mysql` flag, followed by a database name. Similarly, access can be removed with the `--remove-mysql` flag.

To turn off spam checking for the user, the `--no-check-spam` flag can be given. This is useful for mailboxes that are supposed to receive all the spam for some domain. To turn spam filtering back on, use the `--check-spam` command-line flag.

The user can also be added to secondary Unix groups with the `--add-group` flag, followed by a group name. To remove him from a group, use the `--del-group` parameter followed by the group to take him out of.

To add a forwarding email address for this user, use the `--add-forward` flag followed by an address or username. Conversely, to remove one use the `--del-forward` flag.

To turn off local email delivery for the user, use the `--no-local` flag. To turn it back on again, use `--local`.

To setup an auto-reply message, use the `--autoreply` flag followed by the message content. To turn off the auto-responder, use the `--no-autoreply` parameter.

To control when the auto-reply is sent, use the `--autoreply-start` flag followed by a date in `YYYY-MM-DD` format, like `2023-01-23`. To set the date on which is stops being sent, use the `--autoreply-end` flag. To limit the rate of replies to the same address, use the `--autoreply-period` flag followed by a number in minutes.

All mail users can have a password recovery address set, used by the forgotten password feature in Virtualmin. This can be set with the `--recovery` flag followed by an address, or cleared with the `--no-recovery` flag.

### Command line help

```text
virtualmin modify-user --domain domain.name
                       --user username
                      [--pass "new-password" | --passfile password-file]
                      [--disable | --enable]
                      [--real real-name]
                      [--quota quota-in-blocks]
                      [--add-mysql database]
                      [--remove-mysql database]
                      [--enable-email]
                      [--disable-email]
                      [--add-email address]
                      [--remove-email address]
                      [--recovery address@offsite.domain | --no-recovery]
                      [--newuser new-username]
                      [--enable-ftp]
                      [--disable-ftp]
                      [--add-group group]*
                      [--del-group group]*
                      [--send-update-email]
                      [--no-check-spam | --check-spam]
                      [--add-forward address]*
                      [--del-forward address]*
                      [--local | --no-local]
                      [--autoreply "messsage" | --no-autoreply]
                      [--autoreply-start time | --no-autoreply-start]
                      [--autoreply-end time | --no-autoreply-end]
                      [--autoreply-period secs | --no-autoreply-period]
```
