---
title: "create-admin"
subSection: "Extra Administrators"
date: 2024-01-23
weight: 4012255
---

### Creates an extra administrator for a virtual server

This command creates a new administrator associated with an existing virtual server. You must supply the `--domain` parameter to specify the server and `--name` to set the admin login name. The `--pass` and `--desc` options should also be given, to specify the initial password and a description for the account respectively. To specify a contact email address for the admin, use the `--email` flag followed by the address.

Basic permissions for the account can be added using the `--create`, `--rename`, `--features` and `--modules` parameters. These allow the admin to create new servers, rename servers, use Webmin modules for server features, and use other Webmin modules, respectively.

The extra admin's editing capabilities for virtual servers can be set using the `--edit` parameter, followed by a capability name, like users or aliases. This can be given multiple times, as in the command below:

```text
virtualmin create-admin --domain example.com --name admin1 --pass password --desc `Extra administrator` --edit users --edit aliases
```

That command would create an extra administrator account who can only edit mail users and mail aliases in the virtual server `example.com` and any sub-servers.

By default, the extra administrator will have access to all virtual servers owned by the top-level server it is created in. However, this can be restricted using the `--allowed-domain` flag followed by a domain name, to which the admin will be limited to. It can be given multiple times to allow access to more than one virtual server.

### Command line help

```text
virtualmin create-admin --domain domain.name
                        --name login
                       [--pass password | --passfile password-file]
                       [--desc description]
                       [--email user@domain]
                       [--create] [--rename]
                       [--features] [--modules]
                       [--edit capability]*
                       [--allowed-domain domain]*
```
