---
title: "Creating a Plugin"
weight: 4010025
---

### Introduction to plugins

Before starting on a plugin, we suggest that you first read the Webmin [module developers](https://webmin.com/docs/development/creating-modules) guide.

A Virtualmin plugin is simply a Webmin module that can provide additional features to Virtualmin virtual servers or users. To do this, it must contain a Perl script called `virtual_feature.pl` which defines certain functions. The plugin module can then be registered by Virtualmin, and the feature it offers will then be available when creating new virtual domains.

A plugin typically adds a new possible to virtual servers, in addition to the standard features built into Virtualmin (website, DNS domain and so on). For example, it may enable reporting using some new statistics generator, or activate some game server in the virtual domain. Virtualmin will add options to the **Create Virtual Server** and **Edit Virtual Server** pages for enabling the plugin's feature, and call functions in its `virtual_feature.pl` when the feature is activated, de-activated or changed.

### Starting a plugin

The steps to start writing your own plugin are similar to those for creating a new Webmin module:

1.  Find the Webmin _root_ directory, which will be `/usr/libexec/webmin` on RHEL and derivatives or `/usr/share/webmin` on Debian and derivatives systems.
    
2.  Pick a directory name for your plugin that is not currently in use by any other Webmin module. Plugin directories typically start with `virtualmin-` - so for the purposes of this documentation, we will assume that yours is going to be called `virtualmin-your-plugin`.
    
3.  Create that directory under the Webmin _root_. Then within it, create `help` and `lang` sub-directories.
    
4.  Create a file in the directory called `module.info`. This should contain lines like:
    
```text
desc=Your Plugin
version=1.0
hidden=1
```

Naturally, the `desc=` line should be changed to something more meaningful. If you intend for the plugin to be visible in Webmin's module menu, you can remove the `hidden=1` line and specify a `category` for the plugin's placement. However, it's worth noting that in most cases, plugins are primarily accessed through Virtualmin and don't need to appear in Webmin's menu.

1. Create a module library file for your plugin, named `virtualmin-your-plugin-lib.pl`. Initially, it can contain the following code: 

    ```perl
    use WebminCore;
    &init_config();
    &foreign_require("virtual-server");
    1;
    ```

2. Create a plugin API file called `virtual_feature.pl`, containing the following initial code:
    
    ```perl
    do 'virtualmin-your-plugin-lib.pl';

    sub feature_name
    {
    return "A description of your plugin";
    }
    ```

3.  Open Virtualmin in your browser, and click on **Features and Plugins** under **System Settings** on the left menu. Your new plugin should appear in the list of those available. Check its box in the left column, and click **Save**.

With this done, you can now start work on expanding the capabilities of the plugin by implementing the API documented below.

### Package and distribution

Since a plugin is just a Webmin module, the usual process for packaging it still applies. The commands to do this are:

```perl
cd /usr/libexec/webmin
tar cvzf /tmp/virtualmin-your-plugin.wbm.gz virtualmin-your-plugin
```

As you can see, a module or plugin is just a tar file of the directory. These can then be installed using the **Webmin Configuration** module, on the **Webmin Modules** page.

If you prefer to package your plugin as an RPM, this can be done using the [`makemodulerpm.pl`](https://raw.githubusercontent.com/webmin/webmin/master/makemodulerpm.pl) script. It must be run as _root_ as shown below:

```perl
cd /usr/libexec/webmin
/usr/local/bin/makemodulerpm.pl --target-dir /tmp virtualmin-your-plugin
```

This will create a file named `wbm-virtualmin-your-plugin-1.0-1.noarch.rpm` in the `/tmp` directory.

A similar script named [`makemoduledeb.pl`](https://raw.githubusercontent.com/webmin/webmin/master/makemoduledeb.pl) exists for Debian and derivatives.

### Plugin CGI scripts

Because a plugin is just a Webmin module, it can contain `.cgi` scripts like any other module. These can be useful for displaying additional information about the feature that the plugin manages, or for managing objects within that feature (such as mailing lists or user accounts). Most plugins will not need to include any CGI scripts, as their functionality is provided entirely by implementing the API functions described below.

You can see some examples by looking at the Nginx plugin.

### The plugin API

The core functionality of a plugin lies in its implementation of an API that Virtualmin calls when performing tasks such as enabling or disabling the plugin's feature for a domain. All of these functions must be defined in the file `virtual_feature.pl`, which should be located in the plugin's directory. The specific functions you define may vary, depending on the functionality your plugin is implementing.

For each function the name, supplied parameters, description and an example implementation are shown.

Many functions are passed a domain object as a parameter. This is simply a hash reference that is used internally by Virtualmin to store information about a virtual server. Some of the useful keys in the hash are:
| Parameter | Description |
|-----------|-------------|
| `dom`     | The domain name, like foo.com |
| `user`    | The administration username for the domain |
| `home`    | The server's home directory |
| `ip`      | The server's IP address (which may be virtual or shared) |

In addition, for each feature the domain has enabled, the code for that feature will be set to `1` in the hash. For example, a domain with a website has `web` set to `1`, for email the code is `mail`, and for a Webmin login the code is `webmin`. Virtualmin will add an entry for your plugin when its feature is enabled for the domain, the code for which will be the same as the plugin's directory.

### Core functions

Functions in this section must be implemented by all plugins.

#### feature_name()

This must return a short name for the feature, like _My plugin_.

```perl
sub feature_name
{
return "My plugin name";
}
```

### Functions for features

The most common use for plugins is to add a new feature that can be selected when a virtual server is created or modified. The functions listed in this section should be implemented in this case, although not all are mandatory.

#### feature_label(edit-form)

This must return a longer name for the feature, for display in the server creation and editing pages. The `edit-form` parameter can be used to determine which page is calling the function.
```perl
sub feature_label
{
return "Enable my plugin";
}
```

#### feature_check()

This optional function will be called when the plugin is registered by Virtualmin, to check that all of its dependencies are met. It must return undefined if everything is alright, or an error message if some program or service that the plugin depends upon is missing. If not implemented, Virtualmin will assume that the plugin has no dependencies.

```perl
sub feature_check
{
if (! &has_command("someprogram")) {
  return "The commmand someprogram required by this plugin is not installed";
  }
else {
  return undef;
  }
}
```

#### feature_losing(domain)

This should return text to be displayed when this feature is being removed from a domain. The domain parameter is the Virtualmin domain hash reference for the server the feature is being removed from.

```perl
sub feature_losing
{
return "My plugin for this virtual server will be disabled";
}
```

#### feature_disname(domain)

This optional function should return a description of what will be done when this feature is temporarily disabled. It is only needed if your plugin implements the `feature_disable` function, indicating that it can be disabled.

```perl
sub feature_disname
{
return "My plugin will be temporarily de-activated";
}
```

#### feature_clash(domain)

If activating this plugin feature in the given domain would clash with something already on the system, this function must return an error message. Otherwise, it can just return undef.

```perl
sub feature_clash
{
my ($d) = @_;
if (-r "/etc/someprogram/$d->{'dom'}") {
  return "Some program is already enabled for this domain";
  }
else {
  return undef;
  }
}
```

#### feature_depends(domain)

If implemented, this function should check if the given domain object has all the features enabled that would be required by this plugin. For example, if your plugin implements something that is accessible via the web, the domain must have the `web` feature set. If a dependency is missing it must return an error message explaining this, or undefined if everything is alright.

```perl
sub feature_depends
{
my ($d) = @_;
if ($d->{'web'}) {
  return undef;
  }
else {
  return "My plugin requires a website";
  }
}
```

#### feature_suitable(parentdom, aliasdom, superdom)

This function should check the given parent domain, alias target domain and super-domain objects, to ensure that they are suitable for this feature. It can be useful for preventing the plugin from being enabled in sub-domains or alias domains, where it may not be appropriate. It must return `1` if the feature can be used, or `0` if not. If not implemented, Virtualmin will not allow use of your plugin.

```perl
sub feature_suitable
{
my ($parent, $alias, $super) = @_;
if ($parent && !$parent->{'web'}) {
  return 0;
  }
else {
  return 1;
  }
}
```

#### feature_setup(domain)

This function will be called when the plugin feature is being enabled for some server, either at creation time or when the server is subsequently modified. It must perform whatever actions are needed, such as modifying config files, running commands and so on. It should notify the user of the features activation by calling the functions `first_print` and `second_print`, like so:

```perl
sub feature_setup
{
my ($d) = @_;
&$virtual_server::first_print("Setting up My plugin..");
my $ex = system("somecommand --add $d->{'dom'} >/dev/null 2>&1");
if ($ex) {
  &$virtual_server::second_print(".. failed!");
  return 0;
  }
else {
  &$virtual_server::second_print(".. done");
  return 1;
  }
}
```

#### feature_delete(domain)

This function is called when the feature is removed for some server, either at deletion time or when the server is modified. It must perform whatever config file changes or run whatever commands are needed to turn the feature off, and should use the `first_print` and `second_print` functions to notify the user about what it is doing.

```perl
sub feature_delete
{
my ($d) = @_;
&$virtual_server::first_print("Turning off up My plugin..");
system("somecommand --remove $d->{'dom'} >/dev/null 2>&1");
&$virtual_server::second_print(".. done");
}
```

#### feature_modify(domain, olddomain)

Whenever a virtual server is modified, this function will be called in all plugins. It should check if some attribute of the server that the plugin uses has changed (like dom or user), and update the appropriate config files. For example, if your feature configures some program that needs to know the virtual server's domain name, this function must compare `$domain→{'dom'}` and `$olddomain→{'dom'}` , and if they differ perform whatever updates are needed. It should only produce output when it actually does something though.

```perl
sub feature_modify
{
my ($d, $oldd) = @_;
if ($d->{'dom'} ne $oldd->{'dom'}) {
  &$virtual_server::first_print("Changing domain for My plugin ..");
  rename("/etc/someprogram/$oldd->{'dom'}", "/etc/someprogram/$d->{'dom'}");
  &$virtual_server::second_print(".. done");
  }
}
```

#### feature_disable(domain)

If this function is defined, it will be called when a virtual server with the plugin feature active is disabled. It should temporarily turn off access to the feature in a non-destructive way, so that it can be fixed later by a call to `feature_enable`.

```perl
sub feature_disable
{
my ($d) = @_;
&$virtual_server::first_print("Temporariliy disabling My plugin ..");
rename("/etc/someprogram/$d->{'dom'}", "/etc/someprogram/$d->{'dom'}.disabled");
&$virtual_server::second_print(".. done");
}
```

#### feature_enable(domain)

This function will be called when a virtual server with the plugin's feature is re-enabled. It should undo whatever changes were made by the `feature_disable` function. It only needs to be implemented if `feature_disable` is.

```perl
sub feature_enable
{
my ($d) = @_;
&$virtual_server::first_print("Re-enabling My plugin ..");
rename("/etc/someprogram/$d->{'dom'}.disabled", "/etc/someprogram/$d->{'dom'}");
&$virtual_server::second_print(".. done");
}
```

#### feature_bandwidth(domain, start, bwhash)

If defined, this function should report to Virtualmin the amount of bandwidth used by some virtual server since the given start Unix time. Bandwidth is the total number of bytes uploaded and downloaded, broken down by day. This function should scan whatever log file is available for the feature, extract upload and download counts for the domain, and add to the values in the `bwhash` hash reference.

Because bandwidth is accumulated by day, the `bwhash` hash is index by the number of days since 1st Jan 1970 GMT, which is simply a Unix time divided by 86400.

#### feature_webmin(domain, other-domains)

If you want your plugin to provide access to a Webmin module to the owners of virtual servers that have its feature enabled, this function can be used tell Virtualmin which modules access should be granted to. Typically, a plugin will grant access to its own module, which will have standard CGI scripts for use in further configuring whatever service the plugin enables.

This function must return a list of array references, each of which has two values:

1.  The directory of a module to grant access to (typically just `$module_name`)
    
2.  A hash reference of ACL values to set in that module for the domain owner. This is typically used to restrict domain owner to just the configurations relevant to the given domain.
    

The domain parameter is the virtual server object that this feature is enabled in, and other-domains is an array reference of other virtual servers that are owned by the same user as domain, and which have the plugin's feature enabled. This latter parameter should be taken into account in order to grant access to configure all of the user's servers.

```perl
sub feature_webmin
{
my ($d, $all) = @_;
my @fdoms = grep { $_->{$module_name} } @$all;
if (@fdoms) {
  return ( [ $module_name, { 'doms' => join(" ", @fdoms) } ] );
  }
else {
  return ( );
  }
}
```

#### feature_import(domain-name, user-name, db-name)

This function is called when an existing virtual server is being imported into Virtualmin. It should return `1` if the service configured by the plugin is already active for the given domain, perhaps because it was set up manually.

```perl
sub feature_import
{
my ($dname, $user, $db) = @_;
if (-r "/etc/someprogram/$dname") {
  return 1;
  }
else {
  return 0;
  }
}
```

#### feature_links(domain)

This optional function allows the plugin to provide additional links on the left menu when a domain with the feature enabled is selected. It must return a list of hash references, each containing the following keys:

| Key   | Description                                                                                  |
|-------|----------------------------------------------------------------------------------------------|
| mod   | The module the link is to, typically `$module_name`                                          |
| desc  | The text of the link                                                                         |
| page  | The CGI within the module that the link is to                                                |
| cat   | The left-side menu category that this link should appear under, such as `services` or `logs` |


A link to a module that the current Webmin user does not have access to will not be displayed. This means that you should almost always define `feature_webmin` as well, and make sure it returns the plugin's module.

```perl
sub feature_links
{
my ($d) = @_;
return ( { 'mod' => $module_name,
           'desc' => "Manage My plugin",
           'page' => 'index.cgi?dom='.$d->{'dom'},
           'cat' => 'services',
         } );
}
```

#### feature_always_links(domain)

This function is similar to `feature_links`, but is called regardless of which domain is selected. It can be used when you have a page that can be used even for virtual servers that don't have the plugin's feature active.

#### feature_validate(domain)

This function is optional, and is used by Virtualmin domain validation page. If implemented, it should check to ensure that all configuration files and other settings specific to the domain are setup properly. If any problems are found it should return an error message string, otherwise undefined.

```perl
sub feature_validate
{
my ($d) = @_;
if (!-r "/etc/someprogram/$d->{'dom'}") {
  return "Missing someprogram configuration file";
  }
else {
  return undef;
  }
}
```

#### virtusers_ignore(domain)

This optional function should be implemented by plugins that add and manage email aliases to a domain, for example, one that deals with mailing lists or auto-responders. Because you don't generally want these aliases showing up in the general list of those in the domain, it should return a list of full addresses to hide from the list.

```perl
sub virtusers_ignore
{
my ($d) = @_;
return ( "myplugin\@$d->{'dom'}" );
}
```

### Limits and template functions

Plugins can define fields that will appear on the owner limits page for a virtual server, and in server templates. Limits are useful if your plugin uses up resources of some kind, such as disk space for databases or memory for server processes. You can then allow the master administrator to define limits on these resources, via functions documented here.

Virtualmin templates are the location of most configuration settings that are used when creating new virtual servers. If your plugin has some adjustable settings that might be used when it is enabled, you can implement the functions below to add new input fields to templates. These can then be fetched in your plugin's `feature_setup` function with the `get_template` call.

#### feature_limits_input(domain)

This optional function should return a HTML inputs for limits specific to this plugin's feature. The initial values of those limits should be take from the `domain` object, where they must be stored in keys starting with the plugin's name (to avoid clashes). The HTML returned must make use of the `ui_table_row` function to format table columns.

```perl
sub feature_limits_input
{
my ($d) = @_;
if ($d->{$module_name}) {
  return &ui_table_row("Maximum My plugin databases",
    &ui_opt_textbox($module_name."limit", $d->{$module_name."limit"},
                    4, "Unlimited", "At most"));
  }
}
```

#### feature_limits_parse(domain, in)

This function parses the HTML form inputs generated by `feature_limits_input`. It should examine the `in` hash reference and update the `domain` object to set or clear limits based on the user's selections. If any errors are found it should return an error message string, or undefined if all is alright.

```perl
sub feature_limits_parse
{
my($d, $in) = @_;
if (!$d->{$module_name}) {
  # Do nothing
  }
elsif ($in->{$module_name."limit_def"}) {
  delete($d->{$module_name."limit"});
  }
else {
  $in->{$module_name."limit"} =~ /^\d+$/ || return "Limit must be a number";
  $d->{$module_name."limit"} = $in->{$module_name."limit"};
  }
return undef;
}
```

#### template_input(template)

This optional function must return HTML for editing template settings specific to this plugin. The `template` parameter is a hash reference to a template object, which contains settings for all features and plugins. Yours should only show and edit keys that start with the plugin's module name, so that they are properly merged when a non-default template is edited. HTML returned must make use of the `ui_table_row` function to format table columns.

```perl
sub template_input
{
my ($tmpl) = @_;
return &ui_table_row("Default My plugin database size",
  &ui_opt_textbox($module_name."dbsize",
                  $tmpl->{$module_name."dbsize"}, 5, "Default")."MB");
}
```

#### template_parse(template, in)

This function must check `in` for selections made by the user in the fields created by `template_input`, and then update the `template` hash reference. If there are any errors in the user's input it should return an error string, or undefined if everything is alright. Template keys must start with the plugin's module name, so that they are properly merged when a non-default template is edited.

```perl
sub template_parse
{
my ($tmpl, $in) = @_;
if ($in->{$module_name."dbsize_def"}) {
  delete($tmpl->{$module_name."dbsize"});
  }
else {
  $in->{$module_name."dbsize"} =~ /^\d+$/ || return "Database size must be a number";
  $tmpl->{$module_name."dbsize"} = $in->{$module_name."dbsize"};
  }
}
```

### Backup and restore functions

In the Virtualmin architecture, each feature and plugin is responsible for backing up and restoring configuration files associated with a domain, but which are stored outside the virtual server's home directory. If your plugin adds a feature to Virtualmin which stores data in some location that won't be included in a domain's regular backup, you should implement the functions in this section to ensure that it is backed up and restored.

#### feature_backup(domain, file, opts, all-opts)

This function should copy configuration files associated with the virtual server object `domain` and copy them to the path given by `file`. If there is just a single file then it can be copied directly, otherwise, your code should create a tar file of all required files and write it to that path.

The `first_print` and `second_print` functions should be called to tell the user that the backup is starting, and if it has succeeded or failed. If the copy was successful the function should return `1`, or `0` on failure.

```perl
sub feature_backup
{
my ($d, $file) = @_;
&$virtual_server::first_print("Copying My plugin configuration file ..");
my $ok = &copy_source_dest("/etc/someprogram/$d->{'dom'}", $file);
if ($ok) {
  &$virtual_server::second_print(".. done");
  return 1;
  }
else {
  &$virtual_server::second_print(".. copy failed!");
  return 0;
  }
}
```

#### feature_restore(domain, file, opts, all-opts)

This function is the opposite of `feature_backup`. It should take the data in the file passed in with the `file` parameter, and update local config files or databases for the virtual server defined in `domain` to restore those settings. The format of `file` will be exactly the same as whatever your plugin created in the `feature_backup` function, although it may be in a different location.

The `first_print` and `second_print` functions should be called to tell the user that the restore is starting, and if it has succeeded or failed. If the process was successful the function should return `1` or `0` on failure.

```perl
sub feature_restore
{
my ($d, $file) = @_;
&$virtual_server::first_print("Restoring My plugin configuration file ..");
my $ok = &copy_source_dest($file, "/etc/someprogram/$d->{'dom'}");
if ($ok) {
  &$virtual_server::second_print(".. done");
  return 1;
  }
else {
  &$virtual_server::second_print(".. copy failed!");
  return 0;
  }
}
```

### Other user interface functions

These functions aren't really related to any feature or capability that the plugin provides, instead, the allow it to add elements to the Virtualmin user interface.

#### settings_links

If implemented, this function should return a list of hash references, each of which defines a new link under the **System Settings** menu. These are only accessible to the master administrator, and appear regardless of which domain is selected. They typically link to global configuration pages for the plugin.

Each hash must contain the following keys:

| Key       | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| link      | The URL path to link to, relative to the Webmin root                        |
| title     | The text of the link                                                        |
| icon      | URL path to an icon for the link (deprecated)                               |
| cat       | The category for this settings link, such as `setting` or `email` or `ip`   |


```perl
sub settings_links
{
return ( { 'link' => "/$module_name/edit_config.cgi",
           'title' => "My plugin configuration",
           'icon' => "/$module_name/images/config.gif",
           'cat' => 'setting' } );
}
```

#### theme_sections

Theme displays various information on the right-hand system information page after you login, such as the status of servers, available updates and comparative quota use. This function allows your plugin to add sections of its own, typically to display global status information.

If defined, it must return a list of hash references, each containing the following keys:

| Key           | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| title         | The title of the section                                                    |
| html          | The HTML to appear within the section when it is opened. Forms that submit to CGIs within the plugin are perfectly fine |
| status        | Set to `1` if you want the section to be open by default, `0` if not        |
| for_master    | This must be set to 1 if the section should be visible to the master administrator |
| for_reseller  | Set to `1` if it should be visible to resellers                             |
| for_owner     | Set to `1` if it should be visible to individual domain owners              |


```perl
sub theme_sections
{
return ( { 'title' => 'My plugin status',
           'html' => &is_server_running() ? 'Some program is running fine'
                                          : 'Some program is down!',
           'status' => 0,
           'for_master' => 1 } );
}
```

### Functions for mailboxes

A Virtualmin plugin can also provide extra capabilities to virtual server users. This is done by implementing additional functions in the `virtual_feature.pl` file, similar to those used for adding a new server feature. This can be used for granting users access to some new service, like a game server or database, which is not supported natively by Virtualmin.

When a plugin adds capabilities to a user, additional inputs will typically appear on the user editing page. In additional, the plugin can define extra columns to appear in the user list, to display the status of the new user capabilities.

Most of the functions above take a user details hash reference as a parameter. Some of the useful keys in this hash are :

| Field       | Description                                                                   |
|-------------|-------------------------------------------------------------------------------|
| user        | The full Unix username of the user, which may have the domain name appended   |
| real        | The real name of the user, such as Jamie Cameron                              |
| home        | The user's home directory, which is typically under the virtual server's home |
| pass        | The user's encrypted Unix password                                            |
| plainpass   | If the user's password has just been changed or set, this field will contain the plain text password. It is not always available though, for example when editing a user without changing the password |


The functions that can be added to `virtual_feature.pl` to support user capabilities are:

#### mailbox_inputs(user, new, domain)

This function is called when the page for editing a virtual server user is displayed. The user parameter is a hash reference of user details, such as the login name, real name and home directory. The new parameter will be set to `1` if this is a new user, or `0` if editing an existing user. The domain parameter is a hash reference of virtual server information, as used in the plugin functions documented above.

This function must return HTML for the additional inputs to display, formatted to fit inside a 2-column table. This is best done with functions from `ui-lib.pl`, like:

```perl
sub mailbox_inputs
{
my ($user, $new, $d) = @_;
my $access = &check_user_access($user);
return &ui_table_row("Allow access to My plugin?",
                     &ui_yesno_radio("myplugin", $access));
}
```

It should detect the current state of the user, and use this information to determine the values of the inputs.

#### mailbox_validate(user, olduser, in, new, domain)

This function is called when the user form is saved, but before any changes are actually committed. It should check the form inputs in the in hash refe