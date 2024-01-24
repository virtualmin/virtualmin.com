---
title: "list-php-versions"
date: 2024-01-23
weight: 4012720
---

### Lists the available PHP versions on this system

This command simply outputs a table of the installed PHP versions on your system. Use the `--name-only` flag to limit the output to version numbers only, or `--multiline` to show more details. By default only the base version numbers are shown, but you can switch to showing the complete version with the `--full-version` flag.

By default all versions available on the system will be shown, but you can limit the list to those available for one virtual server with the `--domain` flag.

### Command line help

```text
virtualmin list-php-versions [--name-only | --multiline]
                             [--domain name]
                             [--full-version]
```
