---
title: "DomainKeys Identified Mail"
date: 2023-12-23
author: "Ilia Ross"
weight: 2235101
---

DomainKeys Identified Mail (DKIM) is a standard that enhances email security by enabling the signing of email messages. This signature allows the recipient's mail server to verify the sender's email address, helping to detect sender address forgery commonly used in spam.

### How DKIM works

- **Signing process**: Emails are signed with a private key on the sender's server, corresponding to a public key published in the sender's DNS records.
- **Verification by recipients**: Recipients use the public key obtained from the DNS of the `From` address domain to verify the email's signature, confirming it originated from the stated domain.

Virtualmin uses a **milter** (mail filter) for DKIM signing and verification. This background process interacts with Postfix to apply DKIM signatures to outgoing messages from domains with DKIM enabled. All emails relayed through Virtualmin, regardless of the client used, will be signed if DKIM is activated for their domain.

### Installing DKIM packages

Virtualmin facilitates DKIM configuration on supported systems, which provide the necessary DKIM milter packages.

#### Automated installation in Virtualmin

1. Log in to Virtualmin as _root_.
2. Navigate to **Email Messages ⇾ DomainKeys Identified Mail**.
3. If DKIM is not yet configured, an error message about a missing configuration file will appear. Use the **Install Now** button to automatically install the required package.

#### Manual installation via command line

- On EL systems:
  ```text
  dnf install opendkim
  ```

- On Debian and derivatives:
  ```text
  apt-get install opendkim
  ```

### Enabling DKIM in Virtualmin

To activate DKIM for outgoing emails:

1. Access Virtualmin as _root_ and go to **Email Messages ⇾ DomainKeys Identified Mail**.
2. Set **Signing of outgoing mail enabled?** to **Yes**.
3. In **Selector for DKIM record name**, enter a name to identify the signing key, like the current year and month, e.g. `202312`.
4. Click **Save**.

Virtualmin will display the steps taken to configure and activate DKIM. Note that DKIM is enabled only for virtual servers with both DNS and email features active, as the mail server requires a private signing key corresponding to a public key in DNS.

#### DKIM verification and disabling

- By default, Virtualmin configures the DKIM milter to verify incoming emails with valid DKIM signatures. Emails with incorrect or unverifiable signatures might be bounced or delayed.
- To disable verification, set **Verify DKIM signatures on incoming email?** to **No**.

To turn off DKIM signing completely:

1. Navigate to **Email Messages ⇾ DomainKeys Identified Mail**.
2. Change **Signing of outgoing mail enabled?** to **No**.
3. Click **Save**.

This action removes the public key from all domains and stops DKIM signing.
