---
title: "generate-letsencrypt-cert"
date: 2024-01-23
weight: 4012400
---

### Requests and installs a Let's Encrypt cert for a virtual server

The server must be specified with the `--domain` flag, followed by a domain name. By default the certificate will be the for either previously used hostnames for Let's Encrypt, or the default SSL hostnames for the domain. However, you can specify an alternate list of hostnames with the `--host` flag, which can be given multiple times. Or you can force use of the default SSL hostname list with `--default-hosts`.

If the optional `--renew` flag is given, automatic renewal will be configured to occur when the certificate is close to expiry.

To have Virtualmin attempt to verify external Internet connectivity to your domain before requesting the certificate, use the `--check-first` flag. This will detect common errors before your Let's Encrypt service quota is consumed.

To have Virtualmin perform a local validation check of the domain, use the `--validate-first` flag. This is automatically enabled when `--check-first` is set.

By default, the standard Let's Encrypt service will be used. However, you can use a different ACME-compatible provider with the `--server` flag followed by the provider's API URL. The `--server-key` and `--server-hmac` flags can be used to specify a login to the provider.

By default Virtualmin will attempt to perform an external DNS lookup of all domain names that the certificate is requested for, to make sure they can be resolved by the Let's Encrypt service. To disable this check, use the `--skip-dns-check` flag. Or to forcible enable it because it was disabled for the domain in the UI, use the `--dns-check` flag.

By default both web and DNS validation will be attempted by Let's Encrypt for domain ownership, but you can select just one with either the `--web` or `--dns` flags.
 
### Command line help

```text
virtualmin generate-letsencrypt-cert --domain name
                                    [--host hostname]*
                                    [--default-hosts]
                                    [--renew]
                                    [--size bits]
                                    [--staging]
                                    [--check-first | --validate-first]
                                    [--web | --dns]
                                    [--rsa | --ec]
                                    [--server url]
                                    [--server-key id]
                                    [--server-hmac string]
```
