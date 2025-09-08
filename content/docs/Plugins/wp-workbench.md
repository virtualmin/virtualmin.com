---
title: "WP Workbench"
author: "Ilia Ross"
date: "2025-09-04"
weight: 2511100
---

WP Workbench is a specially crafted Virtualmin plugin that simplifies WordPress
management. It lets you manage core settings, update plugins and themes, run
instant or scheduled backups to local or remote cloud storage, clone sites,
search and replace across databases, and more, all from one place.

Whether you have one site or many across local and remote servers, you can use
the same interface or the CLI without having to log into each WordPress admin
dashboard.

## Installation

This plugin is available in the standard Virtualmin Pro repositories and can be
easily installed using your system's package manager.

**For Debian and derivatives:**
```
apt install webmin-virtualmin-wp-workbench
```

**For EL systems:**
```
dnf install wbm-virtualmin-wp-workbench
```

## Accessing

After installation, "WP Workbench Manager" appears in the left navigation menu
for multi-site management (local and remote). "WP Workbench" is on each domain's
"Manage WordPress" page, accessible from that domain's "Manage Web Apps" list.

{{< alert primary exclamation-triangle "" "The WP Workbench plugin is only available to [Virtualmin Pro](https://www.virtualmin.com/shop/) subscribers." >}}

## Getting started

### Bulk-site management
1. Go to "WP Workbench Manager" by clicking the link at the navigation menu
2. Click "Find Instances" to scan for WordPress installations on local and remote systems
3. View all your WordPress instances in the "Instances" tab
4. Use the "Plugins", "Themes", or "Backups" tabs for bulk operations
5. Click on any instance's settings icon for individual management
6. Click on any instance's login icon for direct access to the WordPress admin area
7. Use "Import Instances" to add WordPress sites not installed through Virtualmin

### Single-site management

1. In the domain section, go to "Manage Web Apps" and choose the WordPress site to manage
2. Select the tab corresponding to the task you want to perform
3. Make your changes and click "Apply" to save them
4. Use "Login to WordPress" for direct access to the WordPress admin area

{{< alert primary exclamation "" "Access to WP Workbench for virtual server owners is only available if the master administrator has granted them permission to manage web apps." >}}


## Bulk-site management

WP Workbench Manager lets you manage multiple WordPress sites in one place,
across local and remote servers.

* **Centralized control**: Manage multiple WordPress sites from one interface
* **Speed**: View and update core, plugins, and themes in bulk
* **Safety**: Schedule backups and easily restore them using local or cloud storage
* **Remote management**: Manage sites on remote systems connected via the "Webmin ⇾ Webmin Servers Index" module
* **Performance monitoring**: Track PHP versions, memory usage, and disk usage
* **Convenience**: One-click WordPress admin access without passwords
* **Automation**: Robust CLI for scripting common tasks with full integration with Virtualmin

### User interface tabs

#### Instances

The main dashboard shows all your WordPress sites across local and remote
servers with comprehensive details:

- **Site information**: Title, URL, location (local/remote)
- **WordPress version**: Current version with update indicators
- **Resource usage**: PHP version, memory limits, disk space
- **Plugin/theme counts**: Number installed with update status
- **Security status**: Brute-force and password protection indicators
- **Backup information**: Number and total size of backups
- **Quick actions**: Settings, login, and management buttons per instance

**Bulk actions available:**
- Bulk apply
  - System
    - Enable/disable brute-force login failure protection
    - Enable/disable password protection for admin dashboard
    - Set automatic core updates (disabled/minor versions/major and minor versions)
  - Backups
    - Backup both files and database
    - Backup only files
    - Backup only database
  - Development
    - Set debug mode (disabled/display errors/log errors)
    - Enable/disable maintenance mode
    - Enable/disable cron job scheduler
- Check integrity
- Check for updates
- Upgrade selected instances

