---
title: "Troubleshooting Websites"
date: 2023-12-28
author: "Ilia Ross"
weight: 2339900
---

### Web server configuration

Troubleshooting web server issues involves checking various elements, from configuration settings to log files. Common problems are not always evident as errors in `error_log`, so a comprehensive approach is needed.

#### Webserver logs

The first step in troubleshooting is to examine the log files. Each virtual server or sub-server in Virtualmin has its own log files located in `/home/example/logs` (replace `example` with your server name). The `error_log` is typically the most informative, but `access_log` may also provide useful insights.

### The wrong site shows up

If visiting a domain on your server shows incorrect content, it could be due to an IP address mismatch:

1. **Check Server IP Addresses**:
   - Use `ip addr` to list the IP addresses on your server.
2. **Review Apache configuration**:
   - Check the `VirtualHost` settings in Apache configuration:
     ```text
     grep -i 'virtualhost' /etc/apache2/sites-enabled/*.conf 2>/dev/null || grep -i 'virtualhost' /etc/httpd/conf/httpd.conf 2>/dev/null
     ```
   - Ensure that the IP addresses listed match those from `ip addr`.
   - Verify that each `VirtualHost` block lists an IP address, not an asterisk (i.e. __*__).

3. **Restart Apache**:
   - For EL systems: `systemctl restart httpd`.
   - For Debian and derivatives: `systemctl restart apache2`.

### Virtualmin configuration settings

Review Virtualmin settings to ensure new records are correctly created:

1. **Network settings**
   - **System Settings ⇾ Virtualmin Configuration ⇾ Network settings**: Can be opened from the navigation menu.
   - **Network interface for virtual addresses**: Should typically be the primary IP address of your server (commonly `enp0s5` or `eth0`).
   - **Default virtual server IPv4/IPv6 address**: Recommended to leave as **From Network Interface**.
   - **Default IP address for DNS records**: Set to **Automatically detect external address** if behind a NAT router.

2. **Defaults for new domains**
   - **System Settings ⇾ Virtualmin Configuration ⇾ Defaults for new domains**: Can be opened from the navigation menu.
   - **Address format for Apache virtual hosts**: Use __Always use *__ for dynamic IPs, otherwise **Always use IP**. Default is set to **Decide automatically**.

### Internal server error

Specifically, **500 Internal Server Errors** is common error often does not provide clear messages in `error_log`. Key areas to check:

1. **Permissions**: Scripts with permissions set too loosely (e.g., 777) won't execute in a suEXEC environment. Correct permissions are 750 or less.
2. **Script bugs**: Check for syntax errors or compatibility issues with PHP.
   - Test syntax: `php -l scriptname.php`.
3. **File ownership**: Ensure files are owned by the domain owner. Incorrect ownership can lead to access issues for the suEXEC process.
   - Correct ownership: `chown -R domainname:domainname scriptdirectory`.

### Previewing websites before DNS updates

#### Previewing within Virtualmin

Virtualmin provides a convenient way to preview a site before DNS records are fully propagated. To do this:

1. Log into Virtualmin.
2. Navigate to **Web Configuration ⇾ Preview Website**.
3. Virtualmin will retrieve and display the website within the control panel, allowing you to navigate and interact with it.

#### Using an alias for preview

A recommended approach is to set up an alias so that users can access their site through a URL like `https://username.example.com`. To configure this:

1. Go to **System Settings ⇾ Server Templates ⇾ Default Template ⇾ Virtual Server Creation**.
2. In the **Automatically create alias domain** field, add your primary domain.
3. This setting ensures that every new virtual server created will have an alias domain that customers can use before DNS points to your server.

#### Discouraging `UserDir` feature

Virtualmin strongly discourages the use of the Apache `UserDir` feature (i.e. `https://www.example.com/~username`) due to potential security issues, particularly in shared hosting environments. For those who still wish to explore this option, refer to the relative [Apache documentation](https://httpd.apache.org/docs/2.4/mod/mod_userdir.html).
