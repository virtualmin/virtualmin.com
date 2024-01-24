---
title: "get-logs"
date: 2024-01-23
weight: 4012650
---

### Output webserver logs for a domain

Given a domain name with the `--domain` flag, this command outputs some or all of it's Apache access or error log. The log file to display can be selected with the `--access-log`, `--error-log` or `--ftp-log` flag, and the number of lines to output can be limited with the `--tail` flag followed by a line count.

### Command line help

```text
virtualmin get-logs --domain name
                    --access-log | --error-log | --ftp-log
                   [--tail lines]
```
