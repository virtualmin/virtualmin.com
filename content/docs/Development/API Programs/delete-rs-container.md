---
title: "delete-rs-container"
date: 2024-01-23
weight: 4012500
---

### Deletes an existing Rackspace container

This command deletes a container (directory) from Rackspace's Cloud Files service. The login and API key for Rackspace must be set using the `--user` and `--key` flags, unless defaults have been set in the Virtualmin configuration.

The `--container` flag must be given to specify the name of the container to remove. The optional `--recursive` flag tells the command to delete all files in the container first.

### Command line help

```text
virtualmin delete-rs-container [--user name]
                               [--key key]
                                --container name
                               [--recursive]
```
