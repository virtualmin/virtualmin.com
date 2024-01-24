---
title: "list-gcs-buckets"
date: 2024-01-23
weight: 4012700
---

### Lists all buckets owned by the Google Cloud Storage

This command lists all buckets under the cloud storage account currently configured for use by Virtualmin. However, you can select a specific bucket to show with the `--bucket` flag.

By default output is in a human-readable table format, but you can switch to a more parsable output format with the `--multiline` flag. Or to just get a list of filenames, use the `--name-only` flag.

### Command line help

```text
virtualmin list-gcs-buckets [--multiline | --name-only]
                            [--bucket name]
```
