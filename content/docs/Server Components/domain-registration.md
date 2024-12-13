---
title: "Domain Registration"
date: 2024-01-01
author: "Ilia Ross"
weight: 2197910
---

Virtualmin provides a plugin to automate domain registration, streamlining the process of setting up a new virtual server with an immediately accessible website and domain.

#### Supported registrars
- The plugin is compatible with **Namecheap**, **Register.com**, and **Gandi** APIs.
- Use existing accounts or create new ones through plugin's interface.

#### Installing the plugin

1. **For EL systems**
   ```text
   dnf install wbm-virtualmin-registrar
   ```
2. **For Debian and derivatives**
   ```text
   apt-get install webmin-virtualmin-registrar
   ```

#### Enabling plugin

1. Log in as the master administrator.
2. Navigate to **System Settings ⇾ Features And Plugins** page.
3. Check **Domain Registration** and click **Save** button.
4. Optionally, you can enable it by default for new virtual servers using the **Default?** column setting.

#### Account management

- Creating a new account
   - Visit the selected registrar's website to create a new account.
   - Follow the website's instructions, entering your personal and billing information as required.
   - Ensure to enable the remote API feature during account setup.

- Adding an existing account
   - Go to **Addresses and Networking ⇾ Domain Registrars** page.
   - Select your registrar and enter the API account details.
   - Validate the login credentials for proper setup.


- Editing or removing accounts
   - Edit details or remove accounts as needed.
   - Removal accounts from plugin does not cancel the account with the registrar.

#### Registering domains

- Domain registration
   - Enable **Register domain** feature when creating or editing a virtual server.
   - The domain will be registered and configured with previously chosen nameservers.

- Domain de-registration
   - De-registration will occur only if the **Attempt to de-register domains when deleting** option is enabled in the plugin configuration.
   - To de-register a domain, either uncheck the **Register domain** option or delete the virtual server.
   - This action will make the domain inaccessible online, unless it is re-registered.

#### Domain management

- **Editing contacts**: Manage billing, administrative, and technical contacts for each registered domain.

- **Renewing domains**: Renew domains directly from the plugin page.

- **Associating or disassociating existing domains**: Link or unlink domains previously registered outside for management within the platform.

This plugin simplifies domain registration, making the process of setting up and managing virtual servers more efficient and integrated within the Virtualmin environment.