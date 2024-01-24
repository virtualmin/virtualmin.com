---
title: "get-dns"
date: 2024-01-23
weight: 4012645
---

### Output all DNS records for a domain

For virtual servers with DNS enabled, this command provides an easy way to see what DNS records currently exist. The server is specified with the `--domain` flag, followed by a domain name.

By default, output is in a human-readable table format. However, you can choose to a more easily parsed and complete format with the `--multiline` flag, or get a list of just record names with the `--name-only` option.

Normally the command will output all the DNS records in the domain's zone file, except those used for DNSSEC, but you can request to show only the DNSSEC DS records that should be created in the registrar's zone with the `--ds-records` flag. Or you can choose to have DNSSEC records included in the output with `--dnssec-records`.

By default the command will list all records, but you can limit it to records with a specific name via the `--name` flag. Similarly you can limit by type (A, CNAME, MX, etc) with the `--type` flag.
 
### Command line help

```text
virtualmin get-dns --domain name
                  [--ds-records]
                  [--dnssec-records]
                  [--multiline | --name-only]
                  [--name record-name | --regexp name-pattern]
                  [--type A|AAAA|CNAME|MX|NS|TXT]
```
