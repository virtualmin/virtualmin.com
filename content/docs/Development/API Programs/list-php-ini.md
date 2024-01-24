---
title: "list-php-ini"
date: 2024-01-23
weight: 4012715
---

### Show PHP variables for some or all domains

This command can be used to list the value of a PHP configuration variable (set in the php.ini file) for one or many virtual servers at once. The servers to update can be selected with the `--domain` or `--user` flags, or you can choose to modify them all with the `--all-domains` option.

If your system supports multiple PHP versions, you can limit the changes to the config for a specific version with the `--php-version` flag followed by a number, like 7.4 or 8.2.

The variables to show are set with the `--ini-name` flag, which can be given multiple times to list more than one variable.
 
### Command line help

```text
virtualmin list-php-ini --domain name | --user name | --all-domains
                       [--php-version number]
                       <--ini-name name>+ <--ini-value value>+
                       [--name-only]
```
