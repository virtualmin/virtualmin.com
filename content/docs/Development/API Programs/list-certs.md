---
title: "list-certs"
subSection: "SSL Certificates"
date: 2024-01-23
weight: 4012390
---

### Output the certificates for some or all virtual servers

The virtual servers to list can be selected with the `--domain` flag followed by a domain name, or `--user` followed by an administrator's username - both of which can be given multiple times. Or you can use `--all-domains` to find certificates for every virtual server with SSL enabled.

By default, all known certificates and keys are output. However, you can limit the results to particular certificates with one of more of the following flags:

`--cert` - SSL certificate only

`--key` - SSL private key

`--ca` - SSL chained CA certificate, if there is one

`--csr` - SSL certificate signing request, for sending to a CA

`--newkey` - SSL private key matching the CSR, but not yet installed

 
### Command line help

```text
virtualmin list-certs --all-domains | --domain name | --user username
                     [--cert | --key | --ca | --csr | --newkey]

```
