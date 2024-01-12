---
title: "Uploading and Editing Website Data"
date: 2023-12-28
author: "Ilia Ross"
weight: 2331000
---

### Document root directory

The HTML content and PHP applications for your website are typically located in the `public_html` directory within the home directory of the virtual server. For instance, the website content for `example.com` would be in `/home/example/public_html`.

Sub-servers have their content within a sub-directory under their parent virtual server home. For example, `sub.example.com` would be in `/home/example/domains/sub.example.com/public_html`.

#### CGI scripts

CGI scripts are located in the `cgi-bin` directory within the virtual server home directory. For instance, CGI applications for `example.com` would be in `/home/example/cgi-bin`.

### Directory listings differences

When managing files on a Virtualmin server, it's important to understand how directory listings can vary depending on the service used to access the server:

- **SSH service**
  - SSH allows navigation through the entire filesystem, subject to user permissions.

- **FTP service**
  - The root directory shown in FTP/FTP with SFTP clients is often the user's home directory, not the root of the entire filesystem.
  - FTP/FTP with SFTP access might be restricted to specific directories, depending on the server configuration and user permissions.

### Uploading files

There are multiple methods to upload content to your Virtualmin account:

#### SSH, SCP, and SFTP (FTP over SSH)

Virtualmin provides flexible options for secure file transfers:

- **Standard SSH**: Typically available on port 22 for secure shell access, SCP, and SFTP.
- **FTP with SFTP**: Configured to use port 2222, offering SFTP capabilities.

##### Windows SCP clients

- **pscp**: A command-line SCP client related to PuTTY, a popular SSH client, can be downloaded from [Putty's official website](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).
  - Usage example:
    ```text
    C:\> pscp.exe myfile.htm user@example.com:/home/user/public_html
    ```

##### Windows, macOS, and Linux Graphical FTP Clients

- **FileZilla**: A versatile and free graphical FTP client that supports SFTP, FileZilla is available for Windows, macOS, and Linux. It can be downloaded from the [Filezilla Project website](https://filezilla-project.org/).
  - To configure FileZilla, follow these steps:
    1. Download and install FileZilla.
    2. Open FileZilla and navigate to **File ⇾ Site Manager**.
    3. Click **New Site** and give it a name like **example**.
    5. For **Protocol,** choose **SFTP - SSH File Transfer Protocol**.
    4. In the **Host** box, enter **example.com**.
    6. Set **Logon Type** to **Normal** and fill in the **User** and **Password** fields with your Virtualmin account details.
    7. You can now connect and transfer files to and from your Virtualmin server.

- **WinSCP (Windows Only)**: Another reliable option for FTP over SSH is WinSCP, available for Windows. Visit the [WinSCP Home Page](https://winscp.net/eng/index.php) for more information and to download the client.
  - After installation, enter your server, username, and password details to connect and manage files in your Virtualmin account.

##### macOS and Linux SCP Clients

- **scp**: Both macOS and Linux include the `scp` command, part of the OpenSSH suite. Use it to securely transfer files to and from your Virtualmin server.
  - Example usage:
    ```text
    $ scp myfile.htm user@example.com:/home/user/public_html
    ```

- **gftp (Linux only)**: A popular Gnome-based graphical FTP client that also supports SCP and SFTP. Available in most Linux distributions' repositories or on the [gftp GitHub page](https://github.com/masneyb/gftp).

#### FTP and FTPS (FTP over TLS)

Virtualmin also supports FTP and FTPS:

- **FTP**: The traditional unencrypted file transfer protocol, typically on port 21.
- **FTP over TLS**: Offers encrypted FTP (FTPS) over the same port 21, enhancing security for file transfers.

#### Webmin File Manager

For file management within the user interface, refer to the detailed documentation in the Webmin [File Manager](https://webmin.com/docs/modules/file-manager/) documentation.
