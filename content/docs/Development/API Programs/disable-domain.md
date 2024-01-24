---
title: "disable-domain"
date: 2024-01-23
weight: 4012055
---

### Temporarily disable a virtual server

 When a server is disabled, it will become temporarily unavailable without being completely deleted. This program can be used to disable one server, specified with the `--domain` option. The exact features that will be disabled for the server are set on the module configuration page.

 The optional `--why` parameter can be followed by a description explaining why the domain has been disabled, which will be shown when anyone tries to edit it in Virtualmin.

 To have all sub-servers owned by the same user as the specified server disabled as well, use the `--subservers` flag.
 
### Command line help

```text
virtualmin disable-domain --domain domain.name
                         [--why "explanation for disable"]
                         [--subservers]
```
