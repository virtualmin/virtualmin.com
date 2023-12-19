---
title: "How to Create an Auto-Responder"
date: 2023-11-25
author: "Ilia Ross"
weight: 2220000
---
This tutorial demonstrates how to set up an email auto-responder in Virtualmin, a useful tool for automatically sending a pre-defined reply to incoming emails. Ideal for notifying senders when you're unavailable or providing immediate automated responses, this guide will walk you through selecting a domain, choosing a user, and configuring the auto-responder settings. 

Whether for vacation notices or customer service responses, this step-by-step process makes creating an auto-responder straightforward and effective.

### Set up an email auto-responder

An email auto-responder is a convenient feature in Virtualmin that sends automated replies to incoming emails.

1. **Select the domain**: Log into Virtualmin and choose the domain where you want to add the auto-responder. Select the domain name from the drop-down box in the top-left corner of the left menu.

2. **Navigate to user management**: Click on **Edit Users**. This option allows you to manage the user accounts associated with the selected domain.

3. **Choose an email account**: From the list of users, click on the name of the account for which you want to set up the auto-responder.

4. **Access mail forwarding settings**: In the user’s settings, click on **Mail forwarding settings**. Here, you will find the options for configuring the auto-responder:
    [![](/images/docs/screenshots/light/create-user-auto-responder.png "Create Email Auto-Responder Screenshot")](/images/docs/screenshots/light/create-user-auto-responder.png)

5. **Enable auto-responder**: Check the box next to **Send automatic reply**. This activates the auto-responder feature for the selected email account.

6. **Compose your message**: In the text area below **Send automatic reply**, enter the message you wish to be sent automatically. You can use plain text or HTML (start the message with `<HTML>` for HTML formatting).

7. **Save the settings**: Click **Save** to apply your auto-responder settings. The configured message will now be sent as an automatic reply to any incoming email until the **Send automatic reply** option is unchecked.

By setting up an auto-responder, you ensure that every sender receives an immediate response, even when you're not available to reply in person. This feature is especially useful for out-of-office notifications or as an instant acknowledgment for customer inquiries.



