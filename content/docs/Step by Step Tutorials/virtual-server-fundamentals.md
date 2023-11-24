---
title: "Virtual Server Fundamentals"
date: 2023-11-24
weight: 2520
---

Understanding the different server types and account roles in Virtualmin is essential for effective web hosting and domain management. Virtualmin provides a flexible platform, allowing various configurations to suit different hosting needs.

### Introduction to virtual server types

In Virtualmin, there are several ways to manage and host domains, each serving different purposes. Understanding these types — [**Top-level servers**](#understanding-top-level-virtual-servers), [**Sub-servers**](#understanding-sub-servers), and [**Aliases**](#understanding-virtual-server-aliases) — is crucial for effective domain management.

### Understanding top-level virtual servers

A **top-level virtual server** often referred to as just a virtual server, is the foundational account in Virtualmin. It includes a website, email, and FTP access, all associated with its own unique domain name. Crucially, each top-level virtual server operates under a dedicated Unix user, distinguishing it from sub-servers and aliases. The virtual server owner, who administers this server, can create additional email addresses, FTP accounts, and websites, subject to the limits set by the master administrator or reseller.

#### How to create a top-level virtual server

1. Log into Virtualmin.
2. Select **Create Virtual Server** from the main menu.
3. Enter the domain name and other relevant details:
    [![](/images/docs/screenshots/tutorials/step-by-step/light/create-top-level-virtual-server.png "Create Top-Level Virtual Server Screenshot")](/images/docs/screenshots/tutorials/step-by-step/light/create-top-level-virtual-server.png)
4. Click **Create Server**.

### Understanding sub-servers

A **sub-server** is a secondary domain hosted within a top-level virtual server. It can have its own domain name, email addresses, and FTP accounts but operates under the Unix group of its parent virtual server. Sub-servers are often used for hosting subdomains or additional domains under the same administration.

#### How to create a sub-server

1. Log into Virtualmin.
2. Choose the parent domain from the drop-down box.
3. Click **Create Virtual Server**, then select **Sub-server**.
4. Enter the domain name and description for the Sub-server:
    [![](/images/docs/screenshots/tutorials/step-by-step/light/create-sub-server.png "Create Sub-Server Screenshot")](/images/docs/screenshots/tutorials/step-by-step/light/create-sub-server.png)

5. Click **Create Server**.

### Understanding virtual server aliases

An **alias** allows a domain to act exactly like another, sharing the same website and email addresses. This is useful for having multiple domains like `example.com` and `example.net` display the same website content.

#### How to create virtual server alias

1. Log into Virtualmin.
2. Select the domain you wish to create an alias for.
3. Click **Create Virtual Server**, then select **Alias of example.com**.
4. Enter the domain name and description for the alias.
    [![](/images/docs/screenshots/tutorials/step-by-step/light/create-alias.png "Create Virtual Server Alias Screenshot")](/images/docs/screenshots/tutorials/step-by-step/light/create-alias.png)

5. Click **Create Server**.

### Overview of account types in virtualmin

#### Master administrator
   The _root_ user with rights to manage all aspects of the server.
#### Reseller
   This user is created by the master administrator. They have rights to create virtual servers accounts for other users. Reseller accounts are a feature only available in Virtualmin Professional.
#### Virtual server owner
   A virtual server owner is the administrative user of a virtual server and any of its sub-servers and aliases. This user is created by either the master administrator or reseller.
#### Mail/FTP users
   These users belong to a particular virtual server, and are setup to have email access, FTP access, or both. These users are generally created by the virtual server owner, though they can also be created by resellers and the Master Administrator.
