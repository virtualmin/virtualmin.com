---
title: "set-spam"
date: 2024-01-23
weight: 4012815
---

### Change the spam and virus scanners for all domains

By default, Virtualmin uses the stand-alone ClamAV and SpamAssassin programs for virus and spam scanning, named `clamscan` and `spamassassin` respectively. However, on a system that receives a large amount of email, running these programs for each incoming message can generate significant CPU load.

This command can tell Virtualmin to use the background scanning daemons `clamd` and `spamd` instead, which are faster but consume additional memory as then run all the time. To enable the ClamAV server, run it like so:

```text
virtualmin set-spam --enable-clamd
virtualmin set-spam --use-clamdscan
```

To enable and use the SpamAssassin daemon process, run the commands:

```text
virtualmin set-spam --enable-spamd
virtualmin set-spam --use-spamc
```

However, using `spamc` makes it impossible to have separate per-domain SpamAssassin configurations in Virtualmin.
 
### Command line help

```text
virtualmin set-spam [--use-spamassassin | --use-spamc]
                    [--spamc-host hostname | --no-spamc-host]
                    [--spam-max bytes | --no-spam-max]
                    [--use-clamscan | --use-clamdscan |
                     --use-clamd-stream-client | --use-clamdscan-remote |
                     --use-virus command]
                    [--clamd-host hostname]
                    [--enable-clamd | --disable-clamd]
                    [--enable-spamd | --disable-spamd]
                    [--quota-behavior "queue"|"bounce"]
                    [--show]
```
