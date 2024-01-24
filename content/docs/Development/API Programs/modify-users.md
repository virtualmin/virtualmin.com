---
title: "modify-users"
date: 2024-01-23
weight: 4012190
---

### Modify attributes of some or all users for some or all virtual servers

This command can be used to mass update attributes of all users `--all-users` in all existing virtual servers `--all-domains` in one shot.

This command essentially acts as a wrapper for the `virtualmin modify-user` subprogram. For more details, please check its help documentation.

For example, to enable email for all users in all domains, run:

```text
virtualmin modify-users --all-domains --all-users --enable-email
```

To disable email for all users in the given domain, run:

```text
virtualmin modify-users --domain example.com --all-users --disable-email
```

To modify quota for all joe users in all domains, run:

```text
virtualmin modify-users --all-domains --user joe --quota UNLIMITED
```
 
### Command line help

```text
virtualmin modify-users --all-domains | --domain name
                        --all-users | --user name
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
