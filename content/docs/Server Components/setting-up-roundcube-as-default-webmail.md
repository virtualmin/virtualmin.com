---
title: "Setting Up Roundcube as Default Webmail"
date: 2023-12-28
author: "Ilia Ross"
weight: 2332000
---

### Configure Roundcube as default webmail
To use Roundcube instead of Usermin:

1. **Install Roundcube**: Choose a virtual server to host Roundcube. Install it using **Install Script** feature.
2. **Setup webmail redirects**:
   - In Virtualmin, navigate to **System Settings ⇾ Server Templates ⇾ Default Settings ⇾ Website for domain**.
   - Find **URL for webmail redirect** and set it to your Roundcube URL (e.g., `https://company.com/roundcube`).
3. **Update existing virtual servers**:
   - Disable existing webmail redirects:
     ```text
     virtualmin modify-web --no-webmail --all-domains
     ```
   - Re-enable with new settings:
     ```text
     virtualmin modify-web --webmail --all-domains
     ```
   - Now, accessing `webmail.example.com` for any domain on your server will redirect users to the Roundcube installation.
