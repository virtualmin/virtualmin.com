---
title: "modify-proxy"
date: 2024-01-23
weight: 4012365
---

### Changes a proxy balancer from some domain

This command updates one proxy path from the virtual server identified by the `--domain` flag. The proxy to remove must be identified by the `--path` parameter.

The URL path for the proxy can be changed with the `--new-path` flag, followed by a path like `/foo`. The destination URLs can be set with the `--url` flag followed by a URL, which can be given multiple times.

### Command line help

```text
virtualmin modify-proxy --domain domain.name
                        --path url-path
                       [--new-path url-path]
                       [--no-proxy]
                       [--url http://some-url]*
```
