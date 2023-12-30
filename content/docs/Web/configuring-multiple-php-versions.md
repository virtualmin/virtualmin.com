---
title: "Configuring Multiple PHP Versions"
date: 2023-12-29
author: "Ilia Ross"
weight: 2332200
---

Virtualmin allows the selection of different PHP versions and execution modes for each domain. The recommended execution mode is FPM, but CGI/FCGId is also available, enabling per-directory PHP version settings.

### Installing additional PHP versions

#### On RHEL, Alma, Rocky, Oracle, CentOS Stream and Fedora Linux

1. **Install Remi repository**
   ```text
   . /etc/os-release && repo_dir=$([ "$ID" = "fedora" ] && echo "fedora" || echo "enterprise") && dnf -y install "https://rpms.remirepo.net/$repo_dir/remi-release-$(rpm -E %$ID).rpm" && dnf clean all
   ```
2. **Install PHP packages**
   ```text
   dnf install php81-php-{cli,fpm,pdo,gd,mbstring,mysqlnd,opcache,curl,xml,zip}
   ```
   - Replace `php81` with the desired PHP version, e.g., `php83`.
   - Check available PHP versions and extensions in the [Remi Repository](https://rpms.remirepo.net/) or use `dnf search php`.

#### On Debian

1. **Enable Sury/PHP repository**
   ```text
   apt-get -y install apt-transport-https lsb-release ca-certificates curl && curl -sSL -o /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg && sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/sury-debian-php-$(lsb_release -sc).list' && apt-get update
   ```
2. **Install PHP packages**
   ```text
   apt-get install php8.1-{cgi,cli,fpm,pdo,gd,mbstring,mysqlnd,opcache,curl,xml,zip}
   ```
   - Replace `php8.1` with the desired version, e.g., `php8.3`.
   - Check available PHP versions and extensions on the [SURY website](https://deb.sury.org/#php-packages) or via `apt-cache search --names-only ^php`.

#### On Ubuntu

1. **Enable Ondrej/PHP repository**
   ```text
   LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php && apt-get update
   ```
2. **Install PHP packages**
   ```text
   apt-get install php8.1-{cgi,cli,fpm,pdo,gd,mbstring,mysqlnd,opcache,curl,xml,zip}
   ```
   - Replace `php8.1` with the specific version, e.g., `php8.3`.
   - Check available PHP versions and extensions on the [Ondrej PPA website](https://launchpad.net/~ondrej/+archive/ubuntu/php) or via `apt-cache search --names-only ^php`.

### Configuring default PHP version

After installing another PHP version:

1. **Verify in Virtualmin**: Log in, go to **System Settings ⇾ Re-Check Configuration**. Among other information, you should see available PHP versions and execution modes.
2. **Set default PHP version**: Configure the default version for new virtual servers in **System Settings ⇾ Server Templates ⇾ PHP Options** page. For specific virtual server, set the PHP version in **Web Configuration ⇾ PHP Options** page.

    [![](/images/docs/screenshots/light/php-options.png "PHP Options Screenshot")](/images/docs/screenshots/light/php-options.png)

### Precautions regarding `mod_php`

When managing multiple PHP versions in Virtualmin, it's crucial to understand the implications of installing `mod_php`:

- **Avoid `mod_php`**: This Apache module embeds PHP directly into the server. It poses significant security risks, especially in shared environments. `mod_php` doesn't isolate scripts between different sites, potentially allowing one site to affect others on the same server.
  
- **Identifying `mod_php` installation**
  - In Debian and derivatives, `mod_php` is typically part of packages like `libapache2-mod-php` (or other version numbers like `libapache2-mod-php8.3`).
  - In RHEL and derivatives, look for packages named `php`, `php83-php` or similar, depending on the PHP version.

#### Uninstalling `mod_php`
To remove `mod_php` and avoid numerous issues, you can uninstall it using your package manager.
  - For Debian and derivatives
    ```text
    apt-get remove libapache2-mod-php*
    ```
  - For RHEL and derivatives
    ```text
    dnf remove $(dnf list installed | awk -F. '{print $1}' | grep -E '^php$|^php[0-9]+-php$')
    ```
After uninstallation, restart Apache to apply the changes.

### Recommended PHP execution mode
PHP-FPM (FastCGI Process Manager) is recommended for executing PHP scripts due to its improved isolation, which provides separate process pools for each website, enhancing security in shared hosting environments. It offers superior performance and scalability, efficiently handling high loads and dynamically adjusting resources to match website demands. PHP-FPM's advanced features include adaptive process spawning and emergency restarts, alongside flexible configuration options for resource limits and PHP settings on a per-website basis. It is compatible with both Apache and Nginx webservers, adding to its versatility, and its ease of use is augmented by Virtualmin, which simplifies its setup and management.