---
title: "list-config-revisions"
subSection: "Configuration History"
date: 2026-04-14
author: "Ilia Ross"
weight: 4012555
---

### List configuration file revisions from Git

This command lists revisions of configuration files stored in the Git repository
under `/etc/.git`. By default, if you do not pass any other options, it shows
the latest revision of files under the Virtualmin
`/etc/webmin/virtual-server` configuration directory.

{{< alert warning exclamation "" "This command was previously named `list-config-backups`. If you see the older name in changelog entries or examples, use `list-config-revisions` instead." >}}

Use `--module` to limit the search to a single Webmin module, such as
`virtual-server` or `fsdump`. When a module is selected, each `--file` value is
treated as a path relative to that module directory. Without `--module`, file
paths are treated as relative to `/etc`, unless you provide an absolute path.

The `--file` option may be given more than once and can point at a single file,
a directory, or a glob like `domains/*`. By default the command shows only the
most recent revision, but `--depth` can be used to display older revisions as
well.

### Examples

View the latest revision of the Virtualmin module configuration:

```text
virtualmin list-config-revisions
```

View the latest revision of the main Virtualmin config file:

```text
virtualmin list-config-revisions --module virtual-server --file config
```

View the last two revisions of `/etc/hosts` and `/etc/fstab`:

```text
virtualmin list-config-revisions --file hosts --file fstab --depth 2
```

### Command line help

```text
virtualmin list-config-revisions [--depth <n>]
                                 [--file file]*
                                 [--module module]
                                 [--git-repo </path/to/.git>]
```
