---
title: "set-global-feature"
date: 2024-01-23
weight: 4012805
---

### Turns on or off some Virtualmin feature or plugin globally

This command is the equivalent of the Features and Plugins page in the Virtualmin user interface, as it can be used to enable or disable features and plugins globally. To activate a feature, use the `--enable-feature` flag followed by a code like `web` or `ftp`, as shown by the `list-features` API command. To turn off a feature, use the `--disable-feature` flag. In both cases, dependencies will be checked before a change is made, to prevent enabling of features that have missing pre-requisites, or disabling of features that are currently in use.

To control if a feature or plugin is enabled by default for new domains, use the `--default-on` or `--default-off` flags followed by a feature code. Features that are not globally enabled cannot be turned on by default.
 
### Command line help

```text
virtualmin set-global-feature --enable-feature name
                              --disable-feature name
                              --default-on name
                              --default-off name
```
