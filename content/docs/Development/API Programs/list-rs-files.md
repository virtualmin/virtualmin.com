---
title: "list-rs-files"
date: 2024-01-23
weight: 4012520
---

### Lists all files in a container owned by a Rackspace account

This command queries Rackspace's cloud files for the list of all files in some container owned by a user. The login and API key for Rackspace must be set using the `--user` and `--key` flags, unless defaults have been set in the Virtualmin configuration. The container name must be specified with the `--container` flag.

By default output is in a human-readable table format, but you can switch to a more parsable output format with the `--multiline` flag. Or to just get a list of filenames, use the `--name-only` flag.
 
### Command line help

```text
virtualmin list-rs-files [--multiline | --name-only]
                         [--user username]
                         [--key api-key]
                          --container name
```
