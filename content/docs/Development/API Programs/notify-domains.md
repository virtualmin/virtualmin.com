---
title: "notify-domains"
date: 2024-01-23
weight: 4012110
---

### Send email to some or all virtual server owners

This command can be used to send a text format email message to the owners and possibly extra administrators of some or all virtual servers. The servers to notify can be selected with the `--domain` flag followed by a domain name, which can be given multiple times. Or you can use `--user` followed by an administrator's username. If neither are given, the email is sent to all virtual servers.

If the message is related to some service such as email or web serving, you can use the `--with-feature` flag followed by a feature code like `mail` or `web` to limit the servers notified to those with that feature enabled. Similarly, you can use `--without-feature` to select only virtual servers that do not have some feature enabled.

The message contents are typically read from a file, specified with the `--body-file` parameter. Or they can be passed as input to the script if the `--body-stdin` flag is used. Or for very short messages, you can specify the contents on the command line with `--body-message`. Als, you can set a custom character set for the message body with the optional `--charset` flag.

The email subject line must be set with the `--subject` flag. The from address defaults to whatever you have configured globally in Virtualmin, but can be overridden with the `--from` flag.

By default only domain owners are notified, but you can include extra admins for the selected virtual servers with the `--admins` flag. Only admins who have an email address configured will receive the message though.
 
### Command line help

```text
virtualmin notify-domains [--domain name]
                          [--user login]
                          [--with-feature code]
                          [--without-feature code]
                           --body-file /path/to/file.txt |
                           --body-message "text" |
                           --body-stdin
                          [--charset cs]
                           --subject "subject line"
                          [--from user@domain]
                          [--admins]
```
