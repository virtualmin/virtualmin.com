---
title: "check-config"
date: 2024-01-23
weight: 4012565
---

### Run the Virtualmin config check

This program checks your system's Virtualmin configuration, outputting the progress of the check as it goes. If any serious problems are found it will halt and display the error found.

Unlike the **Re-Check Configuration** page in the Virtualmin web UI, it will not perform any system changes triggered by configuration changes, such as updating the Webmin modules available to domain owners.

### Command line help

```text
virtualmin check-config
```
