---
title: "Website Default Page"
date: 2023-12-30
author: "Ilia Ross"
weight: 2332300
---

After setting up a virtual server in Virtualmin, a default landing page is automatically generated. This page serves as an indicator of the website's status and provides insights into the server's overall configuration.

{{< alert warning exclamation "Warning!" "Any concerns about account status or disabled sites should be directed to the hosting provider. Virtualmin is a server control panel tool and does not directly serve web pages; it facilitates website management." >}}

#### Types of default landing pages

##### Enabled page
   - Indicates that the virtual server or website is active and correctly configured.
   - The domain name displayed should match the one used in the URL. If there's a discrepancy, it may suggest a configuration error.
    [![](/images/docs/screenshots/light/default-website-enabled.png "Default Website Enabled Page Screenshot")](/images/docs/screenshots/light/default-website-enabled.png)

##### Disabled page
   - Virtualmin enables administrators to disable virtual servers for various reasons.
   - When disabled, the default page will reflect this status, offering clarity to both administrators and visitors.
    [![](/images/docs/screenshots/light/default-website-disabled.png "Default Website Disabled Page Screenshot")](/images/docs/screenshots/light/default-website-disabled.png)

##### Host default page
   - This page is a confirmation that the webserver is running.
   - It appears after setting up the host's default domain in Virtualmin.
   - If this page appears in a production environment and the domain in the URL doesn't match the one displayed, it could indicate a problem with the webserver's configuration.
    [![](/images/docs/screenshots/light/host-default-website.png "Default Website Enabled Page Screenshot")](/images/docs/screenshots/light/host-default-website.png)

#### Customizing default landing page

The `/etc/skel` directory is used by Virtualmin to initialize the home directory of new virtual servers. It contains files and directories that are automatically copied over when a new server is created.
  
- **Customizing the landing page**:
  - To change the default landing page for new virtual servers, you can place a custom `index.html` file within the `public_html` directory inside `/etc/skel`.
  - For example, creating `/etc/skel/public_html/index.html` with your desired content will ensure that this page is used as the default landing page for all newly created servers.
  
- **Effectiveness**: This method allows for a standardized and personalized initial web page, reflecting either branding or specific messaging appropriate for your environment.

#### Troubleshooting guidelines

1. **Domain match**: Ensure that the domain name mentioned on the default page matches the domain name used in the URL. A mismatch might hint at a misconfiguration. Verify that the IP address for the webserver and DNS are correctly configured. If IPv6 is enabled, ensure that both IPv4 and IPv6 addresses are configured correctly and consistently for both the webserver and DNS.

2. **Domain propagation**: If you've recently set up or moved your domain, ensure that it has fully propagated. Domain propagation can take anywhere from a few hours to 48 hours. Make sure that the DNS settings are correctly pointing to your server. Misconfigured DNS can lead to issues in reaching the intended website.

3. **Webserver logs**: Consult server logs for any errors or hints regarding the misconfiguration. They can provide detailed insights into what might be going wrong.

Should you continue to face issues, consider reaching out to Virtualmin [support community](https://forum.virtualmin.com) or your hosting provider for more specialized assistance.
