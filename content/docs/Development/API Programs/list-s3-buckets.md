---
title: "list-s3-buckets"
date: 2024-01-23
weight: 4012480
---

### Lists all buckets owned by an S3 account

This command queries Amazon's S3 service for the list of all buckets owned by an S3 account. The login and password for S3 must be set using the `--access-key` and `--secret-key` flags, unless defaults have been set in the Virtualmin configuration.

By default output is in a human-readable table format, but you can switch to a more parsable output format with the `--multiline` flag. Or to just get a list of filenames, use the `--name-only` flag.

### Command line help

```text
virtualmin list-s3-buckets [--multiline | --name-only]
                           [--bucket name]
                           [--access-key key]
                           [--secret-key key]
```
