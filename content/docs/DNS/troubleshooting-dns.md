---
title: "Troubleshooting DNS"
date: 2024-01-01
author: "Ilia Ross"
weight: 2197510
---

This guide addresses a common questions and issues in Virtualmin related to DNS configuration.

### How do I setup nameservers for my server

By carefully setting up and registering your custom nameservers, and configuring them correctly in Virtualmin, you can achieve a more personalized and professional setup for your hosting environment.

When setting up custom nameservers in Virtualmin, it's important to properly configure both your domain registrar settings and your server settings. This ensures that your server can effectively handle DNS requests for your domain.

#### Configuring nameservers at your domain registrar

- Start by registering your server as a nameserver with your domain registrar. For example, you might use names like `ns1.example.com` and `ns2.example.com`.
- Assign these nameservers to the IP addresses of your server. This step is crucial as it tells the global DNS system where to find the DNS information for domains hosted on your server.
- The registration process varies among registrars. Typically, it involves logging into your domain registrar's control panel and entering your nameserver details. Check your registrar's support documentation for specific instructions.

#### Setting up nameservers in Virtualmin

After registering your nameservers:

1. **Create DNS records for existing domain**:
   - In Virtualmin, select your primary domain, e.g. **example.com**.
   - Navigate to **DNS Settings ⇾ DNS Records** page.
   - Add **A - IPv4 Address** records for `ns1.example.com` and `ns2.example.com`, pointing to your server's IP addresses.

2. **Configure DNS template for new domains**:
   - Go to **System Settings ⇾ Server Templates ⇾ Default Settings ⇾ DNS domain** page.
   - In the **Primary DNS server hostname**, input the primary nameserver, e.g. `ns1.example.com`.
   - In the **Additional manually configured nameservers** field, list any additional nameservers, such as `ns2.example.com`.
   - This setup tells Virtualmin to include these nameservers in the DNS records for all new domains created on the server.

#### Important considerations

- **DNS propagation**: After making changes to your DNS settings or nameserver configuration, allow some time for these changes to propagate across the internet. This process can take anywhere from a few hours to up to 48 hours.
- **Consistency and accuracy**: Ensure that the nameserver names and IP addresses are consistent and accurately entered both in your registrar's settings and in Virtualmin. Errors in this setup can lead to DNS resolution issues for your domains.

### Resolving DNS issues

DNS issues are commonly encountered in virtual hosting systems due to the multiple systems that need to cooperate. Correct DNS settings are crucial for the smooth operation of various services on a hosting system.

#### Glue records

Glue records are essential for DNS functionality and need to be correct at your domain registrar:

- Use the `whois` command to check glue records:
  ```text
  whois example.com
  ```
- Look for the "name server" records. These should list your DNS servers.
- Remember, Virtualmin cannot modify your registrar's records. Any necessary changes must be made using your registrar's tools.

#### NS records

NS (Name Server) records on your Virtualmin server should align with your glue records:

- Verify NS records using:
  ```text
  host -t NS example.com
  ```
- Mismatches between NS records and glue records can cause intermittent DNS resolution issues.

#### A records

A (Address) records map domain names to IP addresses:

- Check A records with:
  ```text
  host example.com
  ```
- To specify a nameserver for the query:
  ```text
  host example.com ns1.example.com
  ```
- Or use an IP if the nameserver's IP address is uncertain:
  ```text
  host example.com 192.168.1.1
  ```

#### MX records

MX (Mail Exchanger) records direct how emails should be routed:

- Use the following command to inspect MX records:
  ```text
  host -t MX example.com
  ```

#### Further resources

- For more detailed troubleshooting, refer to the [BIND Troubleshooting Tools](https://webmin.com/docs/modules/bind-dns-server/#bind-troubleshooting-tools) in the Webmin documentation.

Remember, DNS issues often stem from misconfigurations across different systems, including your domain registrar and your Virtualmin server. Ensuring consistency and correctness in these configurations is key to resolving DNS-related problems.