---
title: "list-domains"
date: 2024-01-23
weight: 4012105
---

### Lists all virtual servers

This program does not modify the system, but instead simply outputs a list of all existing virtual servers. By default, the list is a reader-friendly format, but the `--multiline` option can be used to display more details for each server, in a format suitable for parsing by other programs. The `--domain` option can be used to specify a single virtual server to list, in cases where you know exactly which server you are interested in.

To limit the domains to those owned by a single user, the `--user` parameter can be given, following by a domain owner's name. You can also limit it to particular server types with the `--alias`, `--no-alias`, `--subserver`, `--toplevel` and `--subdomain` parameters.

To only show domains with a particular feature active, use the `--with-feature` parameter followed by a feature code like `dns` or `web`. Alternately, `--without-feature` can be used to show only domains without some feature enabled. The similar `--with-web` and `--with-ssl` flags can be used to show domains with any kind of website (Apache or Nginx).

To limit the list to virtual servers on some plan, use the `--plan` flag followed by a plan name or ID. Similarly, you can select only virtual servers created using some template with the `--template` flag, followed by an ID or name.

To show only domains owned by some reseller, use the `--reseller` flag followed by a reseller name. Or to list those not owned by any reseller, use the `--no-reseller` flag. Finally, to list domains owned by any reseller, you can use the `--any-reseller` option.

To show only domains that are enabled, use the `--enabled` flag. To show only disabled domains, use `--disabled` instead.

To limit the output to domains using a particular PHP execution mode, use the `--php-mode` flag followed by one of `none`, `cgi`, `fcgid` or `fpm`.

To search by IPv4 or IPv6 address, use the `--ip` flag followed by either kind of address. This will find domains using that address either exclusively or shared with other domains.

To find the domain that contains a mailbox, use the `--mail-user` flag followed by the full mailbox username (as used by FTP and IMAP).

To get a list of domain names only, use the `--name-only` parameter. To get just Virtualmin domain IDs, use `--id-only`. These are useful when iterating through domains in a script. You can also use `--user-only` to output only usernames, or `--home-only` to get just home directories, or `--simple-multiline` to get a faster subset of the information output in `--multiline` mode.


### Command line help

```text
virtualmin list-domains [--multiline | --name-only | --id-only |
                         --simple-multiline | --user-only |
                         --home-only | --file-only | --ip-only]
                        [--domain name]*
                        [--user name]*
                        [--mail-user name]*
                        [--id number]*
                        [--with-feature feature]
                        [--without-feature feature]
                        [--with-web] [--with-ssl]
                        [--alias domain | --no-alias]
                        [--subserver | --toplevel | --subdomain]
                        [--parent domain]
                        [--plan ID|name]
                        [--template ID|name]
                        [--disabled | --enabled]
                        [--php-mode cgi|fcgid|fpm]
                        [--ip address]
                        [--reseller name | --no-reseller |
                         --any-reseller]
```
