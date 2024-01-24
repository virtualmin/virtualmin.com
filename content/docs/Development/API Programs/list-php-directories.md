---
title: "list-php-directories"
date: 2024-01-23
weight: 4012385
---

### List all directories in which a specific version of PHP has been activated

By default this command outputs a table of directories for the virtual server specified with the `--domain` parameter. However, the `--multiline` flag can be used to output more detail about each directory in a format more easily parsed by other programs. Or if you just want a list of directories, use the `--name-only` flag.

By default only the base version numbers are shown, but you can switch to showing the complete version with the `--full-version` flag.
 
### Command line help

```text
virtualmin list-php-directories --domain domain.name
                               [--multiline | --name-only]
                               [--full-version]
```
