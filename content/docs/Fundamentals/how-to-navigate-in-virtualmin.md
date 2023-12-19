---
title: "How to Navigate in Virtualmin"
date: 2023-11-24
author: "Ilia Ross"
weight: 2110000
---

This tutorial covers the basics of navigating Virtualmin, designed for a range of user roles from administrators to domain owners and resellers. Upon logging in, you'll find a user-friendly, dual-pane interface that facilitates easy navigation.

The key is to understand the layout and switch between Webmin and Virtualmin tabs to access different functionalities. Virtualmin adeptly caters to diverse management needs, offering comprehensive system control for administrators and focused website management tools for domain owners and resellers.

### Interface overview

Virtualmin is structured into two main panes:

1. **Left menu pane**: This contains the primary navigation options. Most common operations and features are accessible from here.
2. **Right content pane**: Displays details and settings based on the selected menu option.

### User roles and access levels

- **Root and _sudo_-capable users**: If logged in as _root_ or a _sudo_-capable user with `ALL` privileges, you'll have access to every Virtualmin function, all domain accounts, as well as the full suite of Webmin features.
- **Domain owner accounts**: Users in this role manage all their top-level and sub-servers (domains) under a single Unix system user. This focused approach ensures that domain management is centralized and secure, with all associated servers tied to one Unix user account. Their access can be adjusted by the _root_ user, adding or reducing privileges based on needs and trust.
- **Reseller accounts**: Reseller is the feature only available in [Virtualmin Professional](/docs/professional-features/#reseller-accounts). Resellers accounts sit between _root_ and domain owner accounts in terms of privileges. Reseller accounts have the ability to create new domain owner accounts, each with their own distinct Unix user. This added privilege allows resellers to manage multiple domain owners, each operating under separate Unix system users, providing a layer of customization and control for various domains.

### Navigating between Webmin and Virtualmin
- **Switching tabs**: At the top of the left-hand menu, you will find tabs to switch between Webmin and Virtualmin.
  - **Webmin tab**: Offers general systems management features such as user/group management, process monitoring, package management, network and firewall settings.
  - **Virtualmin tab**: Focuses on domain account management, including creating domain accounts, managing databases, and installing applications.

### Managing virtual servers
- Under the Virtualmin tab, you'll find a list of domains at the top of the navigation menu. Select a domain from this list to manage its specific settings.
- This section allows access to features such as domain editing, website configuration, and database management, tailored for each selected virtual server.

### System configuration
- In addition to the Webmin tab, which offers a range of system settings and monitoring tools, the Virtualmin tab also includes important system-wide configuration options.
- These options are located below the search bar in the Virtualmin navigation menu, where the search bar serves as a logical separator. The top section of the menu focuses on virtual server-specific settings, while the bottom section (below the search bar) contains broader system-wide settings.
- Notable features under the Virtualmin tab, in the system-wide settings section, include Account Plans, Server Templates, Addresses and Networking configuration, and Email Settings. This area also includes essential tools for server Limits and Validation, as well as Migration tools, which facilitate migration from platforms such as Plesk, cPanel, and DirectAdmin. Additionally, comprehensive Backup and Restore features are available, providing a full suite of options for managing and safeguarding your data.

This layout in Virtualmin provides a comprehensive and integrated approach to managing both server-specific settings for each virtual server and broader, system-wide configurations.
