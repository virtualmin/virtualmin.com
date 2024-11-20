---
title: "Auto User Switch in Shell Navigation"
author: "Ilia Ross"
date: 2024-06-25
weight: 2900100
---

### Overview
This feature is designed for environments where the _root_ user navigates through different user home directories. It automatically switches the _root_ user to the appropriate user when entering their home directory and logs out when exiting `/home`, ensuring correct file ownership and permissions.

{{< alert warning exclamation "" "This feature relies on the `/etc/profile.d` directory used by Bourne and compatible shells. It might not work in non-compatible shells." >}}

### Implementation details

1. **Script location**
   
   The script is placed in the `/etc/profile.d` directory to ensure it is sourced for all users during login.

2. **Script name**

   `virtualmin-switch-user-on-cd.sh`

3. **Script content**

    ```bash
    # Extract username from the home directory
    get_username_from_home() {
        local home_dir="$1"
        local username=$(awk -F: -v home="$home_dir" '$6 == home {print $1}' /etc/passwd)
        echo "$username"
    }

    # Function to switch user on cd
    switch_user_on_cd() {
        # If root is forced under for whatever reason exit
        if [ -n "$ROOT" ]; then
            return
        fi

        # Check if the current directory is not under /home
        if [[ "$PWD" != /home/* ]]; then
            if [[ -n "$ORIGINAL_USER" && "$(whoami)" != "root" ]]; then
                exit
            fi
        else
            # Extract the username from the home directory if it's under /home
            username=$(get_username_from_home "$PWD")
            if [[ -n "$username" ]]; then
                if [[ "$(whoami)" != "$username" ]]; then
                    export ORIGINAL_USER=$(whoami)
                    export ORIGINAL_USER_PWD=$PWD
                    export ORIGINAL_USER_OLDPWD=$OLDPWD
                    sudo -H -u "$username" bash -c 'export ORIGINAL_USER='"$ORIGINAL_USER"'; \
                        export ORIGINAL_USER_PWD='"$ORIGINAL_USER_PWD"'; \
                        export ORIGINAL_USER_OLDPWD='"$ORIGINAL_USER_OLDPWD"'; \
                        exec bash -l'

                    if [ "$PWD" = "$ORIGINAL_USER_PWD" ]; then
                        cd "$ORIGINAL_USER_OLDPWD"
                    fi
                    unset ORIGINAL_USER
                    unset ORIGINAL_USER_PWD
                    unset ORIGINAL_USER_OLDPWD
                fi
            fi
        fi
    }

    # Set the PROMPT_COMMAND to call the switch_user_on_cd function
    PROMPT_COMMAND=switch_user_on_cd
    ```

4. **Script installation**
   
   ```bash
   source /etc/profile.d/virtualmin-switch-user-on-cd.sh
   ```

### How it works

- **User detection**
  - When the _root_ user navigates to a directory under `/home`, the script uses the `get_username_from_home` function to extract the username based on the home directory path from the `/etc/passwd` file.
  - The script then switches to the identified user using the `sudo -H -u username` command.

- **Logout mechanism**
  - When the user navigates outside the `/home` directory, the script checks if the `ORIGINAL_USER` variable is set.
  - If set, and the current user is not _root_, the script logs out the user, reverting control back to the _root_ user.

- **Disable mechanism**
  - Setting the environment variable `ROOT=1` will disable the automatic user switch and logout behavior.
  - This can be done in the shell by executing `export ROOT=1`.

### Testing and validation

1. **Navigate to a user's home directory**
   ```bash
   cd /home/charles
   ```
   - Expected result: The shell switches to `charles` user.

2. **Navigate outside the `/home` directory**
   ```bash
   cd /
   ```
   - Expected result: The shell logs out the current user if `ORIGINAL_USER` was set, reverting control back to the _root_ user.

3. **Disable automatic switching**
   ```bash
   export ROOT=1
   cd /home/charles
   cd /
   ```
   - Expected result: No user switching or logging out occurs due to the `ROOT=1` variable.

### Benefits

- Ensures correct file ownership and permissions under user home directories.
- Provides an automated mechanism for user context switching.