**Special features of this tab:**
- **Refresh Instances**: Refresh the cache for all collected instances, both local and remote, to detect new installations or changes to existing instances
  {{< alert warning exclamation "" "Indexing creates the list of instances from local and remote servers. On larger setups, this may take some time. Until it's done, sites won't appear, and sites changed externally may show outdated info until the next refresh." >}}
- **Import Instances**: Import existing installations that were created outside of Virtualmin to manage them alongside other sites

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-instances.png "Instances — WP Workbench Manager")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-instances.png)

#### Plugins

Comprehensive plugin management across all instances:

- **Consolidated view**: All plugins from all sites in one table
- **Version tracking**: Current version and available updates highlighted
- **Usage information**: See which sites use each plugin
- **Upgrade selected**: Upgrade selected plugins across all sites

**Bulk actions available:**
- Bulk apply
  - Activate
  - Deactivate
  - Delete
  - Enable/disable auto-updates

**Special feature of this tab:**
- **Upgrade All Available Plugins**: Upgrade all available plugins for all your instances in one go

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-plugins.png "Plugins — WP Workbench Manager")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-plugins.png)

#### Themes

Centralized theme management:

- **Unified listing**: All themes from all instances
- **Version control**: Track installed and available versions
- **Usage tracking**: Identify which sites use each theme
- **Upgrade selected**: Upgrade selected themes across all sites

**Bulk actions available:**
- Bulk apply
  - Activate
  - Delete
  - Enable/disable auto-updates

**Special feature of this tab:**
- **Upgrade All Available Themes**: Upgrade all available themes for all your instances in one go

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-themes.png "Themes — WP Workbench Manager")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-themes.png)

#### Backups

Advanced scheduled backup management:

- **Scheduled backups**: Create automated backups with flexible scheduling
- **Multiple destinations**: Local file system and cloud storage support
- **Backup types**: Full, database-only, or files-only
- **Schedule options**: Hourly, daily, weekly, monthly, or complex cron schedule
- **Email notifications**: Configure alerts for backup success or failure
- **Retention policies**: Automatic cleanup of old backups
- **Backup logs**: View and restore from backup history
- **Multi-destination support**: Send backups to multiple locations

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-backups.png "Backups — WP Workbench Manager")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-backups.png)
[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-backups-edit.png "Edit Scheduled Backup — WP Workbench Manager")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-backups-edit.png)

### Configurable options

Customize WP Workbench Manager using module config:

- **Remote server support**: Enable/disable remote instance management
  {{< alert primary note "Note" "If turned on, this feature lets you manage WordPress installations on remote servers listed in the \"Webmin ⇾ Webmin Servers Index\" module. Those servers need to be running Virtualmin Pro and have the \"WP Workbench\" plugin installed and active. After refreshing the instances, WordPress installations from remote servers listed in the module's index page will appear and be manageable—just as if they were hosted on the local server." >}}
- **Background caching**: Update instance data automatically
- **Column visibility**: Choose which information to display
- **Sorting preferences**: Default column sorting options
- **Include extra columns**: Show more details for plugins and themes tabs
- **Site preview services**: Select thumbnail provider for site previews among Automatic/Microlink/Thumb
- **WP-CLI updates**: Automatically upgrade WP-CLI with core updates
- **Disk space calculation**: Include disk space usage information
- **Credential storage**: Save admin login information securely
- **Display options**: Customize backup destination display format

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-configuration.png "Configuration — WP Workbench Manager")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-manager-configuration.png)


## Single-site management

WP Workbench offers a simple interface for in-depth control of a single
WordPress site:

- **Simplified management**: Easily control the main WordPress site settings
- **Time-saving**: Perform bulk operations on plugins and themes
- **Safety**: Backup and restore options in a few clicks
- **Enhanced security**: Brute-force protection and password protection for admin dashboard
- **Developer-friendly**: Access to cloning, debugging tools, and database search-and-replace operations
- **Convenience**: One-click WordPress admin access
- **Automation**: Robust CLI for scripting common tasks with full integration with Virtualmin

### User interface tabs

#### Dashboard

This tab provides comprehensive site information:

