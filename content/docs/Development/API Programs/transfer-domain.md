---
title: "transfer-domain"
date: 2024-01-23
weight: 4012090
---

### Move a virtual server to another system

This command copies or moves a virtual server to another system, which must also run Virtualmin. The server to move is specified with the `--domain` flag, and if a top-level server is given all sub-servers will be moved along with it.

By default, the transfer to the new system is done via SSH. However, you can switch to using the Webmin RPC protocol with the `--webmin` flag. The target system is set with the `--host` flag follow by the hostname or IP of a system that is reachable via the chosen protocol. If the `root` user requires a password to login, the `--pass` flag must also be given.

By default the domain is simply copied to the target system using Virtualmin's backup and restore functions. However, if the `--delete` flag is given it will be remove from this system after being copied. Alternately, the `--disable` flag can be used to disable the domain on the source system without completely removing it.

If you are using this command to replicate a domain to another system that shared home directories, a MySQL server or users (via LDAP) with this system, the `--replication` flag is recommended to prevent the remote system from un-necessarily overwriting shared data.

If the `--overwrite` flag is not given, this command will fail if the domain already exists on the destination system. If you do expect it to exist, the `--delete-missing-files` flag will cause the restore to remove from the destination domain any files that are not included in the backup.

When transferring a domain with a private IP address and you want a new address allocated on the destination system, use the `--allocate-ip` flag.

### Command line help

```text
virtualmin transfer-domain --domain domain.name
                           --host hostname
                          [--pass password]
                          [--webmin | --ssh]
                          [--disable | --delete]
                          [--overwrite]
                          [--delete-missing-files]
                          [--replication]
                          [--allocate-ip]
                          [--output]
```
