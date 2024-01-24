---
title: "delete-s3-bucket"
date: 2024-01-23
weight: 4012465
---

### Deletes an entire S3 bucket

This command removes a bucket from Amazon's S3 service. The login and password for S3 must be set using the `--access-key` and `--secret-key` flags, unless defaults have been set in the Virtualmin configuration.

The `--bucket` flag must be given to specify the bucket to be removed. To have files in the bucket removed as well, use the `--recursive` flag.

### Command line help

```text
virtualmin delete-s3-bucket [--access-key key]
                            [--secret-key key]
                             --bucket name
                            [--recursive]
```
