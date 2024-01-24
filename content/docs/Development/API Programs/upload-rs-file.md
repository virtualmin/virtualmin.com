---
title: "upload-rs-file"
date: 2024-01-23
weight: 4012525
---

### Uploads a single file to a Rackspace container

This command uploads a file from your Virtualmin system to Rackspace's Cloud Files service. The login and API key for Rackspace must be set using the `--user` and `--key` flags, unless defaults have been set in the Virtualmin configuration.

The `--container` flag must be given to specify the container to store the file in, the `--source` flag to choose the file to upload, and the `--file` flag to set the destination filename.

The optional `--multipart` flag can be used to force a multi-part upload. Otherwise only files above 2GB will be uploaded using Rackspace's multi-part upload protocol.

### Command line help

```text
virtualmin upload-rs-file [--user name]
                          [--key key]
                           --source local-file
                           --container name
                          [--file remote-file]
                          [--multipart]
```
