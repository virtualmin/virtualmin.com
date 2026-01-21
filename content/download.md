---
title: "Downloading and Installing"
date: 2026-01-21
draft: false
showtoc: false
hideMeta: true
---

Usually, getting started with Virtualmin can be done with a few simple steps, using our automated [install script](https://download.virtualmin.com/virtualmin-install.sh). The install script will set up your package manager (`dnf` or `apt`), and then download our packages as well as all of the necessary dependencies for running Virtualmin.

{{< alert primary question "" "Never run the `virtualmin-install.sh` script to upgrade or renew or to try to repair an existing Virtualmin system! The `virtualmin change-license` command is used for license changes and renewals. [Check the license FAQ](/docs/faq/#license) for details." >}}

### Install your operating system
Start with a fresh [Grade A](/docs/os-support/) supported OS on your server or VPS—Rocky Linux, Debian, and Ubuntu Server LTS are safe choices. For full installs that include mail, set a proper [fully qualified domain name](/docs/installation/automated#fully-qualified-domain-name). Minimal installs don't require this, because they don't run mail. In all cases, don't name the system the same as any domain you'll host in Virtualmin.

{{< alert warning exclamation-triangle "" "Don't pre-install or tweak extra packages; the installer expects a clean supported OS, and changes may cause conflicts. The only exception is if you prefer MySQL over MariaDB—[install MySQL first](/docs/installation/automated/#mysql-vs-mariadb). Add any third-party repositories only after installing Virtualmin, and use them with caution." >}}

### Download and run install script
If you have already purchased a [Virtualmin Professional](/docs/professional-features/) license, you can find it in [My Account → Dashboard](/account/). If not, you can purchase a license or download Virtualmin GPL.

{{< link "success|medium|outline|rounded" heart "/shop/" "Try Virtualmin Professional" >}}&nbsp;&nbsp;or&nbsp;&nbsp;{{< link "dark|medium|outline|rounded" download "https://download.virtualmin.com/virtualmin-install.sh" "Download Virtualmin GPL" >}}

The quickest way to initiate the installation of Virtualmin GPL on your server is to log in via SSH using a terminal, and execute the following pre-prepared command:

```
sudo sh -c "$(curl -fsSL https://download.virtualmin.com/virtualmin-install)" -- --bundle LAMP
```

For **Virtualmin Professional**, use the download link provided on the [My Account → Dashboard](/account/) page.

{{< alert primary exclamation "" "To use Nginx as the webserver use `--bundle LEMP`, while `--type mini` installs a mini web-only setup without mail, local DNS, FTP, or Jailkit pre-installed." >}}


### Install script options

You can customize the install with various options. Run the script with `--help` for a full list, and see the docs for [installation bundles](/docs/installation/automated#lamp-apache-vs-lemp-nginx) and [minimal installation mode](/docs/installation/automated#full-install-vs-minimal-install) if you choose something other than the default.

During installation, the script may ask a few questions:

- If your system doesn't have a fully qualified hostname, full installs that include mail will ask you to set one. For minimal installs, it isn't required. Don't use a name you'll host in Virtualmin—for example, if you'll host the `virtualmin.com` domain, you can name the system `host.virtualmin.com`, but not `virtualmin.com`.  
- If your system doesn't have enough memory for the chosen install type, the installer will offer to create a swap file.

After a few minutes, your system will be ready. Log in to Virtualmin by going to `https://your-hostname:10000` or `https://your-ip:10000` in your browser.

In most cases, you won’t see an SSL warning, because during installation Virtualmin requests a real certificate for your hostname if it resolves correctly and ports are reachable. If you do see a warning, you can safely continue and fix the certificate after setup.

Follow the post-install wizard to configure Virtualmin for your environment. Virtualmin will check your system and confirm it's ready to host sites and services.

When you're done, click **Create Virtual Server** to create your first website in Virtualmin.

### Check the documentation

If your setup doesn't fit these simple steps—for example, you can't start from a fresh OS or can't use a Grade A supported OS—Virtualmin can probably still work. See the [installation documentation](/docs/installation/guides/) for more detailed guides and alternative installation methods.

### Sign up for announcements

To stay up to date with Virtualmin news and updates, subscribe to the [News Forum](https://forum.virtualmin.com/c/news/5) at Virtualmin.com.
