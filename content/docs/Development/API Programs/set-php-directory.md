---
title: "set-php-directory"
date: 2024-01-23
weight: 4012380
---

### Set the version of PHP to run in some directory

If more than one version of PHP is installed on your system and either CGI or fCGId is used to run PHP scripts in some virtual server, it can be configured to run a different PHP version on a per-directory basis. This is most useful when running PHP applications that only support specific versions.

To set a PHP directory, the `--domain` flag must be used to specify the directory, `--dir` to set the path and `--version` to set the version number.

For example:

```text
virtualmin set-php-directory --domain example.com --dir /home/example/public_html/drupal --version 8.1
```

### Command line help

```text
virtualmin set-php-directory --domain domain.name
                             --dir directory|url-path|"."
                             --version num

```
