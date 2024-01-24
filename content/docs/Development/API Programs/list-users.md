---
title: "list-users"
date: 2024-01-23
weight: 4012185
---

### List users in a virtual server

To get a list of users associated with some virtual server, this program can be used. You should typically supply the `--domain` parameter, which must be followed by the domain name of the server to list users for. This can be given several times, to display users from more than one domain. Or use `--all-domains` to list users from all virtual servers on the system. Finally, users from domains owned by a particular user can be listed with the `--domain-user` flag, which must be followed by an administrator's username.

By default, it will output a reader-friendly table of users, but you can use the `--multiline` option to show more detail in a format that is suitable for reading by other programs. To just show the usernames, use the `--name-only` flag. Or to list all email addresses for all users, use the `--email-only` flag.

When in multiline mode, any email forwarding destinations setup for the user will be listed in the internal mail server format. To get a more friendly output that includes the contents of auto-reply messages, use the `--simple-aliases` flag.

By default the server owner is not included in the list of users, but if you add the `--include-owner` command line option, he will be. Also by default the size of each user's mail file is now shown in the multiline mode output, as computing it can be disk-intensive. To display the mail file/directory size, add the `--mail-size` flag.

To limit the display to just one user in the domain, add the `--user` parameter to the command line, followed by a full or short username.

### Command line help

```text
virtualmin list-users --all-domains | --domain name | --domain-user username
                     [--multiline | --name-only | --email-only]
                     [--include-owner]
                     [--user name]
                     [--simple-aliases]
```
