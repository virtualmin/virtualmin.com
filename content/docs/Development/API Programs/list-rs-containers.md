---
title: "list-rs-containers"
date: 2024-01-23
weight: 4012515
---

### Lists all containers owned by a Rackspace account

This command queries Rackspace's cloud files for the list of all containers owned by a user. The login and API key for Rackspace must be set using the `--user` and `--key` flags, unless defaults have been set in the Virtualmin configuration.

By default output is in a human-readable table format, but you can switch to a more parsable output format with the `--multiline` flag. Or to just get a list of filenames, use the `--name-only` flag.
 
### Command line help

```text
virtualmin list-rs-containers [--multiline | --name-only]
                              [--user username]
                              [--key api-key]
```
