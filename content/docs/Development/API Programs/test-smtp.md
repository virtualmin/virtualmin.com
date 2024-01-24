---
title: "test-smtp"
date: 2024-01-23
weight: 4012835
---

### Checks if the mail server can RCPT to some address

This command is debugging tool for mailboxes and aliases, which can be used to check if some address is accepted by your mail server, and if SMTP authentication is working.

The `--server` flag specifies the mail server to test, which defaults to `localhost`. The `--from` flag sets the email address used in the `MAIL FROM` SMTP operation, which defaults to `nobody@virtualmin.com`. The `--to` flag is mandatory, and sets the destination email address.

To have it try SMTP authentication, use the `--user` and `--pass` flags which must be followed a username and password respectively. The `--auth` flag can be used to set the SMTP authentication type, which defaults to `Plain`.

By default this command will use an unencrypted connection, but you can force use of SSL mode with the `--ssl` flag or `--starttls` to attempt to switch to SSL after the connection is made. The `--port` flag followed by a port number or name can be used to have the SMTP connection made on a port other than the default (25 or 465).
 
### Command line help

```text
virtualmin test-smtp --to address
                    [--server hostname]
                    [--port number|name]
                    [--ssl | --starttls]
                    [--from address]
                    [--user login --pass password]
                    [--auth method]
                    [--data mail-file]
```
