---
title: "modify-spam"
date: 2024-01-23
weight: 4012135
---

### Change spam filtering and delivery settings for a virtual server

This command can be used to change the location than email tagged as spam or virus-laden is delivered to for one or more virtual servers. The servers to act on can be either specified with the `--domain` parameter, or all domains with spam filtering enabled can be selected with `--all-domains`.

The following parameters control what happens to messages identified as spam:

`--spam-delete` - Delete all spam mail

`--spam-deliver` - Deliver to user's mailbox normally

`--spam-mailfile`- Write to user's `~/mail/spam` file in `mbox` format

`--spam-maildir` - Write to user's `~/Maildir/.spam` file in `Maildir` format

`--spam-file` - Write to the file following this parameter, which must be relative to the user's home directory

`--spam-email` - Forward to the email address following this parameter

`--spam-dest` - Write to the absolute file following the parameter

A similar set of options exist for virus filtering, but starting with `--virus` instead of `--spam`.

Virtualmin has the ability to delete spam from the spam folders of all users in a domain once it passes some threshold, such as age or size. You can enable this with the `--spamclear-days` parameter followed by the maximum age in days, or `--spamclear-size` followed by a size in bytes. Or to turn off spam deletion, use the `--spamclear-none` parameter.

Similarly you can enable automatic deletion from trash folders with the `--trashclear-days` parameter followed by the maximum age in days, or `--trashclear-size` followed by a size in bytes. Or to turn off trash deletion, use the `--trashclear-none` parameter.

SpamAssassin gives each message it scans a numeric score, and typically anything above 5 is considered spam and placed in a separate user folder. However, you can choose to simply delete all incoming spam with a score above some higher threshold (such as 10) using the `--spam-delete-level` parameter, which must be followed by a number. To turn this behavior off again, use the `--spam-no-delete-level` flag.

To enable the spam-trap and ham-trap aliases for the selected virtual servers, you can use the `--spamtrap` command-line flag. Similarly, to remove them use the `--no-spamtrap` flag. When enabled, users will be able to forward spam to `spamtrap@theirdomain.com` for adding to the domain's blacklist.

### Command line help

```text
virtualmin modify-spam --domain name | --all-domains
                      [--spam-delete | --spam-deliver |
                       --spam-mailfile [folder] |
                       --spam-file file-under-home |
                       --spam-email address | --spam-dest file |
                       --spam-maildir [folder] ]
                      [--spam-delete-level score | --spam-no-delete-level]
                      [--virus-delete |
                       --virus-mailfile [folder] |
                       --virus-file file-under-home |
                       --virus-email address | --virus-dest file
                       --virus-maildir [folder] ]
                      [--spam-whitelist | --no-spam-whitelist]
                      [--use-spamassassin | --use-spamc]
                      [--spamclear-none |
                       --spamclear-days days
                       --spamclear-size bytes]
                      [--trashclear-none |
                       --trashclear-days days
                       --trashclear-size bytes]
                      [--use-clamscan | --use-clamdscan |
                       --use-clamd-stream-client | --use-clamdscan-remote]
                      [--spamtrap | --no-spamtrap]
```

Modifying the SpamAssassin or virus scanning client for individual domains is deprecated.
