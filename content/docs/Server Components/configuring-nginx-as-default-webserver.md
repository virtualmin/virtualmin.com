---
title: "Configuring Nginx as Default Webserver"
date: 2023-12-29
author: "Ilia Ross"
weight: 2332100
---

### Overview

Nginx is a high-performance web server known for its speed and efficiency, particularly well-suited for sites with high static content or environments with limited memory. For more details on Nginx, visit the [Nginx Wiki](https://www.nginx.com/resources/wiki/).

### Using Nginx

Once Nginx support is configured, you can manage virtual servers similar to Apache:

- **Virtual server creation**: When creating a new virtual server, select **Nginx website enabled** under **Enabled features**, instead of **Apache website enabled**.
- **CLI API**: Use `--virtualmin-nginx` flag instead of `--web` for non-SSL websites and `--virtualmin-nginx-ssl` instead of `--ssl` for SSL-enabled sites.
- **Remote API**: Use the `virtualmin-nginx=` parameter instead of `web=`.

### Configuring Nginx support in Virtualmin

#### Clean installation as LEMP stack

- **Automated installation**: During Virtualmin installation, use the `--bundle LEMP` option with the `virtualmin-install.sh` script. This sets up a LEMP (Linux, Nginx, MariaDB, PHP) stack. For more information, see the [LAMP vs. LEMP documentation](/docs/installation/automated/#lamp-apache-vs-lemp-nginx).

#### Manual webserver switch

{{< alert warning exclamation "Warning!" "Manual switching requires advanced configuration and is typically not recommended for most users because of its technical complexity." >}}

##### Manual switch from Apache to Nginx

1. **Disable Apache**: Disable Apache.
   - Debian and derivatives
      ```text
      systemctl disable --now apache2
      ```
   - EL systems
      ```text
      systemctl disable --now httpd
      ```
2. **Disable Apache website feature for all existing virtual servers**
      ```text
      virtualmin disable-feature --all-domains --web --ssl --status --virtualmin-awstats
      ```
      {{< note "Dependent features such as `status` and `virtualmin-awstats` must also be disabled, as they rely on the webserver feature. Depending on your setup, there may be others. Adjust the command flags as needed." "Note:" "notification" >}}
3. **Disable Apache and dependent Virtualmin global features**
   ```text
   virtualmin set-global-feature --disable-feature web --disable-feature ssl --disable-feature virtualmin-htpasswd
   ```
   {{< note "Dependent features such as `virtualmin-htpasswd` must also be disabled, as they rely on the webserver feature." "Note:" "notification" >}}
4. **Install Nginx and dependencies**: Install Nginx and Nginx Virtualmin modules from your repository.
   - Debian and derivatives
      ```text
      apt-get install nginx-full webmin-virtualmin-nginx webmin-virtualmin-nginx-ssl
      ```
   - EL systems
      ```text
      dnf install nginx webmin-virtualmin-nginx webmin-virtualmin-nginx-ssl
      ```
5. **Configure Virtualmin for Nginx**
      ```text
      virtualmin-config-system --include Nginx
      ```
6. **Enable Nginx as Virtualmin global feature**
   ```text
   virtualmin set-global-feature --enable-feature virtualmin-nginx --enable-feature virtualmin-nginx-ssl
   ```
   {{< note "Dependent features such as `virtualmin-htpasswd` should also be re-enabled if they were previously enabled and needed." "Note:" "notification" >}}
7. **Enable Nginx website feature for all existing virtual servers**
      ```text
      virtualmin enable-feature --all-domains --virtualmin-nginx --virtualmin-nginx-ssl
      ```
      {{< note "You may also need to re-enable other features that were disabled in step 2, depending on your configuration." "Note:" "notification" >}}

##### Switching from Nginx to Apache

1. **Disable Nginx**: Disable Nginx.
   - EL systems and Debian derivatives
      ```text
      systemctl disable --now nginx
      ```
2. **Disable Nginx website feature for all existing virtual servers**
      ```text
      virtualmin disable-feature --all-domains --virtualmin-nginx --virtualmin-nginx-ssl --status --virtualmin-awstats
      ```
      {{< note "Dependent features such as `status` and `virtualmin-awstats` must also be disabled, as they rely on the webserver feature. Depending on your setup, there may be others. Adjust the command flags as needed." "Note:" "notification" >}}
3. **Disable Nginx and dependent Virtualmin global features**
   ```text
   virtualmin set-global-feature --disable-feature virtualmin-nginx --disable-feature virtualmin-nginx-ssl --disable-feature virtualmin-htpasswd
   ```
   {{< note "Dependent features such as `virtualmin-htpasswd` must also be disabled, as they rely on the webserver feature." "Note:" "notification" >}}
4. **Install Apache**: Install the Apache package along with necessary modules.
   - Debian and derivatives
      ```text
      apt-get install apache2 libapache2-mod-fcgid apache2-suexec-custom
      ```
   - EL systems
      ```text
      dnf install httpd mod_fcgid mod_ssl mod_http2
      ```
5. **Configure Virtualmin for Apache**
      ```text
      virtualmin-config-system --include Apache
      ```
6. **Enable Apache as Virtualmin global feature**
   ```text
   virtualmin set-global-feature --enable-feature web --enable-feature ssl
   ```
   {{< note "Dependent features such as `virtualmin-htpasswd` should also be re-enabled if they were previously enabled and needed." "Note:" "notification" >}}
7. **Enable Apache website feature for all existing virtual servers**
      ```text
      virtualmin enable-feature --all-domains --web --ssl
      ```
      {{< note "You may also need to re-enable other features that were disabled in step 2, depending on your configuration." "Note:" "notification" >}}
