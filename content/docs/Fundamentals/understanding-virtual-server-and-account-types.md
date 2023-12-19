---
title: "Understanding Virtual Server and Account Types"
date: 2023-11-24
author: "Ilia Ross"
weight: 2130000
---

Understanding the different virtual server and account types in Virtualmin is essential for effective web hosting and domain management. Virtualmin provides a flexible platform, allowing various configurations to suit different hosting needs.

### Introduction to virtual server types

In Virtualmin, there are several ways to manage and host domains, each serving different purposes. Understanding these types — [**Top-level servers**](#understanding-top-level-virtual-servers), [**Sub-servers**](#understanding-sub-servers), and [**Aliases**](#understanding-virtual-server-aliases) — is crucial for effective domain management.

### Understanding top-level virtual servers

A **top-level virtual server** often referred to as just a virtual server, is the foundational account in Virtualmin. It includes a website, email, and FTP access, all associated with its own unique domain name. Crucially, each top-level virtual server operates under a dedicated Unix user, distinguishing it from sub-servers and aliases. The virtual server owner, who administers this server, can create additional email addresses, FTP accounts, and websites, subject to the limits set by the master administrator or reseller.

### Understanding sub-servers

A **sub-server** is a secondary domain hosted within the same virtual server owner. It can have its own domain name, email addresses, and FTP accounts but operates under the Unix name and group of its parent virtual server. New users are created for a sub-server, assigned separate Unix user but still operate under the Unix group of the parent virtual server. Sub-servers are often used for hosting subdomains or additional domains under the same administration.

### Understanding virtual server aliases

An **alias** allows a domain to act exactly like another, sharing the same website and email addresses. This is useful for having multiple domains like `example.com` and `example.net` display the same website content.

### Overview of account types in Virtualmin

#### Master administrator
   The _root_ user with rights to manage all aspects of the server.
#### Reseller
   This user is created by the master administrator. They have rights to create virtual servers accounts for other users. Reseller accounts are a feature only available in Virtualmin Professional.
#### Virtual server owner
   A virtual server owner is the administrative user of a virtual server and any of its sub-servers and aliases. This user is created by either the master administrator or reseller.
#### Mail/FTP users
   These users belong to a particular virtual server, and are setup to have email access, FTP access, or both. These users are generally created by the virtual server owner, though they can also be created by resellers and the Master Administrator.
