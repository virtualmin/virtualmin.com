---
title: "Creating Install Scripts"
weight: 4010030
---

A Virtualmin script installer is a small program that contains the information needed to install a web application into a virtual server's home directory, and configure it to run with that server's permissions and using its database. Most script installers are for PHP programs like WordPress or phpMyAdmin, but it is possible to write an installer for Node.js, Perl or Python.

Virtualmin Pro ships with a large number of [built-in installers](/docs/professional-features/#install-scripts), which domain owners can add to their websites using the **Install Scripts** link on the left menu. However, there are many applications that are not covered yet, simply because we don't have time to implement installers for them or they are used too rarely or too specific. For this reason, Virtualmin provides an API for adding your own script installers.

### Script installer files and directories 

Each script installer is a single file containing a set of Perl functions. Those that ship with Virtualmin Pro can be found in the `virtual-server/pro/scripts` directory under the Webmin root, which is usually `/usr/libexec/webmin` or `/usr/share/webmin`. If you open up one of those files (such as `phpbb.pl`) in a text editor, you will see a series of functions like:

```perl
sub script_phpbb_desc
{
return "phpBB";
}
```
```perl
sub script_phpbb_uses
{
return ( "php" );
}
```
```perl
sub script_phpbb_longdesc
{
return "A high powered, fully scalable, and highly customizable Open Source bulletin board package.";
}
```

Your own script installers will be in files if a similar format - the major difference will be the script ID, which appears in each function name after the word `script_`, like `phpbb` in the example above.

Script installers that are local to your Virtualmin installation are stored in the `/etc/webmin/virtual-server/scripts` directory. In most cases, each script is just a single `.pl` file, but it is possible for other source or support files to be part of the script too. In general though, most script installers download the files they need from the website of the application that they are installing.

### Script installer IDs 

Every script installer has a unique ID, which must consist of only letters, numbers and the underscore character. The ID determines both the installer filename (i.e. `phpbb.pl`), and the names of functions within the script (which must be like `script_phpbb_desc` as in the example above).

The same ID cannot be used by two different installers on the same system, even if one is built-in to Virtualmin and one is custom. For this reason, when writing an installer you should select an ID that is unlikely to clash with any that might be included in Virtualmin in the future.

### The lifetime of a script 

Virtualmin allows multiple instances of a single script to be installed, either on different domains or in different directories of the same domain. The installer defines the steps that must be taken to setup a script in some directory, in object-oriented coding parlance, it is like a **class**, while installed scripts are **objects**.

When a script is installed via the web interface, Virtualmin performs the following steps :

1. Checks if all required dependencies are satisfied, such as required commands, a database and a website.
2. If the script uses PHP, checks that the versions it supports are available on the system.
3. Displays a form asking for installation options, such as the destination directory and database.
4. Parses inputs from the form.
5. Checks if the same script is already installed in the selected directory.
6. Configures the domain's website to use the correct PHP version.
7. Downloads files needed by the script, such as its source code.
8. Installs any needed PHP, Node.js, Perl or Python modules.
9. Calls the script's install function. This typically does the following:  
        - Records the fact that the script has been installed.  
        - Configures PHP for the domain, to set any options that the script has requested.  
        - Restarts Apache.

### Script installer implementation 

In this section, the functions that each script installer must implement will be covered. Not all functions are mandatory, as some deal with PHP dependencies that make no sense if your script does not use PHP or if it has no non-core modules. The example code for each function is taken from the Wordpress blog installer, in `wordpress.pl`. This is a PHP application whose installation process is relatively simple, yet common to many other PHP programs.

In your own script, you would of course replace `scriptname` with the script ID you have selected.
Also, just like a Perl module, make sure your install script file ends with the line: 

```text
1;
```

#### script_scriptname_desc 

This function must return a short name for the script, usually a couple of words at most.

```perl
sub script_wordpress_desc
{
return "WordPress";
}
```

#### script_scriptname_longdesc

This function must return a longer description of the script, which will be displayed to users when they are selecting which script to install.

```perl
sub script_wordpress_longdesc
{
return "A semantic personal publishing platform with a focus on aesthetics, web standards, and usability";
}
```
#### script_scriptname_uses 

This must return a list of the languages the script uses. Supported language codes are *php*, *perl* and *cgi*. Most scripts will return only one.

```perl
sub script_wordpress_uses
{
return ( "php" );
}

```
#### script_scriptname_versions 

Must return a list of versions of the script that the installer supports. Most can only install one, but in some cases you may want to offer the user the ability to install development and stable versions of some application. The version the user chooses will be passed to many other functions as a parameter.

```perl
sub script_wordpress_versions
{
return ( "6.4.2", "5.9.3" );
}
```

#### script_scriptname_release_version

If this function exists and returns 1, version numbers are split on a dash character to extract the release number, and compared separately from the version. This is almost never needed in practice.
```perl
sub script_wordpress_release_version
{
return 1;
}
```

#### script_scriptname_release

May return a release number that indicates that a newer version of this script installer is available, even if the script version itself has not changed.
```perl
sub script_wordpress_release
{
return 2;
}
```

#### script_scriptname_realversion

If the script is typically upgraded outside of Virtualmin, this function must return the script version number by reading it from script's source code. This is used to determine if an upgrade is available, and to display the current version to users. If the script is not upgraded outside of Virtualmin, this function can be omitted.

```perl
sub script_wordpress_realversion
{
my ($d, $opts, $sinfo) = @_;
my $lref = &read_file_lines("$opts->{'dir'}/wp-includes/version.php", 1);
foreach my $l (@$lref) {
	if ($l =~ /wp_version\s*=\s*'([0-9\.]+)'/) {
		return $1;
		}
	}
return undef;
}
```

#### script_scriptname_category (optional) 

This function should return a category for the script, which controls how it is categorized in Virtualmin's list of those available to install. At the time of writing, available categories were *Blog*, *Calendar*, *Commerce*, *Community*, *CMS*, *Database*, *Development*, *Email*, *Helpdesk*, *Photos*, *Projects*, *Survey*, *Tracker* and *Wiki*.

```perl
sub script_wordpress_category
{
return "Blog";
}
```
#### script_scriptname_php_vers

Scripts that use PHP must implement this function, which should return a list of versions the installed application can run under. On systems that have more than one version of PHP installed, Virtualmin will configure the website to use the correct version for the path the script is installed to.

```perl
sub script_wordpress_php_vers
{
return ( 8 );
}
```
#### script_scriptname_php_fullver

If the script being installed is written in PHP, this function must return the version this script installer supports depending on the version of the script being installed. This is used to determine if the correct PHP version is configured for the virtual server, and if not to prevent the script from being installed. For example, the following code fragment from the WordPress installer returns 8.1.27 for versions 6.4.2 and above, and 7.4.33 for older versions.

```perl
sub script_wordpress_php_fullver
{
my ($d, $ver, $sinfo) = @_;
if (&compare_versions($ver, "6.4.2") >= 0) {
	return "8.1.27";
	}
else {
	return "7.4.33";
	}
}
```

#### script_scriptname_php_vars

If the script being installed requires any non-default PHP configuration options, this function should return a list of them. The first element of each list entry is the name of the option, the second is its value, and the third is a `+` or `-` to indicate if the value should be larger or lower than in order to be added. For example, the following code fragment from the WordPress installer sets the `memory_limit` and `max_execution_time` options to 128M and 60 seconds respectively, and enables file uploads and sets the maximum upload size to 10MB:


```perl
sub script_wordpress_php_vars
{
return ( [ 'memory_limit', '128M', '+' ],
         [ 'max_execution_time', 60, '+' ],
         [ 'file_uploads', 'On' ],
         [ 'upload_max_filesize', '10M', '+' ],
         [ 'post_max_size', '10M', '+' ] );
}
```

#### script_scriptname_php_modules

If the application being installed is written in PHP and requires any non-core PHP modules, this function should return them as a list. Any script that talks to a MySQL database will need the `mysql` module, or `pgsql` if it uses PostgreSQL. Virtualmin will attempt to install the required modules if they are missing from the system.

```perl
sub script_wordpress_php_modules
{
return  ("mysql", "gd", "json", "xml" );
}
```

#### script_scriptname_php_optional_modules

The same as `script_scriptname_php_modules`, but for optional PHP modules. Virtualmin will attempt to install them if they are missing from the system.

```perl
sub script_wordpress_php_optional_modules
{
return ( "curl", "ssh2", "pecl-ssh2", "date",
         "hash", "imagick", "pecl-imagick", 
         "iconv", "mbstring", "openssl",
         "posix", "sockets", "tokenizer" );
}
```

#### script_scriptname_pear_modules

Pear is a repository of additional modules for PHP, which some Virtualmin scripts make use of. If the application you are installing requires some Pear modules, this function can be implemented to return a list of module names. At installation time, Virtualmin will check for and try to automatically install the needed modules.

```perl
sub script_egroupware_pear_modules
{
return ( "Auth_SASL", "Net_IMAP", "Net_Sieve",
         "XML_Feed_Parser", "Log" );
}
```
#### script_scriptname_perl_modules 

For scripts written in Perl that require modules that are not part of the standard Perl distribution, you should implement this function to return a list of additional modules required. Virtualmin will try to automatically install them from default system repositories or CPAN where possible, and will prevent the script from being installed if they are missing.

```perl
sub script_twiki_perl_modules
{
return ( "CGI::Session", "Net::SMTP" );
}

```
#### script_scriptname_python_modules

For scripts written in Python that require modules that are not part of the standard distribution, you should implement this function to return a list of additional modules required. Virtualmin will try to automatically install them from default system repositories where possible, and will prevent the script from being installed if they are missing.

```perl
sub script_django_python_modules
{
my ($d, $ver, $opts) = @_;
my ($dbtype, $dbname) = split(/_/, $opts->{'db'}, 2);
return ( "setuptools", $dbtype eq "mysql" ? "MySQLdb" : "psycopg2" );
}
```
#### script_scriptname_depends(&domain, version) 

This function must check for any dependencies the script has before it can be installed, such as a MySQL database or virtual server features. It is given two parameters. The `domain` hash containing details of the virtual server being installed into, and the `version` number selected.

```perl
sub script_wordpress_depends
{
my ($d, $ver) = @_;
&has_domain_databases($d, [ "mysql" ]) ||
        return "WordPress requires a MySQL database" if (!@dbs);
&require_mysql();
if (&compare_versions(&mysql::get_mysql_version(), "5.7") < 0) {
        return "WordPress requires MySQL version 5.7 or higher";
        }
return undef;
}
```

Also, this function can return a list of missing dependency error messages instead of a single string, which is more user-friendly as they are all reported to users at once.

#### script_scriptname_dbs(&domain, version) 

If defined, this function should return a list of database types that the script can use. At least one of these types must be enabled in the virtual server the script is being installed into.

```perl
sub script_wordpress_dbs
{
my ($d, $ver) = @_;
return ( "mysql" );
}
```

#### script_scriptname_params(&domain, version, &upgrade) 

This function is responsible for generating the installation form inputs, such as the destination directory and target database. When upgrading (indicated by the `upgrade` hash being non-null) these are fixed and should just be displayed to the user. Otherwise, it must return inputs for selecting them. The functions return value must be HTML for form fields, generated using the `ui_table_row` and other `ui_` functions.

The example below from Wordpress is a good source to copy from, as most PHP scripts that you would want to install will need a target directory and a database. The `ui_database_select` function can be used to generate a menu of databases in the domain, with an option to have a new one created automatically just for this script.

```perl
sub script_wordpress_params
{
my ($d, $ver, $upgrade) = @_;
my $rv;
my $hdir = &public_html_dir($d, 1);
if ($upgrade) {
        # Options are fixed when upgrading
        my ($dbtype, $dbname) = split(/_/, $upgrade->{'opts'}->{'db'}, 2);
        $rv .= &ui_table_row("Database for WordPress tables", $dbname);
        my $dir = $upgrade->{'opts'}->{'dir'};
        $dir =~ s/^$d->{'home'}\///;
        $rv .= &ui_table_row("Install directory", $dir);
        }
else {
        # Show editable install options
        my @dbs = &domain_databases($d, [ "mysql" ]);
        $rv .= &ui_table_row("Database for WordPress tables",
                     &ui_database_select("db", undef, \@dbs, $d, "wordpress"));
        $rv .= &ui_table_row("Install sub-directory under <tt>$hdir</tt>",
                             &ui_opt_textbox("dir", "wordpress", 30,
                                             "At top level"));
        }
return $rv;
}

```
#### script_scriptname_parse(&domain, version, &in, &upgrade) 

This function takes the inputs from the form generated by `script_scriptname_params`, parses them an returns an object containing options that will be used when the installation actually happens. If it detects any errors in the input, it should return an error message string instead.

As in the example below, when upgrading the options are almost never changed, so it should return just `$upgrade->{'opts'}`, which are the options it was originally installed with. Otherwise, it should look at the hash reference `in` which will contain all CGI form variables, and use that to construct a hash of options. The most important keys in the hash are `dir` (the installation target directory) and `path` (the URL path under the domain's root).

```perl
sub script_wordpress_parse
{
my ($d, $ver, $in, $upgrade) = @_;
if ($upgrade) {
        # Options are always the same
        return $upgrade->{'opts'};
        }
else {
        my $hdir = &public_html_dir($d, 0);
        $in{'dir_def'} || $in{'dir'} =~ /\S/ && $in{'dir'} !~ /\.\./ ||
                return "Missing or invalid installation directory";
        my $dir = $in{'dir_def'} ? $hdir : "$hdir/$in{'dir'}";
        my ($newdb) = ($in->{'db'} =~ s/^\*//);
        return { 'db' => $in->{'db'},
                 'newdb' => $newdb,
                 'dir' => $dir,
                 'path' => $in{'dir_def'} ? "/" : "/$in{'dir'}", };
        }
}

```
#### script_scriptname_check(&domain, version, &opts, &upgrade) 

This function must verify the installation options in the `opts` hash, and return an error message if any are invalid (or `undef` if they all look alright). Possible problems include a missing or invalid install directory, a clash with an existing install of the same script in the directory, or a clash of tables in the selected database. As the example below shows, the `find_database_table` function provides a convenient way to search for tables by name or regular expression, for most applications, all tables used will be prefixed by a short code, like `wp_` in the case of WordPress.

If you are wondering why these checks are not performed in `script_scriptname_parse`, the reason is that when a script is installed from the command line, that function is never called. Instead, install options are generated using a different method, and then validated by this function.

```perl
sub script_wordpress_check
{
my ($d, $ver, $opts, $upgrade) = @_;
$opts->{'dir'} =~ /^\// || return "Missing or invalid install directory";
$opts->{'db'} || return "Missing database";
if (-r "$opts->{'dir'}/wp-login.php") {
        return "WordPress appears to be already installed in the selected directory";
        }
my ($dbtype, $dbname) = split(/_/, $opts->{'db'}, 2);
my $clash = &find_database_table($dbtype, $dbname, "wp_.*");
$clash && return "WordPress appears to be already using the selected database (table $clash)";
return undef;
}

```
#### script_scriptname_files(&domain, version, &opts, &upgrade) 

This is the function where the script installer indicates to Virtualmin what files need to be downloaded for the installation to go ahead. Most scripts need only one, which contains the source code but it is possible to request any number, even zero.

The function must return a list of hash references, each of which should contain the following keys:

| Key      | Description                                                                                       |
|----------|---------------------------------------------------------------------------------------------------|
| `name`   | A unique name for this file, used later by the `script_scriptname_install` function               |
| `file`   | A short filename for the file, to which it will be saved in `/tmp/.webmin` after being downloaded |
| `url`    | The URL that it can be downloaded from                                                            |
| `nocache`| Optional, but can be set to 1 to force a download even if the URL is cached by Virtualmin         |

In most cases, the `ver` parameter is used in the URL and filename to get the correct source archive.

```perl
sub script_wordpress_files
{
my ($d, $ver, $opts, $upgrade) = @_;
my @files = ( {
           'name' => "source",
           'file' => "latest.tar.gz",
           'url' => "https://wordpress.org/wordpress-6.4.2.tar.gz",
           'nocache' => 1 } );
return @files;
}
```
#### script_scriptname_commands 

If your script installer requires any commands to do its job that may not be available on a typical Unix system, this function should return a list of them. In most cases, it just returns the programs needed to un-compress the `tar.gz` or `zip` file containing the source.

```perl
sub script_wordpress_commands
{
return ( "unzip" );
}
```

#### script_scriptname_install(&domain, version, &opts, &files, &upgrade, username, password) 

This function is where the real work of installing a script actually happens. It is responsible for setting up the database, un-compressing the downloaded source, copying it to the correct directory, modifying configuration files to match the domain and database, and returning a URL that can be used to login. If anything goes wrong, it must return an array whose first element is zero, and the second is an error message.

Upon success, it must return an an array containing the following elements:

* The number 1 (indicating success)
* An HTML message to display to the user. This should include a link that can be used to access the script.
* A description of where it was installed.
* The URL that can be used to access the script.
* The initial administration login, if any.
* The initial administration password, if any.

If given, the username and password parameters should be used to set the initial administrative login for the script. If not, it should default to the domain's login and password.

The code snippets below show each step of the install process, taken from the standard WordPress installer. The first part simply parses the database connection options and creates a new DB for the script, if one was requested:

```perl
sub script_wordpress_install
{
my ($d, $version, $opts, $files, $upgrade) = @_;
my ($out, $ex);
if ($opts->{'newdb'} && !$upgrade) {
        my $err = &create_script_database($d, $opts->{'db'});
        return (0, "Database creation failed : $err") if ($err);
}
my ($dbtype, $dbname) = split(/_/, $opts->{'db'}, 2);
my $dbuser = $dbtype eq "mysql" ? &mysql_user($d) : &postgres_user($d);
my $dbpass = $dbtype eq "mysql" ? &mysql_pass($d) : &postgres_pass($d, 1);
my $dbphptype = $dbtype eq "mysql" ? "mysql" : "psql";
my $dbhost = &get_database_host($dbtype);
my $dberr = &check_script_db_connection($dbtype, $dbname, $dbuser, $dbpass);
return ( 0, "Database connection failed : $dberr" ) if ($dberr);
```

The next step is to extract the downloaded source code, and then copy it to the created destination directory. This is done by calling the `unzip` and `cp` commands as the Virtualmin domain owner, so that there is no risk of files that he is not supposed to have access to being over-written. The source code temporary file can be found from the `files` hash reference in the `source` key, which was defined by the `script_scriptname_files` function.

Note how the code checks for expected files after extracting and copying the source, to make sure that the commands called actually succeeded.

```perl
# Create target dir
if (!-d $opts->{'dir'}) {
        $out = &run_as_domain_user($d, "mkdir -p ".quotemeta($opts->{'dir'}));
        -d $opts->{'dir'} ||
                return ( 0, "Failed to create directory : <tt>$out</tt>." );
        }

# Extract tar file to temp dir
my $temp = &transname();
mkdir($temp, 0755);
chown($d->{'uid'}, $d->{'gid'}, $temp);
$out = &run_as_domain_user($d, "cd ".quotemeta($temp).
                               " && unzip $files->{'source'}");
my $verdir = "wordpress";
-r "$temp/$verdir/wp-login.php" ||
        return ( 0, "Failed to extract source : <tt>$out</tt>." );

# Move html dir to target
$out = &run_as_domain_user($d, "cp -rp ".quotemeta($temp)."/$verdir/* ".
                               quotemeta($opts->{'dir'}));
my $cfileorig = "$opts->{'dir'}/wp-config-sample.php";
my $cfile = "$opts->{'dir'}/wp-config.php";
-r $cfileorig || return ( 0, "Failed to copy source : <tt>$out</tt>." );
```

Most scripts or applications have a configuration file of some kind that defines where to access the database, what domain they are running under, the URL path, and possibly an initial login and password. The script installers is responsible for creating or modifying this file to use the database connection details supplied by the `opts` parameter, as shown in the code snippet below.

Be careful when upgrading, as in general the existing configuration file will be valid for the new version. This means that it doesn't need to be re-created, and should be preserved during the upgrade process if necessary.

```perl
# Copy and update the config file
if (!-r $cfile) {
        &run_as_domain_user($d, "cp ".quotemeta($cfileorig)." ".
                                      quotemeta($cfile));
        my $lref = &read_file_lines($cfile);
        foreach my $l (@$lref) {
                if ($l =~ /^define\('DB_NAME',/) {
                    $l = "define('DB_NAME', '$dbname');";
                        }
                if ($l =~ /^define\('DB_USER',/) {
                    $l = "define('DB_USER', '$dbuser');";
                        }
                if ($l =~ /^define\('DB_HOST',/) {
                    $l = "define('DB_HOST', '$dbhost');";
                        }
                if ($l =~ /^define\('DB_PASSWORD',/) {
                    $l = "define('DB_PASSWORD', '$dbpass');";
                        }
                if ($opts->{'multi'}) {
                    if ($l =~ /^define\('VHOST',/) {
                            $l = "define('VHOST', '');";
                            }
                    if ($l =~ /^\$base\s*=/) {
                            $l = "\$base = '$opts->{'path'}/';";
                            }
                    }
                }
        &flush_file_lines($cfile);
        }
```

In some cases, a script will come with a file of SQL statements that can be used to create and populate tables in its database. Others like WordPress do this automatically when they are first accessed. If the application you are installing needs SQL to be run as part of its setup process, you can use code like the fragment below, which was taken from the WebCalendar installer:

```perl
if (!$upgrade) {
        if ($dbtype eq "mysql") {
		my $sqlfile = "$opts->{'dir'}/install/sql/tables-mysql.sql";
		&require_mysql();
		my ($err, $out) = &mysql::execute_sql_file($dbname, $sqlfile, $dbuser, $dbpass);
		$err && return (0, "Failed to run database setup script : <tt>$out</tt>.");
		}
	elsif ($dbtype eq "postgres") {
		my $sqlfile = "$opts->{'dir'}/install/sql/tables-postgres.sql";
		&require_postgres();
		my ($err, $out) = &postgresql::execute_sql_file($dbname, $sqlfile, $dbuser, $dbpass);
		$err && return (0, "Failed to run database setup script in $dbname : <tt>$out</tt>.");
		}
    }
```

The final part of the `script_scriptname_install` function is returning information to Virtualmin about how to access the new script, and where it is installed. In some cases, a script will have two URLs. The one for administration, which should be references in the second element of the returned array, and the one for general use, which should be in the fourth element.

```perl
my $url = &script_path_url($d, $opts).
             ($upgrade ? "wp-admin/upgrade.php" : "wp-admin/install.php");
my $userurl = &script_path_url($d, $opts);
my $rp = $opts->{'dir'};
$rp =~ s/^$d->{'home'}\///;
return ( 1, "WordPress installation complete. It can be accessed at <a href='$url'>$url</a>.", "Under $rp using $dbphptype database $dbname", $userurl );
}
```
#### script_scriptname_uninstall(&domain, version, &opts) 

This function is responsible for cleaning up all files and database tables created by the install code. It is only called when the user deletes a script from a domain, *not* when upgrading. If most cases, determining which tables to remove is simple, as they all start with some prefix (like `wp_` in the case of WordPress).

If the installer has created any cron jobs, server processes, custom Apache configuration entries or email aliases, they must also be removed by this function. On success, it should return a two-element array whose first element is `1`, and the second a message to display to the user. On failure, it should return `0` and an error message explaining what went wrong.

```perl
sub script_wordpress_uninstall
{
my ($d, $version, $opts) = @_;

# Remove the contents of the target directory
my $derr = &delete_script_install_directory($d, $opts);
return (0, $derr) if ($derr);

# Remove all wp_ tables from the database
my ($dbtype, $dbname) = split(/_/, $opts->{'db'}, 2);
if ($dbtype eq "mysql") {
        # Delete from MySQL
        &require_mysql();
        foreach $t (&mysql::list_tables($dbname)) {
                if ($t =~ /^wp_/) {
                        &mysql::execute_sql_logged($dbname,
                                "drop table ".&mysql::quotestr($t));
                        }
                }
        }
else {
        # Delete from PostgreSQL
        &require_postgres();
        foreach $t (&postgresql::list_tables($dbname)) {
                if ($t =~ /^wp_/) {
                        &postgresql::execute_sql_logged($dbname,
                                "drop table $t");
                        }
                }
        }

# Take out the DB if it was created for this script
if ($opts->{'newdb'}) {
        &delete_script_database($d, $opts->{'db'});
        }

return ( 1, "WordPress directory and tables deleted." );
}
```
#### script_scriptname_passmode(&domain, version) 

Most scripts that setup an initial login and password use those from the virtual server the script is being added to. However, Virtualmin can prompt the user for alternative authentication details if you implement this function. All it has to do is return one of the following numeric codes:

| Code   | Description                                |
|--------|--------------------------------------------|
| `1`    | Script needs a username and password       |
| `2`    | Script only needs a password               |
| `3`    | Script only needs a username               |


The custom login and password entered by the user will be passed to the `script_scriptname_install` function. If your script installer doesn't setup an initial login at all, you can either omit this function or have it return `0`. 

Additionally, this function can return an array containing a numeric code, minimum password length and regular expression that the password must match. For example, the following code fragment from the WordPress installer requires a password that is at least 8 characters long, and contains at least one upper-case letter, one lower-case letter and one digit.

```perl
sub script_wordpress_passmode
{
return ( 1, 8, '^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$' );
}
```

#### script_scriptname_db_conn_desc()

This function provides a description of the method and location used by the script to store its database connection information. It is particularly utilized by Virtualmin when changes are made to the database credentials. Essentially, the function returns a hash reference. The keys in this hash reference are filenames where the connection details are stored. The values are additional hash references that outline the process for locating and updating old connection details with new ones. To illustrate, let's consider an example from the WordPress installer:

```perl
sub script_wordpress_db_conn_desc
{
my $db_conn_desc = 
    { 'wp-config.php' => 
        {
           'dbpass' => 
           {
               'replace' => [ 'define\(\s*[\'"]DB_PASSWORD[\'"],' =>
                              'define(\'DB_PASSWORD\', \'$$sdbpass\');' ],
               'func' => 'php_quotemeta',
               'func_params' => 1,
           },
           'dbname' => 
           {
               'replace' => [ 'define\(\s*[\'"]DB_NAME[\'"],' => "define('DB_NAME', '\$\$sdbname');" ],
           },
           'dbuser' => 
           {
               'replace' => [ 'define\(\s*[\'"]DB_USER[\'"],' => "define('DB_USER', '\$\$sdbuser');" ],
           },
           'dbhost' => 
           {
               'replace' => [ 'define\(\s*[\'"]DB_HOST[\'"],' => "define('DB_HOST', '\$\$sdbhost');" ],
           },
        }
    };
return $db_conn_desc;
}
```

The above code fragment returns a hash reference with a single key, `wp-config.php`. This is the name of the file where the database connection details are stored. The file name is relative to the installation directory. The value of this key is another hash reference. This hash reference contains four keys, `dbpass`, `dbname`, `dbuser` and `dbhost`. These keys correspond to the database connection details that are stored in the file.

### Installation variants

The style of installation code above will work for most scripts that you want to install, but in some cases a slightly different approach is needed. This section covers two of them - scripts with their own configuration generators that cannot be easily replaced by creating the config file yourself, and installers which use a separate server process.

#### HTTP requests 

Many PHP applications come with a script that asks the user a series of questions, like the database login and name, domain name, and initial administration username and password. The script then uses this information to create a config file and perhaps populated the database.

Ideally, Virtualmin script installers should create any needed config files directly, but in some cases this is too difficult due to their complexity. Similarly, it may not be possible to create and populate all the needed database tables if no SQL file is provided for doing this. In cases like this, it is simpler for a script installer to invoke the application's install code directly, by making an HTTP request to the correct URL.

To figure out the installation URL and parameters it needs, you will need to install the application manually and run through its install process in a browser. The browser developer tools can be used to see what HTTP requests are made, and what parameters are passed to them.

The following code fragment from the `script_mybb_install` function of the `mybb.pl` installer gives an example of this:

```Perl
# Call database configuration page
my $dnengine = $dbtype eq "mysql" ? "mysqli" : "pgsql";
my @params = (
        [ "dbengine", $dnengine ],
        [ "config[$dnengine][dbhost]", $dbhost ],
        $dbtype eq "mysql" ? [ "sql_port", '3306' ] : [],
        [ "config[$dnengine][dbuser]", $dbuser ],
        [ "config[$dnengine][dbpass]", $dbpass ],
        [ "config[$dnengine][dbname]", $dbname ],
        [ "config[$dnengine][tableprefix]", "mybb_" ],
        [ "config[$dnengine][encoding]", "utf8" ]);
my $params = join("&", map { $_->[0]."=".&urlize($_->[1]) } @params);
my $ipage = "$opts->{'path'}/install/index.php?action=create_tables";
my ($iout, $ierror);
&post_http_connection($d, $ipage, $params, \$iout, \$ierror);
if ($ierror) {
        return ( -1, "Database initialization failed : $ierror" );
        }
elsif ($iout !~ /all\s+tables\s+have\s+been\s+created/i) {
        return ( -1, "Database initialization failed" );
        }
```

As you can see, it makes use of the `post_http_connection` function provided by Virtualmin which makes an HTTP POST request, which is expected by most applications. If the form is submitted using a GET, you could use Webmin's `http_download` function instead.

In some cases, the installation process is a multi-step wizard, which means that you will need to make several POST requests with different parameters, and possibly parse the output from each.

#### Separate server process

##### Setup separate server process
Some applications installed by Virtualmin are actually run by a separate server process. For example Node.js applications are run by the Node.js server. To link them up to the domain's actual website, proxy directives are added that pass all requests to a path like `/nodejs` to a local webserver at a URL like `http://127.0.0.1:3000`.

Your installer needs to manage a server process, such as Node.js, which operates independently. To facilitate this, it should automatically create the service and remove it when the script is deleted. This functionality is achieved through the `script_setup_service` and `script_delete_service` functions in Virtualmin. Moreover, Virtualmin offers additional commands like `script_stop_service`, `script_start_service`, and `script_status_service` for more granular control of the service.

Furthermore, your application requires a unique port to operate, which can be assigned using Virtualmin's `allocate_proxy_port` function. Once the port is allocated, you'll need to set up a proxy to redirect requests from a webserver to your application. This setup is accomplished using the `setup_proxy` function provided by Virtualmin.

The following code fragment from the `script_nodejs_install` function of the `nodejs.pl` installer shows how this is done:

```perl
# Pick a free port
my $port;
if (!$upgrade) {
	$port = &allocate_port(undef, 1);
	$opts->{'port'} = $port;
	}
# Create the server process
&script_setup_service($d, {
        name => 'nodejs',
        descname => 'Node.js',
        port => $port,
        service => {
                type => "simple",
                startcmd => "/home/example/public_html/nodejs/bin/node /home/example/public_html/nodejs/server.js",
                logstd => "$opts->{'dir'}/node.log",
                logerr => "$opts->{'dir'}/node.err",
                }
        });
# Start the server process
&script_start_service($d, "nodejs", $port);

# Configure webserver to proxy to it
&setup_proxy($d, $opts->{'path'}, $port);

```

Note that the `script_setup_service` function already takes care of enabling the server process to start automatically at boot.

##### Remove separate server process

Your script should include the `script_scriptname_uninstall` function, designed to thoroughly remove all traces of the application. This includes shutting down server process, removing service scripts, and clearing webserver configuration entries. Virtualmin simplifies this task by offering a range of convenience functions, which are demonstrated in the following code example:

```perl
sub script_nodejs_uninstall
{
my ($d, $version, $opts) = @_;

# Shut down and delete the service
&script_delete_service($d, "nodejs", $opts->{'port'});

# Remove webserver config entry for /nodejs
&delete_proxy($d, $opts->{'path'});

# Remove the contents of the target directory
my $derr = &delete_script_install_directory($d, $opts);
return ( 0, $derr ) if ($derr);

# Deletion complete
return ( 1, "Node.js uninstallation complete." );
}
```

When Virtualmin deletes a domain, it does not call the `uninstall` functions for any installed scripts, as this would generally be a waste of time, as their directories and databases are going to be removed anyway. In the case of service applications, this is not true, as their service scripts must be cleaned up.

To ensure that this happens, your script installer must implement the `script_scriptname_stop` function, which only has to shut down server process and remove service script. This function is only called at virtual server deletion time, and is optional for installers that don't require it.

```perl
# Deletes service file upon domain deletion
sub script_nodejs_stop
{
my ($d, $sinfo) = @_;
&script_delete_service($d, "nodejs", $sinfo->{'opts'}->{'port'});
}
```