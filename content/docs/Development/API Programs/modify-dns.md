---
title: "modify-dns"
date: 2024-01-23
weight: 4012130
---

### Change DNS settings for virtual servers

This program updates DNS-related options for one or more servers, selected using the `--domain` or `--all-domains` flags. Or you can select all domains that don't have their own private IP address with `--all-nonvirt-domains`.

To enable SPF for a domain, using `--spf` option, and to turn it off use `--no-spf`. By default, the SPF record will be created using the settings from the DNS section of the domain's server template.

To add allowed hostname, MX domains or IP addresses, use the `--spf-add-a`, `--spf-add-mx`, `--spf-add-ip4` and `--spf-add-ip6` options respectively. Each of which must be followed by a single host, domain or IP address. Or you can use `--spf-add-include` followed by a domain name who's SPF policy will be included in this one.

Similarly, the `--spf-remove-a`, `--spf-remove-mx`, `--spf-remove-ip4`, `--spf-remove-ip6` and `--spf-remove-include` options will remove the following host, domain or IP address from the allowed list for the specified domains.

To control how SPF treats senders not in the allowed hosts list, use one of the `--spf-all-disallow`, `--spf-all-discourage`, `--spf-all-neutral`, `--spf-all-allow` or `--spf-all-default` parameters.

To enable the DMARC DNS record for a domain, use the `--dmarc` flag - or to disable it, use `--no-dmarc`. The DMARC action for other mail servers to perform can be set with the `--dmarc-policy` flag, and the percentage of messages it should be applied to can be set with `--dmarc-percent`.

This command can also be used to add and remove DNS records from all the selected domains. Adding is done with the `--add-record` flag, which must be followed by a single parameter containing the record name, type and value. Alternately, you can use `--add-record-with-ttl` followed by the name, type, TTL and value. If your cloud DNS provider supports proxy records, you can use the `--add-proxy-record` with the same parameters as `--add-record`.

Conversely, deletion is done with the `--remove-record` flag, followed by a single parameter containing the name and type of the record(s) to delete. You can also optionally include the record values, to disambiguate records with the same name but different values (like MX records).

You can also update an existing record with the `--update-record` flag, which must be followed by two parameters. First is the current name and type, and second is the new name, type and values.  The record addition, modification and deletion flags can be given multiple times.

Similarly, the default TTL for records can be set with the `--ttl` flag followed by a number in seconds. Suffixes like h, m and d are also allowed to specific a TTL in hours, minutes or days. Alternately, the `--all-ttl` flag can be used to set the TTL for all records in the domain.

You can also add or remove slave DNS servers for this domain, assuming that they have already been setup in Webmin's BIND DNS Server module. To add a specific slave host, use the `--add-slave` flag followed by a hostname. Or to add them all, use the `--add-all-slaves` flag.

To remove a single slave host, use the `--remove-slave` command followed by a hostname. Or to remove any slave hosts that are no longer valid (ie. because they were removed from Webmin), use the `--sync-all-slaves` flag.

If your system is on an internal network and made available to the Internet via a router doing NAT, the IP address of a domain in DNS may be different from it's IP on the actual system. To set this, the `--dns-ip` flag can be given, followed by the external IP address to use. To revert to using the real IP in DNS, use `--no-dns-ip` instead. In both cases, the actual DNS records managed by Virtualmin will be updated.

To add TLSA records (for publishing SSL certs) to selected domains, use the `--enable-tlsa` flag. Similarly the `--disable-tlsa` removes them, and the `--sync-tlsa` updates them in domains where they already exist.

If a virtual server is a sub-domain of another server, you can move it's DNS records out into a separate zone file with the `--disable-subdomain` flag. Or if eligible, you can combine the zones with `--enable-subdomain`.

If this domain has a parent domain also hosted on the same system but not sharding the same zone file, you can use the `--add-parent-ds` flags to add required DNSSEC DS records to the parent. Alternately you can use `--remove-parent-ds` to delete them, but this is not recommended as it may break DNSSEC validation.

If you have Cloud DNS providers setup, you can move the domain to one with the `--cloud-dns` flag followed by a provider name like `cloudflare` or `route53`. Alternately the domain can be moved back to local hosting with the flag `--cloud-dns local`.

Similarly, the `--remote-dns` flag followed by a hostname can be used to move this domain to a remote Webmin DNS server, if one is configured. Or to move it back to local hosting, use the `--local-dns` flag.

### Command line help

```text
virtualmin modify-dns --domain name | --all-domains | --all-nonvirt-domains
                     [--spf | --no-spf]
                     [--spf-add-a hostname]*
                     [--spf-add-mx domain]*
                     [--spf-add-ip4 address]*
                     [--spf-add-ip6 address]*
                     [--spf-remove-a hostname]*
                     [--spf-remove-mx domain]*
                     [--spf-remove-ip4 address]*
                     [--spf-remove-ip6 address]*
                     [--spf-all-disallow | --spf-all-discourage |
                      --spf-all-neutral | --spf-all-allow |
                      --spf-all-default]
                     [--dmarc | --no-dmarc]
                     [--dmarc-policy none|quarantine|reject]
                     [--dmarc-percent number]
                     [--add-record "name type value"]
                     [--add-record-with-ttl "name type TTL value"]
                     [--add-proxy-record "name type value"]
                     [--remove-record "name type value"]
                     [--update-record "oldname oldtype" "name type value"]
                     [--ttl seconds | --all-ttl seconds]
                     [--add-slave hostname]* | [--add-all-slaves]
                     [--remove-slave hostname]* | [--sync-all-slaves]
                     [--dns-ip address | --no-dns-ip]
                     [--enable-dnssec | --disable-dnssec]
                     [--enable-tlsa | --disable-tlsa | --sync-tlsa]
                     [--enable-subdomain | --disable-subdomain]
                     [--cloud-dns provider|"local"]
                     [--remote-dns hostname | --local-dns]
                     [--add-parent-ds | --remove-parent-ds]
```
