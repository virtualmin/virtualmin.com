---
title: "Domain Management API"
author: "Ilia Ross"
weight: 4010015
---

Virtualmin allows the use of custom scripts (Shell, Perl, Python and etc.) to automate tasks around virtual server management. These scripts can be executed before or after creating, modifying, or deleting a virtual server, enhancing Virtualmin's built-in capabilities or performing validations.

### Running custom scripts

Scripts can be set to run either before or after an action. If a pre-action script fails (returns a non-zero exit status), the planned action is prevented.

### Examples of custom scripts

#### Post-creation script for downloading a file

Consider a scenario where you want every new virtual server to download a specific file into its home directory from a website. To achieve this, you would use a script that runs after the server's creation, for example:

```text
#!/bin/sh
if [ "$VIRTUALSERVER_ACTION" = "CREATE_DOMAIN" ]; then 
  cd "$VIRTUALSERVER_HOME"
  /usr/bin/wget -O somefile.tar.gz https://yourdomain.com/somefile.tar.gz
  /usr/bin/chown "$VIRTUALSERVER_USER":"$VIRTUALSERVER_GROUP" somefile.tar.gz
fi
```

#### External database account management

To automatically create and delete accounts in an external database for each new domain user, you can apply the following script:

```text
#!/bin/sh
if [ -z "$VIRTUALSERVER_PARENT" ]; then
    if [ "$VIRTUALSERVER_ACTION" = "CREATE_DOMAIN" ]; then
        /usr/local/bin/add-to-remote-database.pl "$VIRTUALSERVER_USER" "$VIRTUALSERVER_PASS"
    fi
    if [ "$VIRTUALSERVER_ACTION" = "DELETE_DOMAIN" ]; then
        /usr/local/bin/remove-from-remote-database.pl "$VIRTUALSERVER_USER"
    fi
fi
```

#### Update SSL certificate for Prosody

To automatically update the SSL certificate for Prosody, after a domain's SSL certificate is updated, you can apply the following script:

```text
if [ "$VIRTUALSERVER_ACTION" = "SSL_DOMAIN" ]; then
  /usr/bin/cp -f /etc/ssl/virtualmin/$VIRTUALSERVER_ID/$VIRTUALSERVER_DOM.key /etc/prosody/certs/$VIRTUALSERVER_DOM.key
  /usr/bin/cp -f /etc/ssl/virtualmin/$VIRTUALSERVER_ID/$VIRTUALSERVER_DOM.combined /etc/prosody/certs/$VIRTUALSERVER_DOM.combined
  /usr/bin/chmod 600 /etc/prosody/certs/$VIRTUALSERVER_DOM.key /etc/prosody/certs/$VIRTUALSERVER_DOM.combined
  /usr/bin/chown prosody:prosody /etc/prosody/certs/$VIRTUALSERVER_DOM.key /etc/prosody/certs/$VIRTUALSERVER_DOM.combined
  /usr/bin/systemctl restart prosody.service
fi
```

#### Sync SSL certificate with a remote server

To sync the SSL certificate with a remote server, you can apply the following script:

```text
if [ "$VIRTUALSERVER_ACTION" = "SSL_DOMAIN" ]; then
    # Define the base directory for the SSL files
    BASE_DIR="/etc/ssl/virtualmin/$VIRTUALSERVER_ID"
    
    # Define the key and cert file paths
    KEY_FILE="$BASE_DIR/$VIRTUALSERVER_DOM.key"
    CERT_FILE="$BASE_DIR/$VIRTUALSERVER_DOM.cert"
    
    # Define the remote server's hostname or IP address and username
    REMOTE_HOST="username@remote-server-address"
    
    # Define the destination base path (same as the source server)
    DESTINATION_PATH="$BASE_DIR/"

    # Use rsync to transfer the key file
    rsync -avz "$KEY_FILE" "$REMOTE_HOST":"$DESTINATION_PATH"
    
    # Use rsync to transfer the cert file
    rsync -avz "$CERT_FILE" "$REMOTE_HOST":"$DESTINATION_PATH"
fi
```

### Setting up pre and post modification scripts

1. Log in as the master administrator.
2. Go to **System Settings ⇾ Virtualmin Configuration** page.
3. Under **Actions upon server and user creation** section, set:
   - **Command to run before making changes to a server** for pre-modification
   - **Command to run after making changes to a server** for post-modification
4. Click **Save**.

Ensure your scripts have executable permissions and that you use absolute paths for their names.

### Available variables in scripts

Scripts have access to environment variables starting with `$VIRTUALSERVER_`, similar to those described in [Template Variables](/docs/development/template-variables) page. These variables contain details about the virtual server.

The action type is specified in `$VIRTUALSERVER_ACTION`, which can be:

| Action           | Description                            |
|------------------|----------------------------------------|
| `CREATE_DOMAIN`  | Creating a new virtual server          |
| `MODIFY_DOMAIN`  | Modifying a virtual server             |
| `DELETE_DOMAIN`  | Deleting a virtual server              |
| `DISABLE_DOMAIN` | Temporarily disabling a server         |
| `ENABLE_DOMAIN`  | Re-enabling a server                   |
| `DBNAME_DOMAIN`  | Changing a server's database login     |
| `DBPASS_DOMAIN`  | Changing a server's database password  |
| `RESTORE_DOMAIN` | Restoring a server from backup         |
| `SSL_DOMAIN`     | Modifying a server's SSL certificate   |
