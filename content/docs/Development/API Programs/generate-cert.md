---
title: "generate-cert"
date: 2024-01-23
weight: 4012395
---

### Generate a new self-signed cert or CSR for a virtual server

A self-signed certificate is one that can be used immediately to protect a virtual server with SSL, but is not validated by a certificate authority. As such, browsers will typically warn the user that it cannot be validated, and thus provides not protection against man-in-the-middle attacks. All Virtualmin server with SSL enabled have a self-signed cert by default, but this command can be used to create a new one, perhaps with different hostnames or more information about the owner.

The virtual server to create a cert for must be specified with the `--domain` parameter, followed by a domain name. You must also supply the `--self` flag, to indicate that a self-signed cert is being created. Additional details about the certificate's owner can be set with the following optional flags:

`--o` - Followed by the name of the organization or person who owns the domain.

`--ou` - Sets the department or group within the organization.

`--c` - Sets the country.

`--st` - Sets the state or province.

`--l` - Sets the city or locality.

`--email` - Sets the contact email address.

`--cn` - Specifies the domain name in the certificate.

When run, the command will create certificate and private key files, and configure Apache to use them. Any existing files will be overwritten.

By default the certificate will use the hash format (SHA1 or SHA2) set on the Virtualmin Configuration page. However, to force a particular format like the more secure SHA2, you can use the `--sha2` flag. Or you can request creation of an Elliptic Curve certificate with the `--ec` flag.

This command can also create a CSR, or certificate signing request. This is a file that is sent to a certificate authority like Verisign or Thawte along with payment and a request to validate the owner of a domain. The command is run in the same way, except that the `--csr` flag is used instead of `--self`, and the generated files are different.

Once the CA has validated the certificate, they will send you back a signed cert that can be installed using the `install-cert` command or the Virtualmin web interface.

### Command line help

```text
virtualmin generate-cert --domain name
                         --self | --csr
                        [--size bits]
                        [--days expiry-days]
                        [--cn domain-name]
                        [--c country]
                        [--st state]
                        [--l city]
                        [--o organization]
                        [--ou organization-unit]
                        [--email email-address]
                        [--alt alternate-domain-name]*
                        [--sha2 | --sha1 | --ec]
```
