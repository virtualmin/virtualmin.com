---
title: "Troubleshooting Emails"
date: 2023-12-22
author: "Ilia Ross"
weight: 2235200
---

Email functionality in Virtualmin involves various components, making it a complex system. Key elements include a Postfix mail transfer agent, a Procmail mail delivery agent, Dovecot IMAP/POP3 retrieval, ClamAV anti-virus, SpamAssassin anti-spam, and mail log analysis tools. If any of these components fail, it can disrupt mail services for certain tasks or entirely.

### Verifying email server connectivity
Port _25_ is essential for mail servers inter-communication. It enables email transfers between servers, and if it's blocked, this key inter-server communication will be disrupted.

To check if port _25_ is blocked on your network, use the `telnet` command like this:

```text
telnet smtp.gmail.com 25
```

A successful connection shows a "Connected to smtp.gmail.com" message, while a failure displays "Unable to connect to remote host: Connection refused" or gives no response.

ISPs often block this port to curb spam, but they might unblock it if requested. It's advisable to check with your ISP regarding the possibility of unblocking it.

### Troubleshooting SASL authentication

To check if the SASL authentication daemon, i.e. `saslauthd` is running properly and can authenticate users as it should, you can use the `testsaslauthd` command, with the `-s` option, which can take `smtp` or `imap` or any other actual service name as an argument.

#### For SMTP authentication

```text
testsaslauthd -u user -p pass -s smtp
```

#### For IMAP authentication

```text
testsaslauthd -u user -p pass -s imap
```

In these commands:
- `-u user` should be replaced with the actual username you want to test.
- `-p pass` should be replaced with the password for that user.
- `-s smtp` or `-s imap` specifies the service you're testing authentication for, either SMTP or IMAP.

{{< note "In Debian and derivative operating systems, when testing connection to SMTP or IMAP, you might need to specify the `-f /var/spool/postfix/var/run/saslauthd/mux` option. This is used to direct the system to the correct location of the `saslauthd` communication socket for proper authentication handling." "Note:" "notification" >}}

#### Understanding test results

- **Success**: A successful authentication test will output:
  ```text
  0: OK "Success."
  ```
  This output means that `saslauthd` successfully authenticated the user with the provided credentials, indicating that your SASL authentication setup for the specified service (SMTP or IMAP) is correctly configured.

- **Failed**: A failed authentication test will show:
  ```text
  0: NO "authentication failed"
  ```
  This message indicates that `saslauthd` was unable to authenticate the user. This could be due to incorrect credentials, permission issues, or configuration problems in your SASL or email server setup.

If you encounter a failed test, it's advisable to double-check the user credentials. Checking server logs can also offer more insights into the failure.

### Checking logs for email issues
With modern systems employing _systemd_, the approach to log inspection has evolved. Traditional log files like `/var/log/maillog` or `/var/log/mail.log` are no longer the primary resources for troubleshooting. Instead, `journalctl` provides a centralized and more efficient method to access logs from all _systemd_ services.

#### Checking SMTP logs with Postfix

For SMTP issues, use:

```text
journalctl -u postfix
```

This command shows logs related to Postfix, which is commonly used for SMTP.

#### Checking IMAP/POP3 logs with Dovecot

For problems with email retrieval via IMAP or POP3, use:

```text
journalctl -u dovecot
```

Dovecot logs provide insights into issues with retrieving emails from mail servers.

#### Checking authentication logs with `saslauthd`

For authentication problems, particularly related to SMTP, use:

```text
journalctl -u saslauthd
```

This displays logs from `saslauthd`, which handles authentication for various services including SMTP.

#### Real-time debugging

For real-time log monitoring, which can be useful when testing connections or replicating issues, add the `-f` parameter to any of the above commands. For example:

```text
journalctl -u postfix -f
```

This command tails the Postfix logs, showing new log entries in real time.

#### Analyzing logs

When analyzing logs:

1. **Look for error messages**: Identify error codes or descriptive messages that can indicate the cause of the problem.
2. **Check timestamps**: Ensure the logs correspond to the time when the issue occurred.
3. **Note behavior patterns**: Recurring issues or patterns in the logs can offer clues to underlying problems.

#### Taking further action

Based on your log analysis:

- **Adjust configurations**: Modify settings as needed to resolve identified issues.
- **Restart services**: Some problems may require restarting the affected service.
- **Consult resources**: If logs don’t provide clear answers, consult Virtualmin’s support documentation or forums for more specific assistance.

### DNS resolution for mail troubleshooting

Many email delivery problems can stem from incorrect DNS configurations. Ensuring that DNS is correctly set up for your domain is a critical step in troubleshooting mail issues. Key aspects to verify include the MX (Mail Exchange) record and the resolution of the domain names it points to.

#### Testing DNS resolution

To check DNS configurations, you can use the `host` and `dig` commands, which provide information about various DNS records associated with a domain.

