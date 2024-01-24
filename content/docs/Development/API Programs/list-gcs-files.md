---
title: "list-gcs-files"
date: 2024-01-23
weight: 4012705
---

### Lists all files in a Google Cloud Storage bucket

This command lists all files in a bucket under the cloud storage account currently configured for use by Virtualmin, specified by the `--bucket` flag.

By default output is in a human-readable table format, but you can switch to a more parsable output format with the `--multiline` flag. Or to just get a list of filenames, use the `--name-only` flag.

### Command line help

```text
virtualmin list-gcs-files [--multiline | --name-only]
                           --bucket name
```
