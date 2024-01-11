---
title: "How to Configure a Catch-All Email Account"
date: 2023-12-15
author: "Ilia Ross"
weight: 2210000
---
Learn how to configure a catch-all email account in Virtualmin, designed to receive all emails sent to your domain that do not match any existing account or alias.

### Create catch-all email account
A catch-all email account serves as a useful tool for domain email management by capturing all messages sent to your domain, including those addressed to non-existent email addresses. This setup ensures that no email sent to your domain is missed. Here's how to set it up in Virtualmin:

1. **Select the domain**: After logging into Virtualmin, choose the domain for which you want to set up a catch-all email address. This is done by selecting the domain name from the drop-down box in the top-left corner of the left menu.

2. **Navigate to user management**: Click on **Edit Users** in the domain section of the menu. This will take you to the section where you can manage email accounts for that domain.

3. **Choose an email account**: Select the email account you wish to designate as the catch-all account. This is done by clicking on the name of the desired email account in the user list.

4. **Access email settings**: Within the user's settings, click on **Email Settings** to modify its properties.

5. **Configure catch-all**: In the **Additional email addresses** field, enter `@yourdomain.com`, replacing `yourdomain.com` with your actual domain name:
    [![](/images/docs/screenshots/light/create-user-catch-all.png "Create Catch-All User Screenshot")](/images/docs/screenshots/light/create-user-catch-all.png)

This setting directs all emails sent to your domain, which don't match other accounts, to this specified account.

6. **Save the settings**: Click **Save** to apply the changes. This email account is now set as the default (catch-all) for your domain, receiving all undirected emails sent to it.

By following these steps, you can easily set up a catch-all email account in Virtualmin, ensuring that no emails sent to your domain are bounced due to non-existent accounts.