- **Visual site preview**: Thumbnail preview of your WordPress site
- **Web app details**: 
  - WordPress core version with update status
  - Plugin and theme counts with available updates
  - Backup size and count
  - Files and database size
  - Memory usage limits
  - SSL certificate expiry
- **WP-CLI version**: Installed command-line tool version
- **Installation details**: 
  - Site name and URLs
  - Installation date and directory
  - PHP version information
  - Database credentials and table prefix
- **Quick actions**:
  - Show detailed information
  - Check integrity
  - Check for updates
  - Re-install WordPress core
  - Update cache
  - Login to WordPress admin
  - Re-install dependencies
  - Un-install web app

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-dashboard.png "Dashboard — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-dashboard.png)

#### System

This tab helps you optimize WordPress performance and security:

- **Memory limit**: Set how much memory each script can use (default: 40M)
  
  For small to medium sites, the default might be enough. Increase this if you have many plugins or complex functionality.

- **Admin memory limit**: Allocate more memory for admin tasks (default: 256M)
  
  This higher limit ensures plugin installations, updates, and admin tasks run smoothly.

- **Enable brute-force login failure protection**: Guard against brute force attacks
  
  Monitors failed login attempts and temporarily blocks suspicious IP addresses.

- **Enable password protection for the admin dashboard**: Add an extra layer of security
  
  Requires an additional username and password before accessing the WP admin dashboard login page.
  {{< alert warning exclamation-triangle "" "If enabled, the \"Login to WordPress\" button will only work after you enter this extra username and password. For convenience, you can save these credentials in your browser so automatic login always works." >}}

- **WordPress auto-updates**: Control update behavior
  
  Choose between disabling all auto-updates, allowing only minor updates, or enabling all updates.

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-system.png "System — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-system.png)

#### Settings

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

#### Plugins

Comprehensive plugin management in one place:

- **View all plugins**: See installed version and update status
- **Bulk actions**: Easily manage multiple plugins at once
  - Activate
  - Deactivate
  - Update
  - Delete
  - Enable/disable auto-updates
- **Manage in WordPress**: Direct link to WordPress plugin management
  
