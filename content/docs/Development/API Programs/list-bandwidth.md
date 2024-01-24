---
title: "list-bandwidth"
date: 2024-01-23
weight: 4012675
---

### Shows bandwidth usage for some domain over a date range

This command is useful for dumping bandwidth data of Virtualmin (usually used to draw graphs) in CSV format for importing into other programs. This is useful for implementing your own billing system, or generating your own graphs.

The domains to dump stats for are selected by either the `--domain` parameter, which can occur multiple times and which must be followed by a virtual server domain name, or `--all-domains` to show them all. To include usage by sub-servers of the selected domains, use the `--include-subservers` flag.

The date range to output stats for are selected with the optional `--start` and `--end` flags, each of which must be followed by a date formatted like `2001-09-16`. If omitted, all available bandwidth information for the domains selected is displayed.

### Command line help

```text
virtualmin list-bandwidth --domain name | --all-domains
                         [--start yyyy-mm-dd]
                         [--end yyyy-mm-dd]
                         [--include-subservers]
```
