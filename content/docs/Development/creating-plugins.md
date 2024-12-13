---
title: "Creating Plugins"
weight: 4010025
---

### Introduction to plugins

Before starting on a plugin, we suggest that you first read the Webmin [module developers](https://webmin.com/docs/development/creating-modules) guide.

A Virtualmin plugin is simply a Webmin module that can provide additional features to Virtualmin virtual servers or users. To do this, it must contain a Perl script called `virtual_feature.pl` which defines certain functions. The plugin module can then be registered by Virtualmin, and the feature it offers will then be available when creating new virtual domains.

A plugin typically adds a new possible to virtual servers, in addition to the standard features built into Virtualmin (website, DNS domain and so on). For example, it may enable reporting using some new statistics generator, or activate some game server in the virtual domain. Virtualmin will add options to the **Create Virtual Server** and **Edit Virtual Server** pages for enabling the plugin's feature, and call functions in its `virtual_feature.pl` when the feature is activated, de-activated or changed.

### Starting a plugin

The steps to start writing your own plugin are similar to those for creating a new Webmin module:

1.  Find the Webmin _root_ directory, which will be `/usr/libexec/webmin` on EL systems or `/usr/share/webmin` on Debian and derivatives.
    
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

#### Core functions

Functions in this section must be implemented by all plugins.

##### feature_name()

This must return a short name for the feature, like _My plugin_.

```perl
sub feature_name
{
return "My plugin name";
}
```

#### Functions for features

The most common use for plugins is to add a new feature that can be selected when a virtual server is created or modified. The functions listed in this section should be implemented in this case, although not all are mandatory.

##### feature_label(edit-form)

This must return a longer name for the feature, for display in the server creation and editing pages. The `edit-form` parameter can be used to determine which page is calling the function.
```perl
sub feature_label
{
return "Enable my plugin";
}
```

##### feature_check()

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

##### feature_losing(domain)

This should return text to be displayed when this feature is being removed from a domain. The domain parameter is the Virtualmin domain hash reference for the server the feature is being removed from.

```perl
sub feature_losing
{
return "My plugin for this virtual server will be disabled";
}
```

##### feature_disname(domain)

This optional function should return a description of what will be done when this feature is temporarily disabled. It is only needed if your plugin implements the `feature_disable` function, indicating that it can be disabled.

```perl
sub feature_disname
{
return "My plugin will be temporarily de-activated";
}
```

##### feature_clash(domain)

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

##### feature_depends(domain)

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

##### feature_suitable(parentdom, aliasdom, superdom)

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

##### feature_setup(domain)

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

##### feature_delete(domain)

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

##### feature_modify(domain, olddomain)

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

##### feature_disable(domain)

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

##### feature_enable(domain)

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

##### feature_bandwidth(domain, start, bwhash)

If defined, this function should report to Virtualmin the amount of bandwidth used by some virtual server since the given start Unix time. Bandwidth is the total number of bytes uploaded and downloaded, broken down by day. This function should scan whatever log file is available for the feature, extract upload and download counts for the domain, and add to the values in the `bwhash` hash reference.

Because bandwidth is accumulated by day, the `bwhash` hash is index by the number of days since 1st Jan 1970 GMT, which is simply a Unix time divided by 86400.

##### feature_webmin(domain, other-domains)

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

##### feature_import(domain-name, user-name, db-name)

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

##### feature_links(domain)

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

##### feature_always_links(domain)

This function is similar to `feature_links`, but is called regardless of which domain is selected. It can be used when you have a page that can be used even for virtual servers that don't have the plugin's feature active.

##### feature_validate(domain)

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

##### virtusers_ignore(domain)

This optional function should be implemented by plugins that add and manage email aliases to a domain, for example, one that deals with mailing lists or auto-responders. Because you don't generally want these aliases showing up in the general list of those in the domain, it should return a list of full addresses to hide from the list.

```perl
sub virtusers_ignore
{
my ($d) = @_;
return ( "myplugin@$d->{'dom'}" );
}
```

#### Limits and template functions

Plugins can define fields that will appear on the owner limits page for a virtual server, and in server templates. Limits are useful if your plugin uses up resources of some kind, such as disk space for databases or memory for server processes. You can then allow the master administrator to define limits on these resources, via functions documented here.

Virtualmin templates are the location of most configuration settings that are used when creating new virtual servers. If your plugin has some adjustable settings that might be used when it is enabled, you can implement the functions below to add new input fields to templates. These can then be fetched in your plugin's `feature_setup` function with the `get_template` call.

##### feature_limits_input(domain)

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

##### feature_limits_parse(domain, in)

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

##### template_input(template)

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

##### template_parse(template, in)

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

#### Backup and restore functions

In the Virtualmin architecture, each feature and plugin is responsible for backing up and restoring configuration files associated with a domain, but which are stored outside the virtual server's home directory. If your plugin adds a feature to Virtualmin which stores data in some location that won't be included in a domain's regular backup, you should implement the functions in this section to ensure that it is backed up and restored.

##### feature_backup(domain, file, opts, all-opts)

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

##### feature_restore(domain, file, opts, all-opts)

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

#### Other user interface functions

These functions aren't really related to any feature or capability that the plugin provides, instead, the allow it to add elements to the Virtualmin user interface.

##### settings_links

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

##### theme_sections

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

#### Functions for mailboxes

A Virtualmin plugin can also provide extra capabilities to virtual server users. This is done by implementing additional functions in the `virtual_feature.pl` file, similar to those used for adding a new server feature. This can be used for granting users access to some new service, like a game server or database, which is not supported natively by Virtualmin.

When a plugin adds capabilities to a user, additional inputs will typically appear on the user editing page. In additional, the plugin can define extra columns to appear in the user list, to display the status of the new user capabilities.

Most of the functions above take a user details hash reference as a parameter. Some of the useful keys in this hash are:

| Field       | Description                                                                   |
|-------------|-------------------------------------------------------------------------------|
| user        | The full Unix username of the user, which may have the domain name appended   |
| real        | The real name of the user, such as Jamie Cameron                              |
| home        | The user's home directory, which is typically under the virtual server's home |
| pass        | The user's encrypted Unix password                                            |
| plainpass   | If the user's password has just been changed or set, this field will contain the plain text password. It is not always available though, for example when editing a user without changing the password |


The functions that can be added to `virtual_feature.pl` to support user capabilities are:

##### mailbox_inputs(user, new, domain)

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

##### mailbox_validate(user, olduser, in, new, domain)

This function is called when the user form is saved, but before any changes are actually committed. It should check the form inputs in the in hash reference to make sure they are valid, and return either undefined on success, or an error message if there is some problem.

##### mailbox_save(user, olduser, in, new, domain)

This function must save the actual settings selected for this user, by updating whatever configuration files are needed for this capability. The `user` parameter is the update user details hash, containing his new username, password, real name and other attributes. The `olduser` parameter is the user hash from before the changes were made, and can be compared with user to detect username and other changes. `in` is the form inputs hash, new is a flag indicating if this is a new or edited user, and `domain` is the details of the virtual server this user is in.

```perl
sub mailbox_save
{
my ($user, $olduser, $in, $new, $d) = @_;
if ($user->{'user'} ne $olduser->{'user'}) {
  &set_user_access($olduser, 0);
  }
&set_user_access($user, $in->{'myplug'} ? 1 : 0);
}
```

##### mailbox_delete(user, domain)

This function is called when a user is deleted. It should check to see if he has the capability managed by this plugin enabled, and if so perform whatever tasks are needed to remove it. The parameters are the same as those for the `mailbox_save` function.

```perl
sub mailbox_save
{
my ($user, $d) = @_;
&set_user_access($user, 0);
}
```

##### mailbox_modify(user, olduser, domain)

This function gets called when a user is modified by some part of Virtualmin other than the **Edit Users** page, for example by the `modify-user.pl` command-line script. It should compare the old and new user objects to see if anything that this plugin uses has changed, such as the username or password. If so, it must update whatever configuration files the plugin uses.

```perl
sub mailbox_modify
{
my ($user, $olduser, $d) = @_;
if ($user->{'user'} ne $olduser->{'user'}) {
  my $oldaccess = &get_user_access($olduser);
  &set_user_access($olduser, 0);
  &set_user_access($user, $oldaccess);
  }
}
```

##### mailbox_header(domain)

If you want an additional column to appear in the user list indicating the state of this plugin's capability for users, this function should return the title for the column. Otherwise, it should just return undefined. If you don't need to define any extra column, then you don't even need to implement it.

```perl
sub mailbox_header
{
return "Plugin access";
}
```

##### mailbox_column(user, domain)

When a column exists for this plugin in the user list, this function will be called once for each user. It must return the text to display. If `mailbox_header` is not implemented, then this function doesn't need to be either.

```perl
sub mailbox_column
{
my ($user, $d) = @_;
return &check_user_access($user) ? "Yes" : "No";
}
```

##### mailbox_defaults_inputs(defs, domain)

Virtualmin Pro allows users to define various defaults for new users added to domains, on a per-domain basis. If your plugin wants to be able to add to these defaults, you can implement this function. The `defs` parameters is a hash reference for a user object containing the defaults, which should be checked to find the current status for your settings.

```perl
sub mailbox_defaults_inputs
{
my ($defs, $d) = @_;
return &ui_table_row("Allow access to My plugin by default?",
                     &ui_yesno_radio("myplugin", $defs->{'myplugin'}));
}
```

##### mailbox_defaults_parse(defs, domain, in)

This function is the counterpart to `mailbox_defaults_inputs`. It should check form inputs in `in` and use them to update the default settings object `defs`.

```perl
sub mailbox_defaults_parse
{
my ($defs, $d, $in) = @_;
$defs->{'myplugin'} = $in->{'myplugin'};
}
```

#### Database Functions

In the core package, Virtualmin supports MySQL/MariaDB and PostgreSQL databases. However, the plugin architecture allows developers to add new database types which can then be associated with virtual servers. Typically a plugin that adds databases will also implement the `feature_` functions, so that the new database type can be enabled for new or existing virtual servers, just as is the case for MySQL/MariaDB and PostgreSQL.

Because Virtualmin allows mailbox users to have access to some database types, the plugin can also include support for creating, listing and managing additional users associated with each database. Because not all database systems support granting a user full access to a database, implementation of the user-related functions is optional.

##### database_name()

This function must return the name of the database type.

```perl
sub database_name
{
return "FooSQL";
}
```

##### database_list(domain)

This function must return a list of the names of databases owned by the given `domain` object, each of which is a hash reference containing the following keys:

| Key     | Description                                                                                                    |
|---------|----------------------------------------------------------------------------------------------------------------|
| name    | The unique database name                                                                                       |
| type    | The database type code, typically set to `$module_name`                                                        |
| desc    | A description of the database type, usually the same as returned by `database_name`                            |
| users   | A flag, set to `1` if the database supports multiple users, `0` if not                                         |
| link    | A URL path for managing the database's contents. If you have not implemented this, it this key can be left out |


Typically the list of databases for a domain will be stored in the domain hash itself, in a key named `db_$module_name`. This removes the need for the plugin to store the domain-database mapping separately.

```perl
sub database_list
{
my ($d) = @_;
my @rv;
foreach my $db (split(/\s+/, $d->{'db_'.$module_name})) {
        push(@rv, { 'name' => $db,
                    'type' => $module_name,
                    'desc' => &database_name(),
                    'link' => "/$module_name/edit_dbase.cgi?db=$db" });
        }
return @rv;
}
```

##### databases_all()

This function should return a list of all databases known to the database server the plugin manages, even those not associated with any domain. Its return format should be the same as `database_list`.

```perl
sub databases_all
{
my @rv;
foreach my $dbname (&list_foosql_databases()) {
  push(@rv, { 'name' => $dbname,
              'type' => $module_name,
              'desc' => &database_name() });
  }
return @rv;
}
```

##### database_clash(domain, name)

This function must check if a database of the type managed by the plugin with the given `name` already exists, and if so return `1`. It is used by Virtualmin to prevent database name collisions at creation time. If no clash exists, it must return 0.

```perl
sub database_clash
{
my ($d, $name) = @_;
foreach my $db (&list_foosql_databases()) {
  return 1 if ($db eq $name);
  }
return 0;
}
```

##### database_create(domain, name)

This function is where the real work of creating a new database should happen. It must perform all the work needed to add a database and associate it with the virtual server, typically by adding it to the `db_$module_name` key in the `domain` hash reference. It should use `first_print` to output a message before creation starts, and `second_print` to display success or failure when done. It should return `1` if creation was successful, `0` if not.

Access to the new database must be granted to the virtual server's owner. For databases managed by some kind of server (like MySQL/MariaDB and PostgreSQL), the domain's username and password must be able to login to access the new database. These can be found in the `domain` hash in the `user` and `pass` keys.

```perl
sub database_create
{
my ($d, $name) = @_;
&$virtual_server::first_print("Creating FooSQL database $name ..");
my $err = &create_foosql_database($name);
if ($err) {
  &$virtual_server::second_print(".. failed : $err");
  return 0;
  }
else {
  &$virtual_server::second_print(".. done");
  $d->{'db_'.$module_name} .= " ".$name;
  return 1;
  }
}
```

##### database_delete(domain, name)

This function must delete a database of the type managed by this plugin, and remove access to it from the virtual server. Like `database_create`, it should use the `print` functions to display progress and status to the user.

```perl
sub database_delete
{
my ($d, $name) = @_;
&$virtual_server::first_print("Deleting FooSQL database $name ..");
my $err = &delete_foosql_database($name);
if ($err) {
  &$virtual_server::second_print(".. failed : $err");
  return 0;
  }
else {
  &$virtual_server::second_print(".. done");
  $d->{'db_'.$module_name} =~ s/\s+\Q$name\E//g;
  return 1;
  }
}
```

##### database_size(domain, name)

This function is called by Virtualmin when a user displays information about a database, and when computing a virtual server's total disk usage. It must return two numbers:

*   The size of the database on disk, in bytes.
    
*   The number of tables in the database.
    

```perl
sub database_size
{
my ($d, $name) = @_;
my $size = &disk_usage_kb("/var/foosql/$name");
my @tables = &list_foosql_tables($name);
return ( $size*1024, scalar(@tables) );
}
```

##### database_users(domain, name)

If the plugin's database type supports multiple logins, this function can be implemented to return a list of array references, each of which contains a login and password. Only users associated with `domain` and with access to the database specified by the `name` parameter need to be returned. If the password is encrypted, it is fine to use that as the second element of each array ref.

```perl
sub database_users
{
my ($d, $name) = @_;
return &execute_foosql_sql($name, "select login,password from users where db = '$name'");
}
```

##### database_create_user(domain, database, user, password)

This function must create a new database with with access to the database specified by the `database` parameter, which is a hash reference returned by `database_list`. The new user must have the login set by the `user` parameter, and password specified by `password`. If something goes wrong, it should call `error` function.

```perl
sub database_create_user
{
my ($d, $db, $user, $pass) = @_;
&execute_foosql_sql($db->{'name'}, "create user '$user' with password '$pass'");
}
```

##### database_modify_user(domain, old-database, database, old-user, user, password)

This function must modify the user in the database specified by the `old-database` parameter and named `old-user`, changing his login to `user` and password to `password` (if provided). If the modification fails, it should call `error` function.

```perl
sub database_modify_user
{
my ($db, $olddb, $db, $olduser, $user, $pass) = @_;
if ($user ne $olduser) {
  &execute_foosql_sql($olddb->{'name'}, "rename user '$olduser' to '$user'");
  }
if (defined($pass)) {
  &execute_foosql_sql($olddb->{'name'}, "alter user '$user' password '$pass'");
  }
}
```

##### database_delete_user(domain, user)

This function should delete the database user specified by the `user` parameter from all databases owned by the virtual server in `domain`.

```perl
sub database_delete_user
{
my ($d, $user) = @_;
foreach my $name (&list_foosql_databases()) {
  &execute_foosql_sql($name, "delete user '$user'");
  }
}
```

##### database_user(name)

Some database servers impose limits on the length or allowed characters in database logins. This function should check if the given `name` exceeds any such restrictions, and if so truncate or modify it to be valid. It should then return the modified version.

```perl
sub database_user
{
my ($name) = @_;
if (length($name) > 16) {
  $name = substr($name, 0, 16);
  }
return $name;
}