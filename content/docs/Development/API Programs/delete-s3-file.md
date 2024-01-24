---
title: "delete-s3-file"
date: 2024-01-23
weight: 4012470
---

### Deletes a single file from an S3 bucket

This command removes a single file from Amazon's S3 service. The login and password for S3 must be set using the `--access-key` and `--secret-key` flags, unless defaults have been set in the Virtualmin configuration.

The `--bucket` flag must be given to specify the bucket the file is stored in, and the `--file` flag to choose the filename.
 
### Command line help

```text
virtualmin delete-s3-file [--access-key key]
                          [--secret-key key]
                           --bucket name
                           --file remote-file
```
