---
title: "install-service-cert"
date: 2024-01-23
weight: 4012410
---

### Copy the cert and key from a virtual server to some other service

The domain to copy the cert from is specified with the `--domain` flag followed by a virtual server name. The services (like `dovecot`, `postfix`, `mysql`, `webmin` or `usermin`) to copy it to are set with the `--service` flag, which can be given multiple times.

If the `--add-global` flag is given, the cert will be used as the default for the selected servers. But if `--add-domain` is given, it will only be used for requests to the servers on the domain's hostname or IP address. When configured, the per-domain cert will be used in favor of the global default cert for each service, when a client connects using that domain name.

Finally, the `--remove-domain` flag will remove any per-domain cert for the service, causing the global default to be used instead.
 
### Command line help

```text
virtualmin install-service-cert --domain name
                                --add-global | --add-domain | --remove-domain
                               [--service type]+
```
