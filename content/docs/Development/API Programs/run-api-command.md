---
title: "run-api-command"
date: 2024-01-23
weight: 4012795
---

### Executes another API command over multiple servers

Some Virtualmin API commands can only run on a single domain at a time, so this command exists as a wrapper to loop over multiple domains easily. It can be run like:
 
 ```text
virtualmin run-api-command --user foo modify-web --mode cgi
```

Flags to select the domains to operate on must be given before the command to run. All flags after the command will be passed to each invocation of it. You can see the final commands without running them by adding the `--test` flag.

By default it will operate on all virtual servers, but you can choose specific servers with the `--domain` flag which can be given multiple times. Or to limit the domains to those owned by a single user, the `--user` parameter can be given, following by a domain owner's name. You can also limit it to particular server types with the `--alias`, `--no-alias`, `--subserver`, `--toplevel` and `--subdomain` parameters.

To only show domains with a particular feature active, use the `--with-feature` parameter followed by a feature code like `dns` or `web`. Alternately, `--without-feature` can be used to show only domains without some feature enabled. The similar `--with-web` and `--with-ssl` flags can be used to show domains with any kind of website (Apache or Nginx).

To limit the list to virtual servers on some plan, use the `--plan` flag followed by a plan name or ID. Similarly, you can select only virtual servers created using some template with the `--template` flag, followed by an ID or name.

To show only domains owned by some reseller, use the `--reseller` flag followed by a reseller name. Or to list those not owned by any reseller, use the `--no-reseller` flag. Finally, to list domains owned by any reseller, you can use the `--any-reseller` option.

To show only domains that are enabled, use the `--enabled` flag. To show only disabled domains, use `--disabled` instead.
 
### Command line help

```text
virtualmin run-api-command [--domain name]*
                           [--user name]*
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
                           [--reseller name | --no-reseller |
                            --any-reseller]
                           [--test]
                           command [flags]
```
