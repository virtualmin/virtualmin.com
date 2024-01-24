---
title: "run-all-webalizer"
date: 2024-01-23
weight: 4012790
---

### Run Webalizer reports for all virtual servers

This is designed to be called from Cron, instead of Virtualmin's regular per-domain `/etc/webmin/webalizer/webalizer.pl` script, which can generate a lot of load if more than one copy runs at the same time. If you decide to use it, change the **Setup Webalizer Cron job for each virtual server?** option to **No** on the **Module Config** page.
 
### Command line help

```text
virtualmin run-all-webalizer
```
