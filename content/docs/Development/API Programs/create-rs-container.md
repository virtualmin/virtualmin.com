---
title: "create-rs-container"
date: 2024-01-23
weight: 4012495
---

### Creates a new empty Rackspace container

This command creates a new container (directory) on Rackspace's Cloud Files service. The login and API key for Rackspace must be set using the `--user` and `--key` flags, unless defaults have been set in the Virtualmin configuration.

The `--container` flag must be given to specify the name of the container to create.

### Command line help

```text
virtualmin create-rs-container [--user name]
                               [--key key]
                                --container name
```
