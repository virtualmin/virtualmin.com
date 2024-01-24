---
title: "modify-admin"
date: 2024-01-23
weight: 4012265
---

### Updates an extra administrator for a virtual server

This program can be used to change the details of an extra administrator. The required parameters are `--domain` followed by the domain name, and `--name` followed by the administrator account name, which specify the account to change.

You can then use the `--pass` parameter to set a new password, `--desc` to change the description, and `--newname` to change the login name. The admin can be allowed to denied the ability to create servers, rename domains, manage features and use other Webmin modules with the `--can-create`, `--cannot-create`, `--can-rename`, `--cannot-rename`, `--can-features`, `--cannot-features`, `--can-modules` and `--cannot-modules` options respectively.

The extra admin's contact email address can be set or changed with the `--email` flag followed by an address, or removed with the `--no-email` parameter.

Editing capabilities can be granted to the user with the `--can-edit` option followed by a capability name. Similarly, they can be taken away with the `--cannot-edit` option.

To add a domain to the list of those an extra administrator is allowed to manage, use the `--add-domain` flag followed by a domain name. If all virtual servers are currently allowed, this will restrict the extra admin to just that virtual server.

To remove a server from the allowed list, use the `--remove-domain` parameter followed by the domain name. To grant access to all virtual servers under the parent server, use the `--all-domains` flag.

### Command line help

```text
virtualmin modify-admin --domain domain.name
                        --name login
                       [--newname login]
                       [--pass password | --passfile password-file]
                       [--desc description]
                       [--email user@domain | --no-email]
                       [--can-create] | [--cannot-create]
                       [--can-rename] | [--cannot-rename]
                       [--can-features] | [--cannot-features]
                       [--can-modules] | [--cannot-modules]
                       [--can-edit capability]*
                       [--cannot-edit capability]*
                       [--all-domains]
                       [--add-domain name]* [--remove-domain name]*
```
