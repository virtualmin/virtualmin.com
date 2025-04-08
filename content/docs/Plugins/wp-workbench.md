---
title: "WP Workbench"
author: "Ilia Ross"
weight: 2511100
---

WP Workbench is a new Virtualmin plugin designed to simplify WordPress site management. It provides a clear, centralized interface for handling plugins, themes, backups, cloning, and development settings—all in one place for a WordPress instance. Whether you prefer a graphical interface or CLI, WP Workbench gives you direct access to essential WordPress management tools without needing WordPress admin credentials.

## Installation

WP Workbench is available in standard Virtualmin repositories and can be easily
installed using your system's package manager:

**For EL systems:**
```
dnf install wbm-virtualmin-wp-workbench
```

**For Debian and derivatives:**
```
apt install webmin-virtualmin-wp-workbench
```

After installation, the module will appear on the "Manage Web Apps" page when a
specific WordPress instance is selected.

{{< alert primary exclamation-triangle "" "The WP Workbench plugin is only available to [Virtualmin Pro](https://www.virtualmin.com/shop/) subscribers." >}}

## Why use WP Workbench?

- **Simplified management**: Control your WordPress sites directly from Virtualmin
- **Time-saving**: Perform bulk operations on plugins and themes
- **Enhanced security**: Backup and restore options provide peace of mind
- **Developer-friendly**: Access to cloning, debugging, and maintenance tools
- **Convenience**: One-click WordPress admin access
- **Automation**: Robust CLI for scripting common tasks with full integration with Virtualmin

## User interface tabs

### System

This tab helps you optimize WordPress performance and security:

- **Memory limit**: Set how much memory each script can use (default: 40M)
  
  For small to medium sites, the default might be enough. Increase this if you have many plugins or complex functionality.

- **Admin memory limit**: Allocate more memory for admin tasks (default: 256M)
  
  This higher limit ensures plugin installations, updates, and admin tasks run smoothly.

- **Fail2Ban protection integration**: Guard against brute force attacks
  
  Monitors failed login attempts and temporarily blocks suspicious IP addresses.

- **WordPress auto-updates**: Control update behavior
  
  Choose between disabling all auto-updates, allowing only minor updates, or enabling all updates.

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-system.png "System — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-system.png)

### Settings

Manage core WordPress settings without accessing the WordPress dashboard:

- **Site URL**: Set where WordPress core files are located
  
  This is the address where your WordPress site's files and resources are
  accessed by users.

- **Home URL**: Set your site's front page address
  
  This URL points to the front page of your site.

- **Site name**: Your website's title
  
  Appears in browser tabs, search results, and typically in the header area.

- **Site tagline**: Brief description of your site
  
  Helps visitors and search engines understand your site's purpose.

- **Permalink structure**: Customize your URL format
  
  Create user and SEO-friendly URLs for better navigation and search rankings.

- **Administrator settings**: Manage admin credentials
  
  Update the selected administrator's password and email address for the site.

- **Search engine visibility**: Control indexing
  
  Allow or prevent search engines from listing your site.

- **Comment settings**: Manage pingbacks and trackbacks
  
  Control how your site interacts with other blogs when linking content.

- **File editing**: Enable or disable code editing in WordPress
  
  Disabling adds security by preventing plugin/theme code edits from the admin area.

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-settings.png "Settings — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-settings.png)

### Plugins

Comprehensive plugin management in one place:

- **View all plugins**: See installed version and update status
- **Bulk actions**: Easily manage multiple plugins at once
  - Activate
  - Deactivate
  - Update
  - Delete
  - Enable/disable auto-updates
- **One-click WordPress login**: Direct access to WordPress admin
  
[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-plugins.png "Plugins — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-plugins.png)

### Themes

Keep your site's appearance up-to-date and secure:

- **View all themes**: See installed version and update status
- **Choose theme**: Change active theme
- **Bulk actions**: Apply changes to multiple themes
  - Activate
  - Update
  - Delete
  - Enable/disable auto-updates
- **View update availability**: Easily see which themes need updating

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-themes.png "Themes — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-themes.png)

### Backup and restore

Protect your WordPress site with comprehensive backup tools:

- **Backup options**:
  - Full site backup (files and database)
  - Files-only backup
  - Database-only backup
- **Restore capability**: Recover from any backup
- **Backup management**: Delete outdated backups
- **Backup details**: View size, date, and type information

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-backup-and-restore.png "Backup and Restore — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-backup-and-restore.png)

### Clone

Duplicate your WordPress site for testing or development:

- **Clone target options**:
  - Same domain (different directory)
  - New subdomain
  - New top-level domain
  - Existing domain
- **Customization options**:
  - Site URL (automatic or custom)
  - Site name
  - Administrator email
  - Administrator password

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-clone.png "Clone — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-clone.png)

{{< alert primary exclamation "" "The ability to clone a WordPress instance to a new sub-server is only available if the master administrator has granted the virtual server owner permission to create sub-servers and aliases. The ability to clone to top-level virtual servers is available to master administrators and resellers only." >}}

{{< alert warning exclamation-triangle "" "The tab to clone a WordPress instance will not be available to the virtual server owner unless the master administrator has granted them database management permissions." >}}

### Development

Control technical settings for troubleshooting and optimization:

- **Debug mode**: Three options for error handling
  - Disabled (production sites)
  - Display errors on screen (active development)
  - Log errors to file (troubleshooting live sites)
- **Maintenance mode**: Show maintenance notice to visitors
  
  Can be customized with a custom `maintenance.php` file in `wp-content` directory.

- **Cron job scheduler**: Enable/disable WordPress task scheduler
  
  Useful during migrations or when using external cron jobs.

- **Scripts concatenation**: Combine JavaScript files
  
  Improves page load times by reducing HTTP requests.

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-development.png "Development — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-development.png)

## Command line interface

WP Workbench includes a powerful CLI for automating WordPress management through
the `virtualmin configure-script` command.

Below are some examples of how to use the CLI to manage WordPress sites.

### System settings
```
virtualmin configure-script --script-type wordpress --domain example.com --opt 'wp_memory_limit 512M'
```

### WordPress settings
```
virtualmin configure-script --script-type wordpress --domain example.com --opt 'blogname "My Site Name"'
```

### Plugin management
```
virtualmin configure-script --script-type wordpress --domain example.com --opt 'plugins activate plugin1,plugin2'
```

### Theme management
```
virtualmin configure-script --script-type wordpress --domain example.com --opt 'themes update theme1,theme2'
```

### Backup operations
```
virtualmin configure-script --script-type wordpress --domain example.com --opt 'backup full'
```

### Site cloning
```
virtualmin configure-script --script-type wordpress --domain example.com --opt 'clone same --dir=wordpress-clone'
```

### Install or upgrade WP-CLI
```
virtualmin configure-script --script-type wordpress --domain example.com --wp-cli install
```

### Retrieve detailed instance information
```
virtualmin configure-script --script-type wordpress --domain example.com --wp-cli info
```

For more details just use `virtualmin configure-script --script-type wordpress` command.

## Getting started

1. Navigate to the WP Workbench in your WordPress management page in "Manage Web Apps"
2. Select the tab corresponding to the task you want to perform
3. Make your changes and click "Apply" to save them
4. Use "Login to WordPress" for direct access to the WordPress admin area

{{< alert primary exclamation "" "Access to WP Workbench for virtual server owners is only available if the master administrator has granted them permission to manage web apps." >}}

