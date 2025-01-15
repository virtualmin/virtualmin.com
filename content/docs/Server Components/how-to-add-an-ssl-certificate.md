---
title: "How to Add an SSL Certificate"
date: 2024-11-14
author: "Ilia Ross"
weight: 2330000
---
This guide streamlines the process of adding SSL certificates, whether free or commercial, to your Virtualmin-hosted domains, making it easier to secure your website and meet various needs.

### Notes
- **Self-signed certificate**: Initially, a self-signed certificate is created by Virtualmin, which can trigger security warnings in a browser. This is normal and expected behavior. It doesn't make your website any less secure, but it is recommended to replace the self-signed certificate with a valid SSL certificate as soon as possible.
- **No dedicated IP needed**: Modern SSL setups don't require a dedicated IP per domain.

### Adding a free ACME-compatible SSL certificate
1. **Log into Virtualmin**: Access your Virtualmin panel with your administrator credentials.
2. **Select domain**: From the navigation menu, choose the domain to secure.
3. **Navigate to SSL options**: Go to **Manage Virtual Server ⇾ Setup SSL Certificate** page for this domain.
4. **Switch to SSL Providers tab**: Click on **SSL Providers** tab.
5. **Configure SSL provider options**:
   - **Request certificate for**: By default, Virtualmin will request a certificate for your main domain and any aliases. Make sure all the domain variations you want covered are listed in additional **Domain names listed here** text box.
        - **Wildcard certificate**: Extra option **Also request wildcard certificate** is used to obtain certificates that cover all the subdomains associated with this server.
   {{< note "This option is available only if DNS is controlled by Virtualmin." "Note:" "exclamation" >}}
   - **SSL certificate provider**: Choose **Let’s Encrypt** or another ACME-compatible provider.
   {{< note "Only Virtualmin Pro supports ACME-compatible providers beyond Let’s Encrypt, including ZeroSSL, Google Trust Services, Buypass, SSL.com, Sectigo, and others." "Note:" "exclamation" >}}
   - **Automatically renew certificate**: It is recommended to enable automatic renewal of the SSL certificate. Free SSL certificates typically have a 90-day validity period.
   - **Certificate Hash Type**: Choose between RSA and EC (Elliptic curve) options. RSA is widely compatible and traditionally used, while EC offers stronger security in a smaller key size, leading to potentially better performance.
   - **Check connectivity first**: This feature performs preliminary checks to ensure that your domain is correctly set up and accessible over the internet before proceeding with the SSL certificate request to avoid reaching rate limits.
6. **Request certificate**: Click **Request Certificate**. Virtualmin handles the rest.
7. **Verify installation**: Visit `https://yourdomain.com` to check.
8. **Force HTTPS**: Optionally, redirect HTTP to HTTPS in **Web Configuration ⇾ Website Options** page.


#### Enabling SSL for hostname
If needed, and if your hostname resolves correctly, enable **Setup SSL certificate from provider for hostname** on the **System Settings ⇾ Virtualmin Configuration: SSL settings** page. Save the changes, then re-run the configuration check to initiate SSL setup.

#### Troubleshooting common issues
Keep in mind that Virtualmin is designed to automatically handle SSL certificate requests and installations from any ACME-compatible provider. However, if there have been manual changes made to the configuration files or specific server settings, these could interfere with the process. If you encounter issues, consider the following points for troubleshooting:

- **DNS**: If SSL provider cannot verify your domain, ensure your DNS settings are correct and propagated.
{{< alert primary exclamation "" "To obtain SSL certificates via DNS validation—including wildcard certificates—Virtualmin must manage your domain’s DNS zone. This is required to add the temporary DNS records necessary for the validation process." >}}
    1. **Verify DNS records**: Ensure that both the A (IPv4) and AAAA (IPv6) DNS records for your domain are correctly pointing to your server's IP addresses. These records should be configured with your domain registrar or DNS provider.
    2. **Consistency between DNS and web server**: 
         - **IPv4 and IPv6 consistency**: Make sure that both the IPv4 and IPv6 addresses in your DNS records match the IP addresses configured on your web server.
         - **Virtual Host configuration**: In Virtualmin, check that your virtual host configuration for the domain includes settings for both IPv4 and IPv6 if applicable. This is often relevant for Apache or Nginx webservers.
    3. **Check for propagation**: After making any changes to DNS records, wait for them to propagate. This can take anywhere from a few minutes to 48 hours, depending on the TTL (Time To Live) settings of your DNS records.

- **Check for HTTP to HTTPS redirection**: Before requesting an SSL certificate, ensure that your server is not redirecting HTTP traffic to HTTPS for the domain in question. A provider needs to access a specific URL on your domain (e.g. `http://yourdomain.com/.well-known/acme-challenge/`) to verify domain ownership. If all traffic is redirected to HTTPS before the certificate is installed, this verification can fail.
- **Correct virtual host configuration**: Make sure the Apache or Nginx virtual host for your domain is correctly configured and pointing to the right document root.

If you encounter any errors during the process, the error messages provided by Virtualmin are often helpful in diagnosing the issue. Be sure to check them if anything goes wrong.

### Adding a commercial SSL certificate
1. **Select domain**: From the navigation menu, choose the domain to secure.
2. **Generate CSR**: Go to **Manage Virtual Server ⇾ Setup SSL Certificate** page, choose **Create Signing Request** tab, and fill in the required details to generate a CSR.
3. **Obtain certificate**: Use the CSR to acquire an SSL certificate from a certificate authority.
4. **Install certificate**: Set up issued SSL certificate in **Update Certificate and Key** tab.
5. **CA bundle**: Optionally, install any provided CA bundle or intermediate certificate.
6. **Verify installation**: Visit `https://yourdomain.com` to check.

### Reverting to default self-signed SSL certificate on failure

If Webmin’s webserver (miniserv) fails to start due to SSL errors, you can reset it to use its default self-signed SSL certificate:

 1.	Open `/etc/webmin/miniserv.conf`, and remove any outdated certificate entries starting with `ipcert_` or `ipkey_` for non-existent domains.
 2.	If the issue persists, revert to the default certificate by removing the `certfile=` and `extracas=` entries, and setting `keyfile=` to:
    ```text
    keyfile=/etc/webmin/miniserv.pem
    ```

3.	Save the file and restart Webmin by running:
    ```text
    systemctl restart webmin
    ```

Webmin will now use the default SSL certificate, keeping the interface secure and accessible even if SSL renewal issues occur.
