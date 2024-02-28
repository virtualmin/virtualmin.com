---
title: "How to Configure Cloudflare DNS"
date: 2024-01-02
author: "Ilia Ross"
weight: 2197510
---

For users looking to integrate Cloudflare with Virtualmin Pro, the process is straightforward and enhances your domain's DNS management capabilities. Here’s a simple guide to help you configure Virtualmin Pro with Cloudflare:

### Initial Cloudflare configuration

Before diving into domain-specific settings, you need to establish the connection between Virtualmin Pro and Cloudflare.

1. Navigate to **Addresses and Networking** ⇾ **Cloud DNS Providers**.
2. Here, you’ll find a list of supported cloud DNS providers. Select Cloudflare and configure your account details to allow Virtualmin to interact with your Cloudflare account.
3. Upon selecting Cloudflare, you’ll be prompted to enter authentication details such as your Cloudflare account **Email and API key** or **API token**. For the API token to be functional, it must be configured with at least the minimum required permissions, which include _read_ access to _Account Settings_, and _edit_ access to _Zone:Zone_ and _Zone:DNS_. For additional details on how to generate an API key or token, refer to relevant [Cloudflare's documentation](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys).

### Configuring DNS for existing domains

Once Cloudflare is set up in Virtualmin, you can proceed to adjust DNS settings for your existing domains.

1. Go to **DNS Settings** ⇾ **DNS Options** for the domain you wish to configure.
2. In the **Hosting for DNS records** dropdown, select Cloudflare. This action moves the DNS hosting from local to Cloudflare.
{{< note "Prior to making this modification, you must update the nameservers associated with your domain at your domain registrar to the nameservers provided by Cloudflare. This is a necessary step before you can proceed with the change." "Note:" "notification" "warning" >}}

### Setting up DNS for new domains

For new domains, you can automate the DNS configuration process by setting defaults in server templates.

1. Go to **System Settings** ⇾ **Server Templates** and select the template you’re using for new domains.
2. Find the **DNS domain** section.
3. Choose the appropriate Cloud DNS provider in the **Create new DNS zones on** option. This determines whether DNS zones for new virtual servers are set up locally or with on of the supported cloud DNS providers.

### Additional Cloudflare-specific options

The server templates in Virtualmin also include options for Cloudflare-specific configurations:

- **Take over existing zone when creating**: If enabled, Virtualmin will take over existing Cloudflare zones for new domains, without throwing an error.
- **Enable proxying on new records**: For new DNS records, decide whether they should use Cloudflare's proxying feature. You can apply proxying to all created records or selectively, such as only to the website records.

Remember, when you enable Cloudflare DNS hosting for a domain, ensure that you update the nameservers records with your domain registrar to reflect the changes. For more information on how to do this, refer to relevant [Cloudflare's documentation](https://support.cloudflare.com/hc/en-us/articles/205195708-Changing-your-domain-nameservers-to-Cloudflare).
