---
title: "delete-protected-directory"
date: 2024-01-23
weight: 4012865
---

### Removes protection from a directory owned by some virtual server

This command turns off protection for a web directory, and removes all users with access to it. The virtual server that owns the directory must be specified with the `--domain` flag, and the directory path (which can be relative to public_html) with the `--path` flag.

### Command line help

```text
virtualmin delete-protected-directory --domain name
                                      --path directory
```
