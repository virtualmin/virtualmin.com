---
title: "delete-php-directory"
subSection: "PHP Versions"
date: 2024-01-23
weight: 4012375
---

### Remove any custom version of PHP for some directory

If a specific version of PHP has been configured for some directory, it can be removed with this command. The required parameters are `--domain` followed by a domain name, and `--dir` followed by a full directory, for example:

```text
virtualmin delete-php-directory --domain example.com --dir /home/example/public_html/drupal
```

### Command line help

```text
virtualmin delete-php-directory --domain domain.name
                                --dir directory|url-path
```
