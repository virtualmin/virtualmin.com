---
title: "modify-web"
date: 2024-01-23
weight: 4012140
---

### Change a virtual server's web configuration

This script can update the PHP and web forwarding settings for one or more virtual servers. Like other scripts, the servers to change are selecting using the `--domain` or `--all-domains` parameters.

To change the method Virtualmin uses to run CGI scripts, use the `--mode` parameter followed by one of `none`, `cgi`, `fcgid` or `fpm`. Or you can use `--default-mode` to switch to the default defined in the domain's template.

When using FPM mode, you can configure process manager mode, like `dynamic`, `static` or `ondemand` with the `--php-fpm-mode` flag.

Additionally, when using FPM mode, you can configure webserver to use a socket file for communication with the FPM server with the `--php-fpm-socket` flag. Or switch back to using a TCP port with the `--php-fpm-port` flag.

If your system has more than one version of PHP installed, the version to use for a domain can be set with the `--php-version` parameter, followed by a number (7.4 or 8.2).

If Virtualmin runs PHP via FastCGI, you can set the number of PHP sub-processes with the `--php-children` parameter or using `--php-children-no-check` parameter to skip recommended checks, or turn off the automatic startup of sub-processes with `--no-php-children`. Similarly, the maximum run-time of a PHP script can be set with `--php-timeout`, or set to unlimited with `--no-php-timeout`.

PHP error logging can be enabled with the `--php-log` flag, followed by a path like `logs/php.log`. Alternately you can opt to use the default path with the `--default-php-log` flag, or turn logging off with the flag `--no-php-log`.

If your Apache configuration contains unsupported `mod_php` directives, the `--cleanup-mod-php` flag can be used to remove them from a virtual server. This is primarily useful if the Apache module has been disabled, but not all directives have been cleaned up.

The `--proxy` parameter can be used to have the website proxy all requests to another URL, which must follow `--proxy`. To disable this, the `--no-proxy` parameter must be given.

The `--framefwd` parameter similarly can be used to forward requests to the virtual server to another URL, using a hidden frame rather than proxying. To turn it off, using the `--no-framefwd` option. To specify a title for the forwarding frame page, use `--frametitle`.

If Ruby is installed, the execution mode for scripts in that language can be set with the `--ruby-mode` flag, followed by either `--mod_ruby`, `--cgi` or `--fcgid`. This has no effect on scripts using the Rails framework though, as they always run via a Mongrel proxy.

You can also replace a website's pages using Virtualmin's content style, If `--content` parameter is given, it will be used in default style web page.

To enable the webmail and admin DNS entries for the selected domains (which redirect to Usermin and Webmin by default), the `--webmail` flag can be used. This will make both the DNS and Apache configuration changes needed. To turn them off, use the `--no-webmail` flag.

To have Apache configured to accept requests for any sub-domain, use the `--matchall` command-line flag. This will also add a `*` DNS entry if needed. To turn this feature off, use the `--no-matchall` flag.

To enable server-side includes for this virtual server, use the `--includes` flag followed by an extension like `.html` or `.shtml`. To disable includes, use the `--no-includes` flag.

To make a virtual server the default served by Apache for its IP address, use the `--default-website` flag. This lets you control which domain's contents appear if someone accesses your system via a URL with only an IP address, rather than a domain name.

To change the HTTP port the selected virtual servers listen on, use the `--port` flag followed by a port number. For SSL websites, you can also use the `--ssl-port` flag.

Alternately, you can change the HTTP port that Virtualmin uses in URLs referencing this domain with the `--url-port` flag. For SSL websites, you can also use the `--ssl-url-port` flag.

If the domain's SSL certificate was requested from Let's Encrypt, you can turn on automatic renewal when close to expiry with the `--letsencrypt-renew` flag. Alternately, renewal can be disabled with the `--no-letsencrypt-renew` parameter.

If the domain is sharing an SSL certificate with another domain (because it's CN matches both of them), you can use the `--break-ssl-cert` flag to stop sharing and allow this domain's cert to be re-generated. Conversely, if the server isn't sharing a cert but could, the `--link-ssl-cert` flag can be used to enable sharing.

To change the domain's HTML directory, use the `--document-dir` flag followed by a path relative to the domain's home. Alternately, if the Apache config has been modified outside of Virtualmin and you just want to detect the new path, use the `--fix-document-dir` flag. If you want the directory to be renamed as well as updated in the webserver configuration, use the `--move-document-dir` flag. Note that this flag cannot be used for sub-domains, as their HTML directory is under the parent's HTML dir.

However, for sub-domains you can adjust the HTML sub-directory with the `--subprefix` path followed by a directory relative to the parent's `public_html` dir. Or use `--move-subprefix` to actually move the directory as well.

To force re-generated of TLSA DNS records after the SSL cert is manually modified, use the `--sync-tlsa` flag.

If your system supports FCGIwrap for running CGI scripts, you can use the `--enable-fcgiwrap` flag to switch to it instead of using suEXEC, or `--disable-fcgiwrap` to switch back.

If your webserver supports multiple HTTP protocols, you can use the `--protocols` flag to choose which are enabled for the website. This flag must be followed by some combination of `http/1.1`, `h2` and `h2c`. To revert to the default protocols for your webserver, use the `--default-protocols` flag.


### Command line help

```text
virtualmin modify-web --domain name | --all-domains
                     [--mode cgi|fcgid|fpm | --default-mode]
                     [--php-children|--php-children-no-check number | --no-php-children]
                     [--php-version num]
                     [--php-timeout seconds | --no-php-timeout]
                     [--php-fpm-port | --php-fpm-socket]
                     [--php-fpm-mode dynamic|static|ondemand]
                     [--php-log filename | --no-php-log | --default-php-log]
                     [--cleanup-mod-php]
                     [--proxy http://... | --no-proxy]
                     [--framefwd http://... | --no-framefwd]
                     [--frametitle "title" ]
                     [--ruby-mode none|mod_ruby|cgi|fcgid]
                     [--content text|filename]
                     [--webmail | --no-webmail]
                     [--matchall | --no-matchall]
                     [--includes extension | --no-includes]
                     [--default-website]
                     [--access-log log-path]
                     [--error-log log-path]
                     [--document-dir subdirectory |
                      --move-document-dir subdirectory |
                      --subprefix subdirectory |
                      --move-subprefix subdirectory |
                      --fix-document-dir]
                     [--port number] [--ssl-port number]
                     [--url-port number] [--ssl-url-port number]
                     [--fix-options]
                     [--letsencrypt-renew | --no-letsencrypt-renew]
                     [--break-ssl-cert | --link-ssl-cert]
                     [--enable-fcgiwrap | --disable-fcgiwrap]
                     [--sync-tlsa]
                     [--add-directive "name value"]
                     [--remove-directive "name value"]
                     [--protocols "proto .." | --default-protocols]

```
