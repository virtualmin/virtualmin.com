---
title: "How to Configure Amazon SES for Outgoing Email"
date: 2026-05-19
author: "Ilia Ross"
weight: 2235112
edition: "pro"
---

Amazon Simple Email Service (SES) can be used by Virtualmin Pro as a cloud mail delivery provider. When enabled, Virtualmin still hosts the domain's mailboxes locally, but outgoing mail for selected domains is relayed through Amazon SES instead of being delivered directly by your server.

This is useful when your server is on a network with poor mail reputation, a dynamic IP address, or outbound delivery restrictions. It can also help centralize bounce, complaint, and sending reputation management in AWS.

{{< note "Amazon SES in Virtualmin is for outgoing mail delivery. You do not need to point your domain's MX records at Amazon SES unless you are also configuring SES to receive inbound mail, which is a separate AWS feature." "Note:" "notification" >}}

### Requirements

Before configuring Virtualmin, make sure you have:

- Virtualmin Pro, as cloud mail delivery providers are a Pro feature.
- Postfix installed and enabled as the mail server.
- The AWS CLI installed on the Virtualmin system, available as the `aws` command.
- An Amazon SES region with an SMTP endpoint selected for sending mail.
- AWS credentials that can manage SES identities and quotas in that region.
- Either SES SMTP credentials, or an AWS access key and secret key from which Virtualmin can derive the SES SMTP password.

Amazon SES SMTP credentials are region-specific. If you change the SES region later, update the credentials or let Virtualmin derive them again for the new region.

{{< note "New Amazon SES accounts start in the SES sandbox for each AWS region. In sandbox mode, SES can only send to verified identities and has low sending limits. Request production access in AWS before using SES for real customer mail." "Note:" "notification" "warning" >}}

### Prepare Amazon SES

1. Log in to the [Amazon SES console](https://console.aws.amazon.com/ses/).
2. Select the AWS region that you want to use for outgoing mail. Make sure it has an SES SMTP endpoint in Amazon's [SES endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/ses.html) reference.
3. If the account is still in sandbox mode, request production access using Amazon's [Request production access](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html) guide.
4. Create SES SMTP credentials in the SES console, or prepare an AWS access key and secret key for an IAM user that can send mail through SES.
5. If your domains' DNS is not managed by Virtualmin, verify each sending domain in SES before enabling SES for that domain in Virtualmin.

When using an AWS access key as the SMTP user, the IAM user must be allowed to send through SES, typically with permission for `ses:SendRawEmail`. If Virtualmin is also creating and checking domain identities, the credentials also need access to SES identity and quota APIs.

Amazon documents both SMTP credential creation and conversion from AWS access keys in [Obtaining Amazon SES SMTP credentials](https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html).

### Configure SES in Virtualmin

1. Log in to Virtualmin as _root_.
2. Go to **Email Settings ⇾ Cloud Mail Delivery Providers**.
3. Click **Amazon SES**.
4. Enter the AWS **Access key** and **Secret key**, unless Virtualmin reports that AWS credentials are already available from EC2 metadata.
5. Set **Default API location** to the SES region you selected in AWS.
6. For **SES SMTP credentials**, choose one of the following:
   - **Derive from access key** if you entered a permanent AWS access key and secret key above.
   - **Custom username** if you created SMTP credentials in the Amazon SES console, or if Virtualmin is using EC2 metadata credentials for the AWS API.
7. Optionally allow resellers or virtual server owners to use the provider.
8. Click **Save**.

Virtualmin checks that the AWS CLI can access SES in the selected region. It then configures Postfix to authenticate to the SES SMTP endpoint for that region, using STARTTLS on port `587`.

### Enable SES for a domain

To use SES for an existing virtual server:

1. Select the virtual server in Virtualmin.
2. Go to **Email Settings**.
3. Set **Cloud mail delivery provider** to **Amazon SES**.
4. Click **Save**.

When SES is enabled for a domain, Virtualmin:

- Creates or reuses the Amazon SES domain identity.
- Adds the SES verification TXT records when DNS for the domain is hosted by Virtualmin.
- Adds `include:amazonses.com` to the domain's SPF record.
- Configures Postfix sender-dependent delivery for the domain through `email-smtp.REGION.amazonaws.com` on port `587`.
- Stores the SES identity token and region with the virtual server.

If the domain's DNS is not managed by Virtualmin, the domain identity must already exist and be verified in Amazon SES before SES can be enabled for it. In that case, create the domain identity in the [Amazon SES console](https://console.aws.amazon.com/ses/), publish the `_amazonses.<domain>` TXT verification record at your DNS provider using the token shown in AWS, wait for SES to report the identity as verified, and then enable the provider for the domain in Virtualmin. Virtualmin will reuse the existing verified identity instead of creating a new one.

### Use SES for new domains by default

To make SES the default outgoing delivery provider for new virtual servers:

1. Go to **System Settings ⇾ Server Templates**.
2. Select the template used for new domains.
3. Open the **Mail for domain** section.
4. Set **Default cloud mail delivery provider** to **Amazon SES**.
5. Click **Save**.

New domains created with that template will be set up for SES when the mail feature is enabled.

### DKIM, SPF, and DMARC

Virtualmin automatically updates SPF for domains using SES by adding `include:amazonses.com`. This records Amazon SES as an approved sender, though DMARC SPF alignment may still require configuring a custom MAIL FROM domain in SES.

For DKIM, you can use Virtualmin's own [DomainKeys Identified Mail](/docs/server-components/dkim/) signing, Amazon SES Easy DKIM, or both. If you enable Easy DKIM in the SES console, publish the CNAME records shown by AWS in the domain's DNS. Amazon's [Creating and verifying identities](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domain-procedure.html) documentation explains the SES-side DKIM records.

If you enforce DMARC, consider also configuring a custom MAIL FROM domain in SES. Amazon's default MAIL FROM domain is under `amazonses.com`; a custom MAIL FROM domain gives you more control over SPF alignment for DMARC. See Amazon's [Using a custom MAIL FROM domain](https://docs.aws.amazon.com/ses/latest/dg/mail-from.html) guide for the required MX and TXT records.

### Troubleshooting

If **Cloud Mail Delivery Providers** reports that the `aws` command is missing, install the AWS CLI package for your operating system and re-check the provider.

If Virtualmin reports that the SES account is still in sandbox mode, request production access in the same AWS region selected in **Default API location**. Sandbox status and sending limits are per-region.

If domain verification does not complete, check that the `_amazonses` TXT record exists in public DNS. DNS changes can take time to propagate, and Amazon can take additional time to process them.

If Virtualmin reports that Amazon SES verification is not complete and shows the expected DNS TXT record name and value, the SES domain identity exists but Amazon has not yet seen the matching record. Publish the shown `_amazonses.<domain>` TXT record at your DNS provider with the exact value Virtualmin displays, and wait for SES to mark the identity as verified before retrying.

If sending fails after setup, check Postfix logs while sending a test message:

```text
journalctl -u postfix -f
```

Common causes include an SES SMTP username or password from the wrong or unsupported region, AWS credentials without SES sending permission, outbound firewall rules blocking port `587`, or a domain identity that is not yet verified in SES.
