---
title: "install-cert"
date: 2024-01-23
weight: 4012405
---

### Replace the SSL certificate or private key for a virtual server

This command is typically used to install a signed certificate that you have received from a CA in response to a signing request, generated with `generate-cert`. However, it can be used to install any certificate, private key or CA certificate file into a virtual server.

The server must be specified with the `--domain` flag, followed by a domain name. When installing a signed cert, you should use the `--cert` flag followed by the path to the certificate file, which will be copied into the virtual server's home directory. You should also use the `--use-newkey` flag to use the key generated at the same time as the CSR.

Alternately, you can install a new matching key and certificate with the `--key` and `--cert` flags. If the key is protected by a passphrase, it must be specified with the `--pass` parameter. Any errors in the key or certificate format or the match between them will cause the command to fail before the web server configuration is updated.

Finally, for virtual servers that have an SSL certificate that is not in use, you can delete it with the `--remove-cert` flag. Be aware that this will delete the key and certificate files permanently! Once this is done, the `generate-cert`, `install-cert` or `generate-letsencrypt-cert` API commands must be used to create a new certificate.

### Command line help

```text
virtualmin install-cert --domain name
                       [--cert file|data]
                       [--key file|data]
                       [--ca file|data]
                       [--csr file|data]
                       [--use-newkey]
                       [--pass key-password]
                       [--remove-cert]
```
