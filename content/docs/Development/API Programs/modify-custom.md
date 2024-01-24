---
title: "modify-custom"
date: 2024-01-23
weight: 4012280
---

### Modify custom fields for a virtual server

This program updates the value of one or more fields for a single virtual server. The parameter `--domain` must be given, and must be followed by the domain name of the server to update. You must also supply the `--set` parameter at least once, which has to be followed by the code for the field to update and the new value.

For menu-type custom fields, the value must be the underlying value, not the one that is displayed to the user. For `yes` and `no` fields, the value must be either `1` or `0` respectively.

### Command line help

```text
virtualmin modify-custom --domain name
                        <--set "field value">+
```
