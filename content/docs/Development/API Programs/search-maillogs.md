---
title: "search-maillogs"
date: 2024-01-23
weight: 4012855
---

### Searches mail server and procmail logs

This is the command-line equivant of the Search Mail Logs page in the Virtualmin user interface. It can find email messages delivered or relayed through the system by several different criteria, specified by command-line flags.

To search by recipient, use the `--dest` flag followed by an email address, domain name or Unix username. To search by sender, use the `--source` flag followed by a sender's email address.

To limit the search to a particular date range, use the `--start` and/or `--end` flags. Both can be followed by either a date formatted like *2001-09-16*, a date and time like *2001-09-16 17:00*, or an offset in days into the past from the current time like *-5*.

To filter out spam or viruses from the output, use the `--no-spam` or `--no-virus` flags respectively.

By default, the output is in a human-readable table format. To switch to one that shows more details and is more easily parsed by other programs, use the `--multiline` flag.

 ### Command line help

```text
virtualmin search-mailllogs [--start yyyy-mm-dd:hh:mm:ss]
                            [--end yyyy-mm-dd:hh:mm:ss]
                            [--dest domain|user@domain]
                            [--source domain|user@domain]
                            [--multiline]
                            [--no-spam] [--no-virus]
```