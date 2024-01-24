---
title: "upload-s3-file"
date: 2024-01-23
weight: 4012490
---

### Uploads a single file to an S3 bucket

This command uploads a file from your Virtualmin system to Amazon's S3 service. The login and password for S3 must be set using the `--access-key` and `--secret-key` flags, unless defaults have been set in the Virtualmin configuration.

The `--bucket` flag must be given to specify the bucket to store the file in, the `--source` flag to choose the file to upload, and the `--file` flag to set the destination filename. The optional `--rrs` flag can be used to tell S3 that the file should be stored with reduced redundancy, which is cheaper but has a lower reliability SLA.

By default, this command will perform a multi-part S3 upload only for files above 2GB in size. However, you can force multi-part mode with the `--multipart` flag. Amazon requires that files above 5GB in size be multi-part uploaded.

By default each S3 operation will only be tried once. However, you can use the `--tries` flag to have Virtualmin re-try failed operations some number of times.

### Command line help

```text
virtualmin upload-s3-file [--access-key key]
                          [--secret-key key]
                           --source local-file
                           --bucket name
                          [--file remote-file]
                          [--rrs]
                          [--multipart]
                          [--tries count]

```
