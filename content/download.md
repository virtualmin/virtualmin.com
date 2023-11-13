---
title: "Downloading and Installing"
date: 2023-11-13
draft: false
showtoc: false
hideMeta: true
---

Usually, getting started with Virtualmin can be done with a few simple steps, using our automated install script. The install script will setup your package manager, usually apt-get or yum, and then download our packages as well as all of the necessary dependencies for running Virtualmin.

{{< alert primary question "" "Never run the install.sh script to upgrade or renew or to try to repair an existing Virtualmin system! The `virtualmin change-license` command is used for license changes and renewals. [Check the license FAQ](/license-faq) for details." >}}

### Install your Operating System

Start with a *freshly installed*, [Grade A supported Operating System](/os-support) on your server or VPS. CentOS and Ubuntu LTS are very popular options for hosting, and are a safe choice, but any Grade A supported system should work fine. Be sure to configure your system with a [fully qualified domain name](/documentation/installation/automated#fqdn), as it will save you a lot of time and documentation spelunking later.

{{< alert warning exclamation-triangle "" "Do not pre-install or pre-configure any additional packages on your OS. The installer expects a freshly installed, supported, OS, and anything you do differently may cause conflicts or configuration errors. If you will be enabling third-party package repositories, do so *after* installation of Virtualmin, and only with extreme caution." >}}

### Download the Virtualmin Install Script

If you have already purchased a [Virtualmin Professional](/professional) license, you can find it in [My Account → Software Licenses](/account/software-licenses/). If not, you can purchase a license or download Virtualmin GPL.

[Try Virtualmin Professional](/shop/) or [Download Virtualmin GPL](https://software.virtualmin.com/gpl/scripts/install.sh)

The easiest way to get the install script onto your server, is to login to your server and use `wget` or `curl`. For example:

```shell
/usr/bin/wget https://software.virtualmin.com/gpl/scripts/install.sh
```

Note: For Virtualmin Professional, use the command suggested on [My Account → Software Licenses](/account/software-licenses/) page.

### Run the Install Script and Configure Virtualmin

Execute the downloaded install script using a command like the following:

```shell
/usr/bin/sudo /bin/sh install.sh
```

There are some available options to install different configurations (including installing nginx instead of Apache, and leaving out some of the mail processing stack for small memory systems). Run the install script with the `--help` flag for a list of available options, and consult the documentation, especially about the available [installation bundles](/documentation/installation/automated#toc-lamp-vs-lemp-7YxCS8LI) and the [minimal installation mode](/documentation/installation/automated#toc-full-install-vs-minimal-install-oBwnbmEV), if choosing a non-default installation type.

The install script may ask you some questions. If your system does not have a fully qualified hostname, the script will ask you to provide one.

Or, if your system doesn't have enough memory for the installation type you've chosen, it'll offer to create a swap file. 

After a few minutes, your system should have everything it needs to provide a full-featured virtual web hosting environment! Now login to Virtualmin by browsing to port 10000 on the address of your server using the HTTPS protocol. Ignore the SSL certificate validation error (the SSL certificate is a self-signed one after initial installation, but can be replaced with a valid certificate after initial configuration is complete).

Follow the steps in the post-install wizard to setup Virtualmin to suit your environment and needs. Virtualmin will check the configuration of the system and validate some server settings to insure your system is ready for service.

Click **Create Virtual Server** to start making your first website in Virtualmin! 

### Check the Docs

If your particular deployment doesn't fit these simple steps, either because you cannot freshly install your OS, or you cannot use a Grade A supported OS, Virtualmin can probably still work for you. Check out the [installation documentation](/documentation/installation), which covers a lot more detail about how a Virtualmin system is installed, and other ways to install it. 



### Sign Up For Announcements

If you want to stay on top of Virtualmin updates, you can sign up for notifications to the [News forum](https://forum.virtualmin.com/c/news/5) here at Virtualmin.com.