---
title: "Licensing"
date: 2023-11-21
draft: false
weight: 905000
---
### How do I upgrade from GPL to Pro

Once you have a serial number and a license key, you would need to undergo GPL to Pro upgrade by going to **System Settings ⇾ Upgrade to Virtualmin Pro** page. No other commands mentioned below should be run in this type of upgrade.

### How do I renew an expired license?
Licenses purchased on or after January 7, 2016 will automatically renew until canceled, as long as your credit card information on file in our Braintree Vault is valid (Braintree is our payment provider, and they handle our recurring payment information). Licenses purchased before January 7, 2016 are in the old shopping cart system, and cannot be renewed automatically. To re-activate a system with an expired license, simply buy a new license in our shop, and use the `change-license` command to apply it to your server. Your server will instantly be activated on the new license. The `change-license` command can be used for Virtualmin, like this:

```nginx
virtualmin change-license --serial NEWSERIAL --key NEWKEY
```

### How do I cancel a recurring license?

Licenses can be canceled in your Virtualmin account. Click on **My Account**, and then **Software Licenses**, and then find the license you want to cancel. Click the related subscription number in the licenses table. From there you can **Cancel** or make other changes. If your license does not have a related subscription it will automatically end when the license term is complete. Licenses purchased before 2021 will not automatically renew, as we migrated to a new commerce system and the old orders and subscriptions could not be migrated.

### How do I upgrade or downgrade a license?
As with cancellations, you can make changes to your licenses in the **My Account** page under **Software Licenses**. Find the license you want to modify, click the related subscription, and choose to upgrade or downgrade. Confirm the order to make the change. If your license does not have a related subscription, that means it was purchased before 2021 and is not known to the new commerce system. To make changes, you'll need to purchase a new license and switch to it using the `virtualmin change-license` command to switch to the new license.

### Where are my expired licenses?
Expired licenses don't have any intrinsic value, as they once did (before 2016, our initial purchase price and renewal prices were different; but after that date initial purchase prices were reduced dramatically, and renewals were removed from the shop). But, if you need to see your old licenses for record keeping purposes, you can find them on the expired licenses page linked at the bottom of the **Software Licenses** page.

### How do I update payment information or find my invoices?
If your billing information has expired, we will not be able to renew your licenses automatically. To add a new default payment method, browse to **My Account ⇾ Payment methods**, and then click the **Add payment method** button.
