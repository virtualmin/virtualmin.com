---
title: "list-aliases"
date: 2024-01-23
weight: 4012225
---

### List aliases for a virtual server

This program displays a list of mail aliases that exist in the virtual server specified by the `--domain` command line option. This may be given multiple times to select more than one domain, or you can have aliases in all virtual servers output using the `--all-domains` flag. To output aliases in all domains owned by some administrator the `--user` parameter can be given, followed by a Virtualmin username.

To get more details about each alias, use the `--multiline` flag, which switches the output to a format more easily parsed by other programs. To just list the alias names, use the `--name-only` parameter. To list full email addresses, use the `--email-only` flag.

In the regular table-format output mode, if an alias has an associated description and multiline mode is enabled, it will be displayed after the alias's from address, separated by a `#` character.

Some aliases managed by Virtualmin are not created by users directly, but are instead created as part of some other process, such as the addition of a mailing list. Such aliases are not displayed by default, as editing them can cause problems with the associated mailing list. To include these aliases in the list produced by `list-aliases`, use the `--plugins` command line flag.

### Command line help

```text
virtualmin list-aliases --all-domains | --domain name | --user username
                       [--multiline | --name-only | --email-only]
                       [--plugins]
```
