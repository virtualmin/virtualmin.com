---
title: "create-domain"
subSection: "Virtual Servers"
author: ""
weight: 4012040
---

### Create a virtual server

This program can be used to create a new top-level, child or alias virtual server. It is typically called with parameters something like:

```text
virtualmin create-domain --domain example.com --pass password --desc "example.com top-level server" --unix --dir --webmin --web --ssl --dns --mail --limits-from-plan
```

This would create a server called `example.com` with the Unix login, home directory, Webmin login, website, DNS domain and email features enabled, and disk quotas based on those set in the default plan. If you run this program with the `--help` option, you can see all of the other command-line options that it supports. The most commonly used are those for enabling features for the new server, such as `--mysql` and `--logrotate`.

To create a virtual server with a private IP address, you can use the `--ip` option to specify it explicitly. If your Virtualmin is configured to automatically allocate IP addresses, use the `--allocate-ip` option instead, to have a free address chosen from the allocation ranges. If you want to use a virtual IP that is already active on the system, you must add the `--ip-already` command-line option.

If your system supports IPv6, Virtualmin can also add a IPv6 address for a new virtual server with the `--ip6` flag followed by an address in the correct format. If you have IPv6 allocation enabled in the server templates, instead use the `--allocate-ip6` flag to have Virtualmin select a free address automatically.

To create a server that is owned by an existing user, use the `--parent` option, followed by the name of the virtual server to create under. In this case, the `--pass` , `--unix` , `--webmin` and `--quota` options are not needed, as a user for the new server already exists.

To create an alias of an existing virtual server, use the `--alias` option, followed by the domain name of the target server. For alias servers, the `--pass` , `--unix` , `--webmin` , `--dir` and `--quota` options are not needed. A variation is the `--alias-with-mail` option, which creates an alias virtual server that can still have mailboxes and email aliases.

To create a sub-domain, use the `--subdom` flag followed by the parent domain, which the domain being created must be under. The optional `--subprefix` flag can be used to set the directory under public_html of the parent domain for the sub-domains's HTML files.

You can specify limits on the number of aliases, sub-servers, mailboxes and databases for the new domain owner using the `--max-aliases`, `--max-doms`, `--max-mailboxes` and `--max-dbs` options. Alternately, you can choose to have all limits (including quotas) set based on the plan using the `--limits-from-plan` command line flag.

If the virtual server has the MySQL/MariaDB or PostgreSQL features enabled, by default the password for the server's accounts will be the same as its administration login. However, you can specify a different password with the `--mysql-pass` or `--postgres-pass` flags, each of which are followed by the password to set for that database type. These options are only available for top-level virtual servers though.

If your system supports chroot jails with Jailkit, the `--enable-jail` flag can be used to force all commands run by the domain to execute in a jail. Conversely, this can be turned off with the `--disable-jail` flag.

By default, virtual server creation will be blocked if any warnings are detected, such as an existing database or SSL certificate conflict. These can be overridden with the `--skip-warnings` flag.

If you have configured additional remote (or local) MySQL/MariaDB servers, you can select which one this domain will use with the `--mysql-server` flag followed by a hostname, hostname:port or socket file. Similarly, a remote PostgreSQL server can be selected with the `--postgres-server` flag.

By default, the Cloud DNS provider chosen in the specified template will be used. However, you can override this with the `--cloud-dns` flag followed by either `local` to host locally, `services` to use Cloudmin services, or the ID of one of the supported providers like `route53` or `google`.

Use the `--letsencrypt` flag to request an auto-renewable Let's Encrypt certificate. To do the same but skip connectivity checks, use `--letsencrypt-always` flag instead.

### Command line help

```text
virtualmin create-domain --domain domain.name
                         --pass "password-for-new-domain" |
                         --passfile password-file
                        [--hashpass]
                        [--parent domain.name | --alias domain.name |
                         --alias-with-mail domain.name |
                         --superdom domain.name]
                        [--desc description-for-domain]
                        [--email contact-email]
                        [--user new-unix-user]
                        [--group new-unix-group]
                        [--unix]
                        [--dir]
                        [--dns]
                        [--mail]
                        [--web]
                        [--ssl]
                        [--logrotate]
                        [--mysql]
                        [--spam]
                        [--status]
                        [--webmin]
                        [--virtualmin-awstats]
                        [--default-features] | [--features-from-plan]
                        [--allocate-ip | --ip virtual.ip.address |
                         --shared-ip existing.ip.address]
                        [--ip-already]
                        [--default-ip6 |
                         --shared-ip6 existing.ip.address |
                         --allocate-ip6 |
                         --ip6 virtual.ip.address]
                        [--ip6-already]
                        [--dns-ip address | --no-dns-ip]
                        [--max-doms domains|*]
                        [--max-aliasdoms domains]
                        [--max-realdoms domains]
                        [--max-mailboxes boxes]
                        [--max-dbs databases]
                        [--max-aliases aliases]
                        [--quota quota-for-domain|UNLIMITED]
                        [--uquota quota-for-unix-user|UNLIMITED]
                        [--template "name"]
                        [--plan "name"]
                        [--limits-from-plan]
                        [--suffix username-prefix]
                        [--db database-name]
                        [--fwdto email-address]
                        [--reseller name]
                        [--content text|filename]
                        [--mysql-pass password]
                        [--skip-warnings]
                        [--letsencrypt]
                        [--letsencrypt-always]
                        [--field-name value]*
                        [--enable-jail | --disable-jail]
                        [--mysql-server hostname]
                        [--postgres-server hostname]
                        [--cloud-dns provider|"services"|"local"]
                        [--separate-dns-subdomain |
                         --any-dns-subdomain]
                        [--break-ssl-cert | --link-ssl-cert]
                        [--ssl-redirect]
                        [--generate-ssl-cert]
                        [--generate-ssh-key | --use-ssh-key file|data]
                        [--append-style format]
                        [--shell command]
                        [--subprefix directory]
```
