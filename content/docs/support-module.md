---
title: "Support Module"
date: 2024-01-20
author: "Ilia Ross"
linkHidden: true
---

Virtualmin includes a convenient module for submitting support requests and providing temporary remote access to developers. This quick guide explains how to install the module and use its features.

### Installing the support module

- EL systems:
  ```bash
  dnf install wbm-virtualmin-support
  ```

- Debian and derivatives:
  ```bash
  apt-get install webmin-virtualmin-support
  ```

### Submitting a support request

To report a bug or request assistance, you can submit a support request directly from Virtualmin. This is the preferred method for requesting support, as it provides developers with important system information that helps them troubleshoot the issue.

- Log in as master administrator, go to **System Settings**, and click on **Virtualmin Support**. It make take a few seconds to load, while system information is gathered.

- Click **Submit Ticket**. A link will open in a new tab, where you can submit your request.

### Granting remote login access

For complex issues, if developer intervention has been requested, you can grant temporary remote access to your server. This allows developers to log in to your server and troubleshoot the issue directly.

- In Virtualmin, under **System Settings**, click on **Virtualmin Support** and choose **Remote Login Privileges** tab.
- Choose **Login end date** and set a termination date for the access. Provide **Associate bug report URL** if you have already submitted a bug report or fill in the **Additional comments about login** for the support team to know what you need help with.

- Click **Enable Remote Logins**. This action configures developers public SSH keys on your server and grants them _root_ access.
