---
title: "set-dkim"
date: 2024-01-23
weight: 4012800
---

### Enable or disable DKIM for all domains

To enable DKIM signing of outdoing emails, run this command with the `--enable` flag. Conversely, to turn it off use the `--disable`. A default key size and selector will be used when DKIM is enabled for the first time, unless specified with the `--size` and `--selector` flags.

By default incoming email will not be checked for a valid DKIM signature unless the `--verify` flag is given. To turn off verification, use the `--no-verify` flag instead.

Virtualmin enables DKIM for all virtual servers with email and DNS features, but you can add extra domains to sign for with the `--add-dkim` flag followed by a domain name. Similarly you can remove an extra domain with the `--remove-extra` flag.

### Command line help

```text
virtualmin set-dkim [--enable | --disable]
                    [--select name]
                    [--size bits]
                    [--verify | --no-verify]
                    [--add-extra domain]*
                    [--remove-extra domain]*
```
