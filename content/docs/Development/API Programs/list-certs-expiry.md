---
title: "list-certs-expiry"
date: 2024-01-23
weight: 4012393
---

### Output the certificates expiry date for matching or all existing virtual servers

This program can be used to print SSL expiry dates for all existing domains. The following output controls available :

 `--all-domains` - All existing domains

 `--domain` - Domain name or a regex to match

 `--sort` - Select a column to sort on, either expiry date or domain name

 `--sort-order` - Sort order applied to selected column, either ascending or descending

Required Perl dependencies `Text::ASCIITable` and `Time::Piece` will be automatically installed if missing
 
### Command line help

```text
virtualmin list-certs-expiry --all-domains | --domain regex
                            [--sort [expiry|name]
                            [--sort-order [asc|desc]
```
