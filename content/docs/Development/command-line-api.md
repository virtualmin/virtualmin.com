---
title: "Command Line API"
author: "Ilia Ross"
weight: 4010000
---

Virtualmin includes a powerful `virtualmin` command-line script, that can be run from the Unix shell providing nearly all the functionality available in the web interface, facilitating automated management of servers, users, databases, and more. 

### Key points of the command-line script

- **Command format**  
    The first parameter to the `virtualmin` command is the operation, like `create-domain`, followed by additional parameters specific to the operation, typically in the format `--domain foo.com`.
- **Administrator access required**  
    The script must be run as _root_ due to its need for system-level access. For non-_root_ usage, refer to the Remote API documentation.
- **Success and failure indicators**  
    Operations output messages indicating their outcome, with the exit status (0 for success, non-zero for failure) serving as a reliable indicator.
- **Help options**  
    Use `help` with any operation for detailed parameter information, or run `virtualmin help` for a list of all commands or `virtualmin help command` for specifics on a command.

### Example usage

These command line snippets for Virtualmin can be put into a text file and executed as a shell script for various administrative tasks on a Virtualmin server.

#### List all users, their plan, and email address
```sh
#!/bin/sh
virtualmin list-plans --name-only | while read plan; do
    echo $plan
    echo "------------------------------"
    virtualmin list-domains --multiline --toplevel --plan "$plan" | grep -e '^\S' -e "Contact email:" | sed -e 's/Contact email: //'
    echo
done
```

#### Regenerate apache `VirtualHost` information

Update Apache `VirtualHost` configuration using the latest template data:
```sh
#!/bin/sh
doms=`virtualmin list-domains --with-feature web --name-only`
for dom in $doms; do
  virtualmin disable-feature --domain $dom --web --ssl --status --logrotate
  virtualmin enable-feature --domain $dom --web --ssl --status --logrotate
done
```

#### Convert server to store logs in `/var/log/virtualmin/`
```sh
#!/bin/sh
mkdir /var/log/virtualmin/
for dom in `virtualmin list-domains --with-feature web --name-only`; do
  virtualmin disable-writelogs --domain $dom
  virtualmin modify-web --domain $dom --access-log /var/log/virtualmin/${dom}_access_log
  virtualmin modify-web --domain $dom --error-log /var/log/virtualmin/${dom}_error_log
done
```

#### Reset passwords for all virtual server owners

Batch reset passwords for all top-level domain owners:
```sh
#!/bin/sh
for dom in `virtualmin list-domains --name-only --toplevel`; do
  virtualmin modify-domain --domain $dom --pass password
done
```

#### Reset passwords for all email, FTP, and database users
```sh
#!/bin/sh
for dom in `virtualmin list-domains --name-only`; do
    for user in `virtualmin list-users --domain $dom --name-only`; do
        virtualmin modify-user --user $user --domain $dom --pass password
    done
done
```

#### Reset passwords for all users, providing auto-generated password
```sh
#!/bin/sh
virtualmin reset-pass --all-domains
```

#### List all domains and their owners (using domains config)
```sh
#!/bin/sh
for dom in /etc/webmin/virtual-server/domains/* ; do
    cat "$dom" | sort -t: -k2,2 | grep -E --no-filename '^dom=|^pass=|^user=' ; echo ;
done
```

#### Backup all virtual servers
```sh
#!/bin/sh
virtualmin backup-domain --all-domains --all-features --newformat --dest /backup
```

#### Enable Postfix SNI for a domain
```sh
#!/bin/sh
virtualmin install-service-cert --domain example.com --add-domain --service postfix
```

#### Reset Dovecot SNI for all domains
```sh
#!/bin/sh
for dom in `virtualmin list-domains --name-only --with-ssl`; do
    virtualmin install-service-cert --domain $dom --remove-domain --service dovecot
    virtualmin install-service-cert --domain $dom --add-domain --service dovecot
done
```

#### Break and re-create the linkage for the SSL sharing
```sh
#!/bin/sh
virtualmin modify-web --domain example.com --break-ssl-cert
virtualmin modify-web --domain example.com --link-ssl-cert
```

#### Generate a new self-signed certificate
```sh
#!/bin/sh
virtualmin generate-cert --domain example.com --self
```

#### Request a Let’s Encrypt certificate
```sh
#!/bin/sh
virtualmin generate-letsencrypt-cert --domain example.com
```

#### Renew a Let’s Encrypt certificate
```sh
#!/bin/sh
virtualmin generate-letsencrypt-cert --domain example.com --renew
```

#### Migrate cPanel backup
```sh
#!/bin/sh
virtualmin migrate-domain --type cpanel --source /path/to/backup.tar.gz
```

#### Restore Virtualmin domain config file
```sh
#!/bin/sh
virtualmin restore-domain --source /path/to/example.com.tar.gz --domain example.com --feature virtualmin --fix
```
