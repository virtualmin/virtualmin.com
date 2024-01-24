---
title: "enable-domain"
date: 2024-01-23
weight: 4012060
---

### Re-enable one virtual server

This program reverses the disable process done by `disable-domain` , or in the Virtualmin web interface. It will restore the server to the state it was in before being disabled.

To have all sub-servers owned by the same user as the specified server enabled as well, use the `--subservers` flag.

 
### Command line help

```text
virtualmin enable-domain --domain domain.name
                        [--subservers]
```
