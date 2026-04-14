---
title: "restore-config-revision"
date: 2026-04-14
author: "Ilia Ross"
weight: 4012560
---

### Restore configuration files from Git revisions

This command restores configuration files from the Git repository under
`/etc/.git`. The required `--target` flag controls where files are written. If
the target is a normal directory, Virtualmin creates date-stamped
subdirectories so you can inspect or compare multiple revisions without
overwriting live configuration files.

{{< alert warning exclamation "" "This command was previously named `restore-config-backups`. If you see the older name in changelog entries or examples, use `restore-config-revision` instead." >}}

If the target is `/etc`, the selected files are restored directly to the live
system. This is useful for rolling a module or file back to an earlier state,
but it should be used carefully because it overwrites the current files.

Use `--module` to limit the restore to a single Webmin module. When a module is
selected, each `--file` value is treated as relative to that module directory.
Without `--module`, file paths are treated as relative to `/etc`, unless an
absolute path is given. The `--file` option may be repeated for multiple files
or directories.

By default the command restores only the most recent revision. With `--depth`,
older revisions are also considered. When restoring to `/etc`, only the oldest
revision at the selected depth is applied. Use `--dry-run` to preview what
would be restored before writing any files.

### Examples

Restore the latest Virtualmin module revision into a separate directory for
inspection:

```text
virtualmin restore-config-revision --module virtual-server --target /root/config-revisions
```

Preview restoring the last five revisions of the main module config file:

```text
virtualmin restore-config-revision --depth 5 --module virtual-server \
                                   --file config --target /root/config-revisions --dry-run
```

Restore the main module config file from ten revisions ago directly into
`/etc`:

```text
virtualmin restore-config-revision --depth 10 --module virtual-server \
                                   --file config --target /etc/
```

### Command line help

```text
virtualmin restore-config-revision --target <dir> [--dry-run]
                                   [--depth <n>]
                                   [--file file]*
                                   [--module module]
                                   [--git-repo </path/to/.git>]
```
