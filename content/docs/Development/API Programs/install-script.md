---
title: "install-script"
subSection: "Script Installers"
date: 2024-01-23
weight: 4012335
---

### Install one third-party script

This program performs the actual upgrade or install of a script into a virtual server. The required parameters are `--domain` (followed by the domain name), `--type` (followed by the script's short name, like `wordpress` or `phpmyadmin`), and `--version` (followed by the version number or the word `latest`). Don't use the script's longer description with the `--type` parameter - only the short name (as shown by `list-available-scripts --multiline`) will work.

By default only versions known to Virtualmin can be installed, but you can override this check with the `--unsupported` flag. Note that this may cause the script to fail to download or install, due to inconsistent download URLs or install methods implemented by the script creator.

All scripts will also need the `--path` parameter, which must be followed by a URL path such as `/wordpress`. This determines the directory where the script is installed. The directory can be overridden by the `--force-dir` option though, which must be followed by a full path. However, this is not recommended, and should only be used when you have a web server alias setup to map the path to the forced directory.

Those that use a database require the `--db` parameter, which must be followed by the database type and name, such as `--db mysql dbname`. If this is missing and the script requires it, the `install-script` command will fail with an error message. By default the database must already exist under the virtual server, but if the `--newdb` parameter is given it will be created as part of the script installation process.

By default the exact database name you enter will be used, but when creating a new database for the script you can use the `--prefix-db` flag to request that the DB name be prefixed in the same way that it would be when installing a script from the Virtualmin user interface.

If upgrading an existing script in this virtual server, you must supply the `--upgrade` parameter, followed by the install ID. This can be found from the `list-scripts` command, documented below.

If your system supports multiple proxy balancer backends (as in Apache 2), the `--mongrels` flag can be given, followed by the number of processes to configure and start to serve the script.

Most application that Virtualmin can install have an initial username and password for administration. By default these are taken from the domain's Virtualmin login and password, but they can be overridden with the `--user` and `--pass` flags.

When the command is run it will display the progress of the installation process as the needed files are downloaded, validated and installed.
 
### Command line help

```text
virtualmin install-script --domain domain.name
                          --type name
                          --version number|"latest" [--unsupported]
                         [--path url-path]
                         [--db "type name"]
                         [--prefix-db]
                         [--opt "name value"]
                         [--upgrade id]
                         [--force-dir directory]
                         [--mongrels number]
                         [--user username --pass password]
                         [--log-only]
```
