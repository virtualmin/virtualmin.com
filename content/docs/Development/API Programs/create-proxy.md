---
title: "create-proxy"
subSection: "Proxies and Balancers"
date: 2024-01-23
weight: 4012355
---

### Adds a per-directory proxy to some domain

A proxy maps some URL on a virtual server to another webserver. This means that requests for any page under that URL path will be forwarded to the other site, which could be a separate machine or another webserver process on the same system.

The `--domain` parameter must be given and followed by a virtual server's domain name. The `--path` parameter is also mandatory, and must be followed by a local URL path like `/app` or even `/`. Finally, you must give the `--url` parameter, followed by a URL to forward to like `http://www.foo.com`.

If running Apache 2.0 or later with the `mod_proxy_balancer` module, the `--url` parameter can be given multiple times. Your webserver will then round-robin balance requests between all the URLs, which should serve the same content. This is useful for load-balancing between multiple backend servers.

If you want to turn off proxying for some URL path, the `--no-proxy` flag can be given instead of `--url`. This is useful if you have proxying enabled for `/` but want to serve content for some sub-directory locally.
 
### Command line help

```text
virtualmin create-proxy --domain domain.name
                        --path url-path
                        --url destination [--url destination]*
                       [--balancer name]
                        --no-proxy
```
