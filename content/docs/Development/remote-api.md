---
title: "Remote API"
author: "Ilia Ross"
weight: 4010010
---

Virtualmin offers both a command-line API and an HTTP-based remote API for extensive server management, including handling servers, users, databases, etc.

The command-line API is powerful but might not be ideal in every situation, particularly because it requires Unix shell with _root_ access. For greater flexibility, an HTTP API can be used remotely.

### The remote API

To make remote calls:

- Remote calls must be made through the CGI, e.g:
  ```text
  https://yourserver:10000/virtual-server/remote.cgi
  ```
- Provide a `program` parameter for the command-line program to invoke.
- Additional parameters can be included in the URL as CGI parameters.
- Example URL for creating a mail alias: 
  ```text
    https://yourserver:10000/virtual-server/remote.cgi?program=create-alias&domain=domain.com&from=sales&to=user@domain.com
  ```

Both GET and POST HTTP requests are supported. POST requests are recommended for security reasons, as they do not expose the command-line program and its parameters in the URL.

### Reading output

The output from `remote.cgi` is plain text, including the command-line program's output and an exit status line indicating success or failure.

### JSON and XML output

For JSON output, add `json=1` to the API call. For XML, use `xml=1`. Perl format is available with `perl=1`. Use `multiline` with any `list-*` API calls to get detailed output.

### Authentication

- The remote API requires authentication using the same system as the web interface.
- It is accessible only by the master administrator for security reasons.
- Include HTTP authentication headers in your requests.
- Example command using `wget` for authentication:
  ```text
    wget -qO- --http-user=root --http-passwd=pass 'https://yourserver:10000/virtual-server/remote.cgi?program=list-domains'
  ```


### Example usage

#### PHP example

```php
<?php
$result = shell_exec("wget -O - --quiet --http-user=root --http-passwd=pass --no-check-certificate 'https://localhost:10000/virtual-server/remote.cgi?program=list-domains'");
echo $result;
?>
```

#### Perl example

```perl
#!/usr/bin/perl -w

$result = `wget -O - --quiet --http-user=root --http-passwd=pass --no-check-certificate 'https://localhost:10000/virtual-server/remote.cgi?program=list-domains'`;
print "$result\n";
```

#### Perl LWP example

```perl
#!/usr/bin/perl -w

use strict;
use LWP;

my $browser = LWP::UserAgent->new();
$browser->credentials("localhost:10000", "Webmin Server", "root" => "pass");

my $result = $browser->get("https://localhost:10000/virtual-server/remote.cgi?program=list-domains");
print $result->content;
```