**Checking MX records**

Start by examining the MX record for your domain:

```text
host -t mx yourdomain.com
```

This command retrieves the MX record for `yourdomain.com`. The output should indicate which mail server handles emails for the domain. For example:

```text
yourdomain.com mail is handled by 5 mail.yourdomain.com.
```

**Verifying address resolution**

Next, check the address resolution of the mail server:

```text
host mail.yourdomain.com
```

This command should return the IP address of `mail.yourdomain.com`. A successful response confirms that the mail server's domain name is resolving correctly:

```text
mail.yourdomain.com has address 1.2.3.4
```

**Reverse DNS resolution**

Reverse DNS resolution can also be important for mail servers. Many email servers on the Internet use reverse DNS lookup as a method to combat spam. To check reverse resolution:

```text
host 1.2.3.4
```

Replace `1.2.3.4` with the IP address of your mail server. The server should reverse resolve to a domain name, although the specific domain it resolves to is less important than the fact that it resolves:

```text
4.3.2.1.in-addr.arpa domain name pointer mailserver.example.com.
```

#### Considerations for DNS testing

- Running these commands on your Virtualmin server might not provide a complete picture of DNS for external hosts. Incorrect glue records at your registrar could lead to different DNS results for external queries.
- To thoroughly check glue records and other DNS configurations, you might need to use `whois` or consult the BIND documentation in Webmin, particularly the [BIND Troubleshooting Tools](https://webmin.com/docs/modules/bind-dns-server/#bind-troubleshooting-tools) section.


### Managing reverse DNS resolution for email servers

Reverse DNS resolution plays an important role in email delivery. Many mail servers reject emails from servers lacking correct reverse resolution. Understanding and managing this aspect is key to ensuring reliable email communication.

#### Understanding reverse resolution

Reverse DNS resolution (rDNS) differs from forward DNS resolution. It involves resolving an IP address back to a domain name. The authority for reverse resolution lies with the IP address owner, typically your hosting provider or ISP.

#### Importance of rDNS

- **Spam prevention**: Incorrect or absent rDNS is often flagged by spam filters and mail servers, leading to email rejection.
- **Server credibility**: A correctly set up reverse DNS entry adds legitimacy to your server, enhancing its trustworthiness in the eyes of other mail servers.

#### Setting up reverse DNS

Virtualmin doesn't directly handle reverse DNS due to its complexities, especially on servers with multiple virtual hosts sharing a single IP. Here's how to approach setting up reverse DNS:

1. **Identify the authoritative entity**:
   - Determine who controls your IP addresses. This is usually your hosting provider.
   - Use `whois` to find details about your IP address, including authoritative servers for PTR records.
     ```text
     whois 1.2.3.4
     ```
     Replace `1.2.3.4` with your server's actual IP address.

2. **Contact your provider**:
   - Request your provider to set up a reverse DNS entry for your IP address.
   - If possible, ask them to delegate the zone to your DNS servers.

3. **Setting up rDNS on your server**:
   - If your provider delegates the reverse DNS zone to your server, set up the necessary PTR records using BIND.

4. **Verify rDNS setup**:
   - Once set up, you can verify the reverse DNS entry by using various online tools or the `host` command:
     ```text
     host 1.2.3.4
     ```

#### Considerations

- **One entry per IP**: Typically, you create one reverse DNS entry per IP address, not per virtual host.
- **Coordination is key**: Successfully setting up reverse DNS often requires cooperation with your network provider.


### Verifying spam filtering effectiveness

If you're receiving an overwhelming amount of spam, it's possible that SpamAssassin, the primary tool for spam filtering in Virtualmin, might not be configured correctly, or there could be issues with Procmail, the mail processing utility. To determine if your emails are being adequately filtered for spam, you should inspect the headers of your received messages.

#### Checking email headers

Email headers contain valuable information about the processing journey of an email, including any spam filtering actions. To view these headers:

1. **Using Usermin or Webmin read mail module**: 
   - Open an email and look for the **View Full Headers** link, usually located in the upper right corner of the email interface. Clicking this will reveal the complete set of headers for that message.

2. **Using other mail clients**: 
   - Most email clients provide a way to view the full headers or the raw message. This option is often found in the settings or options menu when viewing an individual email.

#### Identifying spam filter headers

When inspecting the headers, look for headers that start with `X-Spam-`. These are added by SpamAssassin and indicate that the email has been processed for spam. Examples of such headers include:

- `X-Spam-Status`: Shows the spam status of the email.
- `X-Spam-Score`: Indicates the spam score assigned to the email.

#### What if spam headers are missing?

If these `X-Spam-` headers are absent, it suggests a few possible issues:

- **SpamAssassin disabled**: SpamAssassin might be disabled for the domain or the specific user.
- **Procmail misconfiguration**: If Procmail is not configured correctly, it might not be routing emails through SpamAssassin as expected. Check Procmail rules and settings to ensure proper integration.
- **Domain-level settings**: Ensure that spam filtering is enabled at the domain level. Each domain in Virtualmin can have individual spam filtering settings.

### Confirming the functionality of virus scanning

A simple and effective way to test this is by using the EICAR test string, a non-malicious string recognized by antivirus programs as a virus signature.

#### Testing with the EICAR test string

The EICAR test string is a standardized set of characters developed by the European Institute for Computer Antivirus Research (EICAR) to safely test virus detection capabilities. Here's how to use it:

1. **Create a test email**: 
   - Write an email to yourself or another account on your server.
   - Attach a file containing the EICAR test string. This string is specifically designed to be detected as a virus by antivirus programs, despite being harmless.

2. **Send and observe**: 
   - Send the email with the EICAR test attachment.
   - If the email arrives in your inbox with the attachment intact, it indicates that the antivirus scanning is not functioning correctly on your server.
   - If the email is blocked or arrives without the attachment, it signifies that the virus scanning process is operational.

#### Where to find the EICAR test string

- The EICAR test string can be obtained from the [EICAR official website](https://www.eicar.org/download-anti-malware-testfile).
- Follow the instructions on their website to download or copy the test string.

#### What to do if virus scanning fails

If the test email with the EICAR string passes through to the inbox, it's essential to troubleshoot the virus scanning setup on your server:

- **Check ClamAV configuration**: Ensure that ClamAV, the usual antivirus tool used in Virtualmin, is correctly installed, configured, and integrated with your email system.
- **Update virus definitions**: Regularly update the virus definitions for ClamAV to ensure it can detect the latest threats.
- **Review email processing rules**: Verify that your mail processing rules (like those in Procmail) are set to pass emails through ClamAV for scanning.

### Addressing "No Space Left on Device" errors in Mail Systems

Mail processing, delivery, and retrieval can encounter issues on systems with disk quotas, often manifesting as errors about disk space even when ample space seems available. These problems are frequently related to ClamAV processing and Dovecot's mail retrieval.

#### SpamAssassin and ClamAV processing and disk quotas

When using SpamAssassin and ClamAV for mail processing, the operations can be temporarily disk space-intensive, potentially exceeding disk quotas despite apparent available space.

**Solution:**

- **Separate `/tmp` directory**: Configure ClamAV or `clamd` to use a `/tmp` directory on a separate partition from `/home`. This separation allows ClamAV to utilize the necessary space for decompression and processing without being hindered by disk quotas.
- **Recommended partitioning**: For installations with disk quotas, it's advisable to have an independent `/home` partition, distinct from `/`, `/tmp`, and `/var`.

#### Dovecot index management on full disks

Dovecot may encounter issues managing its index files when disk quotas are filled, leading to challenges in mail retrieval.

**Solution:**

- **Alternate index location**: Configure Dovecot to store its index files in a different location from the mailboxes. This approach alleviates issues caused by full disks and allows Dovecot to function correctly.
- **Dovecot configuration**: Modify the `dovecot.conf` file to set an alternate location for index and control files, use the following configuration:
   ```text
   mail_location = maildir:~/Maildir:INDEX=/var/cache/dovecot/index/%u:CONTROL=/var/cache/dovecot/control/%u
   ```

- **Prepare Directories**: Ensure the directories `/var/cache/dovecot/index` and `/var/cache/dovecot/control` exist and are set to mode `6777` before applying these changes.
- **Restart Dovecot**: After making these changes, restart the Dovecot service to apply them.

### Why is all incoming email bouncing?

Bounced emails can be a symptom of discrepancies between your server's actual hostname and the hostname recorded in your configuration files. To resolve this, you need to ensure consistency across your system settings.

#### Steps to resolve email bouncing

1. **Verify server hostname**  
   Connect to your server via SSH as the _root_ user. Run the `hostnamectl --static` command to display the current system hostname.

2. **Check hosts file**  
   Open the `/etc/hosts` file and confirm that the hostname from the previous step is listed next to your server's external IP address. This file maps hostnames to IP addresses and must include your server's hostname for proper resolution.

3. **Inspect Postfix configuration**  
   Examine the `/etc/postfix/main.cf` file, particularly the `mydestination` parameter. This line should list the hostname that the `hostname` command returned. The `mydestination` setting defines what domains this Postfix instance will deliver locally, rather than forwarding.

4. **Apply changes**  
   If you've made any changes to the `/etc/hosts` or `/etc/postfix/main.cf` files, you'll need to restart Postfix to apply them. You can do this with the following command:
   ```text
   systemctl restart postfix
   ```

#### Finalizing the configuration

After restarting Postfix, send a test email to verify that the issue has been resolved. The server should now correctly accept incoming emails instead of bouncing them.
