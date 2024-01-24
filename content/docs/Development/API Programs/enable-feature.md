---
title: "enable-feature"
date: 2024-01-23
weight: 4012120
---

### Turn on some features for a virtual server

To enable features for one or more servers from the command line, use this program. The features to enable can be specified in the same way as the `create-domain` program, such as `--web`, `--dns` and `--virtualmin-svn`. The servers to effect can either individually specified with the `--domain` option, which can occur multiple times, or with `--all-domains` to update all virtual server.

When updating multiple servers, this program may take some time to run due to the amount of work it needs to do. However, the progress of each server and step will be shown as it runs.

If the `--associate` flag is given, this command will simply make Virtualmin assume that the underlying configuration changes or databases have been already created. This reverses the effect of the `--disassociate` flag to the `disable-feature` API command.

### Command line help

```text
virtualmin enable-feature --domain name | --user name | --all-domains
                         [--associate]
                         [--unix]
                         [--dir]
                         [--dns]
                         [--mail]
                         [--web]
                         [--ssl]
                         [--logrotate]
                         [--mysql]
                         [--spam]
                         [--status]
                         [--webmin]
                         [--virtualmin-awstats]
                         [--skip-warnings]
```
