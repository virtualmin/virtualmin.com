---
title: "create-user"
subSection: "Mail and FTP Users"
date: 2024-01-23
weight: 4012155
---

### Create a mail, FTP or database user

This program adds a new user to an existing virtual server. It is typically called with parameters like :

```text
virtualmin create-user --domain example.com --user john --pass password --quota 1024 --real 'John Doe'
```

This command would add a user to the server `example.com` named `john` with password `password` and a disk quota of 1MB. The actual POP3 and FTP username may end up as `john.example`, depending on whether or not domain suffix are always appended to usernames, and what suffix format is used. However, you can force use of the specified username with the `--noappend` flag.

The `--ftp` option can be used to give the new user an FTP login as well, though by default, a user will only be given an email account. The `--noemail` option turns off the default email account, which is useful for creating FTP or database-only users. The `--db-only` flag is used to create a database-only user, with no Unix user, email or FTP access.

Extra email addresses for the new user can be specified with the `--extra` option, followed by an email address within the virtual server. This option can be given multiple times if you wish.

The new user can be granted access to MySQL databases associated with the virtual server with the `--mysql` option, which must be followed by a database name. This option can occur multiple times in order to grant access to more than one database. Unfortunately, there is no way to grant access to PostgreSQL databases.

To create a user who has only FTP access to the domain's website, use the `--web` flag. To turn off spam checking for the new user, include `--no-check-spam` on the command line. To add the user to additional secondary Unix groups, the `--group` flag followed by a group name can be given multiple times.

For more control over the user's login abilities (FTP, SSH or email only), use the `--shell` parameter followed by a full path to a Unix shell, such as `/bin/false`. Available shells can be displayed using the `list-available-shells` command.

If you only have a pre-encrypted password that you want the new user to use, the `--encpass` flag can be used to set it instead of `--pass`. However, this will prevent Virtualmin from enabling MySQL/MariaDB access for the user, as it needs to know the plaintext password to re-hash it for MySQL.

All mail users can have a password recovery address set, used by the forgotten password feature in Virtualmin. For new users, this can be set with the `--recovery` flag followed by an address.

### Command line help

```text
virtualmin create-user --domain domain.name
                       --user new-username
                       --pass "password-for-new-user" |
                       --encpass encrypted-password |
                       --random-pass |
                       --passfile password-file
                      [--quota quota-in-blocks|"UNLIMITED"]
                      [--real real-name-for-new-user]
                      [--ftp]
                      [--shell /path/to/shell]
                      [--noemail]
                      [--extra email.address@some.domain]
                      [--recovery address@offsite.com]
                      [--mysql db]*
                      [--group name]*
                      [--web]
                      [--no-check-spam]
                      [--no-creation-mail]
                      [--home directory]
                      [--noappend]
```
