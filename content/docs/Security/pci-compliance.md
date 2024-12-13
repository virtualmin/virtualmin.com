---
title: "PCI Compliance"
author: "Ilia Ross"
weight: 2511000
---

PCI DSS (Payment Card Industry Data Security Standard) is a set of security standards designed to ensure that all companies that accept, process, store, or transmit credit card information maintain a secure environment. If your business handles credit card transactions, it's crucial to be compliant with PCI standards to protect cardholder data against breaches and fraud.

### Steps to achieve PCI compliance

The process of becoming PCI compliant involves a self-assessment questionnaire and a security assessment by a third-party. Here, we focus on server-related changes to pass the security assessment.

### Disabling insecure protocols and ciphers

Older protocols and ciphers like are considered insecure and must be disabled across all services, including Webmin, Apache, Nginx, Postfix, Dovecot and ProFTPD.

#### Webmin configuration
1. Go to **Webmin Configuration ⇾ SSL Encryption** page.
2. Choose all **SSL protocol versions to reject**, which will leave only TLSv1.3 enabled.
3. Select **Only strong PCI-compliant ciphers** option.
4. **Save** the changes.

#### Apache configuration
1. Edit the Apache configuration file:
   - On EL systems `/etc/httpd/conf.d/ssl.conf` file.
   - On Debian and derivatives `/etc/apache2/mods-enabled/ssl.conf` file.
2. Set the following directives:
   ```text
	SSLProtocol         all -SSLv3 -TLSv1 -TLSv1.1 -TLSv1.2
	SSLHonorCipherOrder off
	SSLSessionTickets   off
   ```
3. Restart Apache running:
   - On EL systems `systemctl reload httpd` command.
   - On Debian and derivatives `systemctl reload apache2` command.

#### Nginx configuration
1. Edit `/etc/nginx/nginx.conf` or the specific server block file under `/etc/nginx/conf.d/` directory.
2. Add or modify the following lines:
   ```text
   ssl_protocols             TLSv1.3;
   ssl_prefer_server_ciphers off;
   ```
3. Restart Nginx by running `systemctl restart nginx` command.

#### Postfix configuration
1. Edit `/etc/postfix/main.cf` file.
2. Add or modify the following lines:
   ```text
	smtpd_tls_mandatory_protocols = !SSLv2, !SSLv3, !TLSv1, !TLSv1.1, !TLSv1.2
	smtpd_tls_protocols = !SSLv2, !SSLv3, !TLSv1, !TLSv1.1, !TLSv1.2
	tls_preempt_cipherlist = no
   ```
3. Restart Postfix by running `systemctl restart postfix` command.

#### Dovecot configuration
1. Edit `/etc/dovecot/dovecot.conf` file.
2. Add or modify the following lines:
   ```text
   ssl_min_protocol = TLSv1.3
   ssl_prefer_server_ciphers = no
   ```
3. Restart Dovecot by running `systemctl restart dovecot` command.

{{< alert primary exclamation "" "As of November 2024, Microsoft Outlook does not support TLS 1.3. To maintain compatibility with Outlook clients, keep TLS 1.2 enabled alongside TLS 1.3 in your Postfix and Dovecot configurations." >}}

#### ProFTPD configuration
1. Edit the ProFTPD configuration file:
   - On EL systems `/etc/proftpd/mod_tls.conf` file.
   - On Debian and derivatives `/etc/proftpd/tls.conf` file.
2. Set the following directives:
   ```text
	TLSProtocol               TLSv1.3
	TLSServerCipherPreference off
	TLSSessionTickets         off
   ```
3. Restart ProFTPD by running `systemctl restart proftpd` command.

### Hardening services

#### Apache hardening

To prevent Apache from revealing sensitive information:

1. Edit the Apache configuration file as mentioned above.
2. Include the following directives:
   ```text
   ServerTokens Prod
   ServerSignature Off
   TraceEnable Off
   ```
3. Restart Apache as mentioned above.

#### Secure SSH

Disable SSH protocol 1, which is insecure:

1. Edit `/etc/ssh/sshd_config`.
2. Find or add the line:
   ```text
   Protocol 2
   ```
	{{< note "On all modern systems, Protocol 2 should be the default enabled protocol for SSH already. This is a standard security measure, as Protocol 2 is significantly more secure than the older Protocol 1. Therefore, it's uncommon to encounter Protocol 1 in use on modern installations." "Note:" "notification" >}}

3. Restart SSH by using `systemctl restart sshd` command.

### Additional Considerations

- Ensure that your system is up-to-date with the latest security patches.
- Review all services running on your server to disable unnecessary ones and to secure the necessary ones.
- Regularly audit your system's security and monitor logs for any suspicious activity.

Becoming PCI compliant is not a one-time event but an ongoing process that requires continuous attention and updates to your security measures. 

Remember that these steps might vary slightly based on the specific versions of software you're running, and you might need additional measures to fully comply with PCI DSS requirements. Always consult with a PCI compliance expert to ensure that all aspects of your environment meet the standards.
