---
title: "download-rs-file"
date: 2024-01-23
weight: 4012510
---

### Downloads a single file from a Rackspace container

This command downloads a file to your Virtualmin system from Rackspace's Cloud Files service. The login and API key for Rackspace must be set using the `--user` and `--key` flags, unless defaults have been set in the Virtualmin configuration.

The `--container` flag must be given to specify the container the file is stored in, the `--dest` flag to choose the file to file, and the `--file` flag to set the source filename.

### Command line help

 ```text
virtualmin download-rs-file [--user name]
                            [--key key]
                            --dest local-file
                            --container name
                            --file remote-file
```
