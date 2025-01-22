---
title: "create-redirect"
date: 2024-01-23
weight: 4012585
---

### Adds a web redirect or alias to some domain

A redirect maps some URL path like /foo to either a different URL, or a different directory on the same virtual server. This can be used to provide more friendly URL paths on your website, or to cope with the movement of web pages to new locations.

This command takes a mandatory `--domain` parameter, followed by a virtual server's domain name. The `--path` parameter is also mandatory, and must be followed by a local URL path like `/app` or even `/`.

To redirect to a different URL, use the `--redirect` flag followed by a complete URL starting with http or https, or a URL path on this same domain. To map the path to a directory, use the `--alias` flag followed by a full directory path, ideally under the domain's `public_html` directory.

By default, requests for sub-paths under the URL path will be mapped to the same sub-path in the destination directory or path. However, you can use the `--exact` flag to only match the given path, or the `--regexp` flag to ignore sub-paths when redirecting.

For domains with both non-SSL and SSL websites, you can use the `--http` and `--https` flags to limit the alias or redirect to one website type or the other.

To set a custom HTTP status code for the redirect, you can use the `--code` flag followed by a number. Otherwise the default code of 302 (temporary redirect) will be used.

### Command line help

```text
virtualmin create-redirect --domain domain.name
                           --path url-path
                           --alias directory | --redirect url
                          [--regexp | --exact]
                          [--code number]
                          [--http | --https]
```
