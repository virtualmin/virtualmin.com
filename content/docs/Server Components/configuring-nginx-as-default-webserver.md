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

{{< alert warning exclamation "Warning!" "Manual switching involves advanced configuration and is generally not advisable for average users due to its technical nature." >}}

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
2. **Disable Apache as Virtualmin feature**
   ```text
   virtualmin set-global-feature --disable-feature web --disable-feature ssl
   ```
3. **Install Nginx and dependencies**: Install Nginx and Nginx Virtualmin modules from your repository.
   - Debian and derivatives
      ```text
      apt-get install nginx-full webmin-virtualmin-nginx webmin-virtualmin-nginx-ssl
      ```
   - EL systems
      ```text
      dnf install nginx wbm-virtualmin-nginx wbm-virtualmin-nginx-ssl
      ```
4. **Configure Virtualmin for Nginx**
      ```text
      virtualmin-config-system -i Nginx
      ```

##### Switching from Nginx to Apache

1. **Disable Nginx**: Disable Nginx.
   - EL systems and Debian derivatives
      ```text
      systemctl disable --now nginx
      ```
2. **Disable Nginx as Virtualmin feature**
   ```text
   virtualmin set-global-feature --disable-feature virtualmin-nginx --disable-feature virtualmin-nginx-ssl
   ```
3. **Install Apache**: Install the Apache package along with necessary modules.
   - Debian and derivatives
      ```text
      apt-get install apache2 libapache2-mod-fcgid apache2-suexec-custom
      ```
   - EL systems
      ```text
      dnf install httpd mod_fcgid mod_ssl mod_http2
      ```
4. **Configure Virtualmin for Apache**
      ```text
      virtualmin-config-system -i Apache
      ```
5. **Enable Apache as Virtualmin feature**
   ```text
   virtualmin set-global-feature --enable-feature web --enable-feature ssl
   ```
