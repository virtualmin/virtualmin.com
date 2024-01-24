---
title: "delete-rs-file"
date: 2024-01-23
weight: 4012505
---

### Deletes a single file from a Rackspace container

This command deletes a file from Rackspace's Cloud Files service. The login and API key for Rackspace must be set using the `--user` and `--key` flags, unless defaults have been set in the Virtualmin configuration.

The `--container` flag must be given to specify the container the file is stored in, and the `--file` flag to determine the name of the file to remove.
 
### Command line help

```text
virtualmin delete-rs-file [--user name]
                          [--key key]
                           --container name
                           --file remote-file
```
