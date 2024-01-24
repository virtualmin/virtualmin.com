---
title: "create-s3-bucket"
subSection: "Amazon S3"
date: 2024-01-23
weight: 4012460
---

### Creates a new S3 bucket

This command adds a bucket to Amazon's S3 service. The login and password for S3 must be set using the `--access-key` and `--secret-key` flags, unless defaults have been set in the Virtualmin configuration. The `--bucket` flag must be given to specify the bucket to created.

### Command line help

```text
virtualmin create-s3-bucket [--access-key key]
                            [--secret-key key]
                             --bucket name
```
