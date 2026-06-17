---
title: "list-available-scripts"
date: 2024-01-23
weight: 4012350
---

### List known web apps

This command simply outputs a list of web apps that can potentially be installed into Virtualmin servers. By default it displays a nicely formatted table, but if the `--multiline` option is given it will use a more parsable format which shows more information. Or you can use `--name-only` to show just app names.

By default all available web apps are listed, but you can limit the output to only those built into Virtualmin with the `--source core` parameter. Or show only those you have installed separately with `--source custom`, or those from plugins with `--source plugin`.

### Command line help

```text
virtualmin list-available-scripts [--multiline | --name-only]
                                  [--source core|custom|plugin|latest]
                                  [--type name]*
                                  [--available-only]
```
