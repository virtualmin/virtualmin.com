---
title: "list-dropbox-files"
date: 2024-01-23
weight: 4012690
---

### Lists all files under a Dropbox path

This command lists all files under a path owner by the cloud storage account currently configured for use by Virtualmin, specified by the `--path` flag.

By default output is in a human-readable table format, but you can switch to a more parsable output format with the `--multiline` flag. Or to just get a list of filenames, use the `--name-only` flag.
 
### Command line help

```text
virtualmin list-dropbox-files [--multiline | --name-only]
                              [--path dir]
```