[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-plugins.png "Plugins — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-plugins.png)

#### Themes

Keep your site's appearance up-to-date and secure:

- **View all themes**: See installed version and update status
- **Choose theme**: Change active theme
- **Bulk actions**: Apply changes to multiple themes
  - Activate
  - Update
  - Delete
  - Enable/disable auto-updates
- **Manage in WordPress**: Direct link to WordPress theme management

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-themes.png "Themes — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-themes.png)

#### Backup and restore

Protect your WordPress site with comprehensive backup and restore tools:

- **Backup options**:
  - Full site backup (files and database)
  - Files-only backup
  - Database-only backup
- **Restore capability**: Recover from any available backup
- **Backup management**: Delete outdated backups
- **Backup details**: View size, date, and backup type information

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-backup-and-restore.png "Backup and Restore — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-backup-and-restore.png)

#### Clone

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

{{< alert success question "" "The domain name of the new clone is applied automatically, and all database tables are updated to match." >}}

{{< alert primary exclamation "" "The ability to clone a WordPress instance to a new sub-server is only available if the master administrator has granted the virtual server owner permission to create sub-servers and aliases. The ability to clone to top-level virtual servers is available to master administrators and resellers only." >}}

{{< alert warning exclamation-triangle "" "The tab to clone a WordPress instance will not be available to the virtual server owner unless the master administrator has granted them database management permissions." >}}

#### Development

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

- **Database replacements**: Search and replace strings in database

  A powerful tool for bulk database operations. Features include:

  - Test mode for previewing changes
  - Regular expression support
  - Table and column filtering options
  - Support for serialized data

[![](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-development.png "Development — WP Workbench")](/images/docs/screenshots/plugins/wp-workbench/light/wp-workbench-development.png)

## Command line interface

Here are some examples of how to use the WP Workbench CLI to manage WordPress
sites, either in bulk across multiple instances or individually on a local
system.

### Bulk-site management

Use the `virtualmin configure-all-scripts` to manage multiple WordPress
instances in bulk on either local or remote systems from the command line.

#### Basic operations

```
# Refresh instances cache
virtualmin configure-all-scripts --app wordpress --refresh-instances

# Import instances created outside Virtualmin
virtualmin configure-all-scripts --app wordpress --import-instances

# List all instances
virtualmin configure-all-scripts --app wordpress --list instances

# List all plugins across instances
virtualmin configure-all-scripts --app wordpress --list plugins

# List all themes across instances
virtualmin configure-all-scripts --app wordpress --list themes
```

#### System management

```
# Enable brute-force protection for specific domains
virtualmin configure-all-scripts --app wordpress \
  --domain domain.tld --domain example.org --action enable-fail2ban

# Enable password protection for all domains
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action enable-httpdauth

# Set auto-updates to minor versions only
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action enable-minor-updates

# Upgrade WordPress core for selected domains
virtualmin configure-all-scripts --app wordpress \
  --domain domain.tld --domain example.org --action upgrade-core

# Check integrity of all installations
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action check-integrity
```

#### Backup management

```
# Create full backup for specific domain
virtualmin configure-all-scripts --app wordpress \
  --domain domain.tld --action backup-full

# Backup only database for all domains
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action backup-db

# Backup only files for multiple domains
virtualmin configure-all-scripts --app wordpress \
  --domain site1.com --domain site2.com --action backup-files
```

#### Plugin management

```
# Activate specific plugins across all sites
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action activate-plugins akismet,wordfence

# Update all plugins on specific domains
virtualmin configure-all-scripts --app wordpress \
  --domain domain.tld --action update-plugins

# Enable auto-updates for specific plugins
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action enable-plugins-auto-updates jetpack,woocommerce

# Deactivate and delete unused plugins
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action deactivate-plugins hello.php
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action delete-plugins hello.php
```

#### Theme management

```
# Update all themes across all sites
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action update-themes

# Activate a specific theme on multiple sites
virtualmin configure-all-scripts --app wordpress \
  --domain site1.com --domain site2.com --action activate-themes twentytwentyfour

# Enable auto-updates for themes
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action enable-themes-auto-updates
```

#### Development settings

```
# Enable debug mode for development sites
virtualmin configure-all-scripts --app wordpress \
  --domain domain.tld --action enable-debug

# Enable maintenance mode during updates
virtualmin configure-all-scripts --app wordpress \
  --all-domains --action enable-maintenance

# Disable cron jobs for troubleshooting
virtualmin configure-all-scripts --app wordpress \
  --domain domain.tld --action disable-cron-jobs
```

For more details, just use the `virtualmin configure-all-scripts --app
wordpress` command.

### Single-site management

Use the `virtualmin configure-script` to manage individual WordPress
instances on the local system from the command line.

#### System settings
```
virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'wp_memory_limit 512M'

virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'wp_admin_memory_limit 768M'
```

#### WordPress settings
```
virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'blogname "My Site Name"'

virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'blogdescription "My Site Tagline"'
```

#### Plugin management
```
virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'plugins activate plugin1,plugin2'

virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'plugins deactivate plugin1'

virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'plugins update plugin1,plugin2'
```

#### Theme management
```
virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'themes activate twentytwentyfour'

virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'themes update theme1,theme2'
```

#### Backup operations
```
virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'backup full'

virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'backup files'

virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'backup database'
```

#### Site cloning
```
virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'clone same --dir=wordpress-clone'

virtualmin configure-script --app wordpress --domain domain.tld \
  --apply 'clone subdomain --subdomain=staging'
```

#### WP-CLI management
```
# Install or upgrade WP-CLI
virtualmin configure-script --app wordpress --domain domain.tld \
  --wpi install

# Get detailed instance information
virtualmin configure-script --app wordpress --domain domain.tld \
  --wpi info
```

For more details, just use the `virtualmin configure-script --app wordpress`
command.
