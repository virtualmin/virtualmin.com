---
title: "create-protected-directory"
date: 2024-01-23
weight: 4012860
---

### Adds protection to a directory owned by some virtual server

This command sets up protection for a web directory under a virtual server selected with the `--domain` flag. The directory to protect is set with the `--path` flag, which can be followed by either a full path or one relative to the domain's home directory.

The optional `--desc` flag can be used to set the description for the directory shown when an end user accesses it via a web browser. The password hashing format to use can be changed from the default with one of the flags `--crypt`, `--md5`, `--sha1` or `--digest`.

### Command line help

```text
virtualmin create-protected-directory --domain name
                                      --path directory
                                     [--desc "description"]
                                     [--crypt | --md5 | --sha1 | --digest]
```