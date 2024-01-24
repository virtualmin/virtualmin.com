---
title: "test-imap"
date: 2024-01-23
weight: 4012825
---

### Checks if IMAP login to some server works

This is a tool for testing IMAP servers. It takes `--server`, `--user` and `--pass` flags, followed by the IMAP hostname, login and password respectively. The optional `--folder` flag can be used to select an IMAP folder other than the inbox.

To connect to a different IMAP server port, use the `--port` flag followed by a port number. To make an SSL connection, use the `--ssl` flag.

### Command line help

```text
virtualmin test-imap --user login
                    [--pass password]
                    [--server hostname]
                    [--port number|name]
                    [--ssl]
                    [--folder name]
```
