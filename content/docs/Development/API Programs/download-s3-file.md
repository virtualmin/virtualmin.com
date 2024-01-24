---
title: "download-s3-file"
date: 2024-01-23
weight: 4012475
---

### Downloads a single file from an S3 bucket

This command downloads a single file from Amazon's S3 service to your Virtualmin system. The login and password for S3 must be set using the `--access-key` and `--secret-key` flags, unless defaults have been set in the Virtualmin configuration.

The `--bucket` flag must be given to specify the bucket containing the file, the `--dest` flag to choose the local file to write, and the `--file` flag to set the source filename.
 
### Command line help

```text
virtualmin download-s3-file [--access-key key]
                            [--secret-key key]
                             --dest local-file
                             --bucket name
                            [--file remote-file]
```
