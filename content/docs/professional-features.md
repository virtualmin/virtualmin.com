---
title: "Professional Features"
date: 2023-11-23
author: "Ilia Ross"
weight: 910000
---

Virtualmin GPL is already an extremely powerful and flexible virtual hosting control panel, so we're frequently asked about the differences between Virtualmin GPL and Virtualmin Professional. So, if you were wondering whether you should upgrade, you've come to the right place.

### Key attributes of professional features
Before going into specifics, we wanted to explain our philosophy on determining which features are included in both GPL and Professional, and which features are reserved for our paying customers. A feature is "professional", if any of the following are true:

  - It is really only useful in a commercial environment. We figure if you're using Virtualmin to make money, we'd like to make a little bit, too, so we can keep working on it, making it better, and releasing new versions. So, if it's obviously about making money, it's a candidate for only being in Virtualmin Professional. This doesn't mean all fiscally motivated features are excluded from GPL, but it is a starting point. **Reseller Accounts** are an example of this type of feature.
  - It costs us a lot of time and effort to keep it working. **Install Scripts** are the best example of this characteristic. Because there are so many, and because there are new versions that have to be deployed and tested every few days, we simply have to have revenue to support it.
  - It was an extremely large, and extremely expensive, feature to develop in the first place. This is a special case, and features that fit this description might end up in GPL eventually. A large number of the features you find in GPL today came about through this process. Mail processing is one example, as is PHP with **suexec** and **mod_fcgid** management.

{{< html span "" "" "newresels" >}}
#### Reseller accounts
One big difference in Virtualmin Professional is the addition of a reseller account type.

[![](/images/docs/screenshots/professional-features/light/reseller-accounts-create.png "Create Reseller Accounts Screenshot")](/images/docs/screenshots/professional-features/light/reseller-accounts-create.png)

This allows you to create users that can create users. These users can then be managed by the master administrator (_root_, and equivalents), or the reseller that created the account. These created users can also be re-assigned to other reseller accounts, or removed from control of the reseller, at any time by the master administrator.

It's worth pointing out that some users think they need this feature to allow users to create their own additional websites, but that's not the case. Both versions of Virtualmin allow users to create and manage their own websites (whether they are full featured sub-servers that have different content or aliases that point to an existing website). So, if you just need to allow unprivileged users to create new domain-based websites (and mail accounts, and everything that goes along with a website), reseller accounts are not necessary. Regular Virtualmin accounts, available in both GPL and Professional will work fine.

If you are a hosting provider, and you want to allow web developers to resell your services, you'll need Virtualmin Professional. Some large enterprise environments *might* find the reseller features useful for delegating web hosting management to local administrators or supervisors. We've also seen a few universities, colleges, and K12 schools use it for similar delegation. So, it's not *just* for reselling, but if you aren't a hosting provider, this feature probably won't be necessary.

{{< html span "" "" "newreseller" >}}
##### New reseller email
This feature is used to edit the template for the email message that can be sent to a new reseller account after it is created.

[![](/images/docs/screenshots/professional-features/light/reseller-accounts.png "Reseller Accounts Screenshot")](/images/docs/screenshots/professional-features/light/reseller-accounts.png)

#### Enhanced user management
Easily manage SSH public keys directly from the user interface and set up database and webserver users independently, without the need for Unix account setup.

[![](/images/docs/screenshots/professional-features/light/edit-users-list.png "Edit Users Screenshot")](/images/docs/screenshots/professional-features/light/edit-users-list.png)

{{< html span "" "" "manage-user-ssh-public-key" >}}
##### Manage SSH public keys
This feature allows you to manage SSH public keys for users, which can be used for passwordless login to the server over SSH.

[![](/images/docs/screenshots/professional-features/light/manage-user-ssh-public-key.png "Manage User SSH Public Key Screenshot")](/images/docs/screenshots/professional-features/light/manage-user-ssh-public-key.png)

{{< html span "" "" "manage-extra-database-users" >}}
##### Manage extra database users
This feature allows you to create and manage additional database users for a virtual server, which can be used to access databases without the need for creating a separate Unix user.

[![](/images/docs/screenshots/professional-features/light/create-extra-database-user.png "Manage Extra Database Users Screenshot")](/images/docs/screenshots/professional-features/light/create-extra-database-user.png)

{{< html span "" "" "manage-extra-webserver-users" >}}
##### Manage extra webserver users
This feature allows you to create and manage additional webserver users for a virtual server, which can be used to access website directories securely without the need for creating a separate Unix user.

[![](/images/docs/screenshots/professional-features/light/create-extra-webserver-user.png "Manage Extra Webserver Users Screenshot")](/images/docs/screenshots/professional-features/light/create-extra-webserver-user.png)

#### Manage web apps
<!-- Run this code in browser's console of Virtualmin Pro to get update table of scripts: $("td.ui_radio_radio").remove(),$('[name="fast"]').remove(),$("table thead th").first().remove(),$(".ui_select.heighter-28").each((function(){$(this).replaceWith($(this).val())})),$("tbody td label, tbody td a").each((function(){$(this).replaceWith($(this).text())})),$("table, table *").each((function(){for($(this).removeClass();this.attributes.length>0;)this.removeAttribute(this.attributes[0].name);$(this).is("input")&&$(this).remove()})); -->

Virtualmin Professional provides automated installation of dozens of installable web applications, including blogs, wikis, content management systems, ad servers, ecommerce systems, and more.

{{< details-start "post-indent-details details-no-marker details-margin-bottom details-small-inner" "<i class='wm wm-script'></i>&nbsp;&nbsp;List of installable web apps" >}}
{{% include file="/data/docs/list-of-installable-scripts.md" %}}
{{< details-end >}}

This feature is popular with pretty much everyone, because it's just so convenient. Even *we* use this feature heavily, because even though we aren't intimidated by most install procedures for applications, we also like to save time and hassle.

If you plan to run more than one or two web applications, this feature will come in very handy. It not only makes installation a snap, it also makes it easier to upgrade in most cases. For applications with an automate-able upgrade process, you can upgrade to the latest version with the click of a button. You can also have Virtualmin notify you when new versions become available, and mass-upgrade all installations of an application on your system.

{{< html span "" "" "demo_history" >}}
#### Resource usage graphs
Another popular feature is the resource usage graphs. This makes it easy to see how well your server is performing, how much memory is in use, CPU load, email and spam delivery rates, and many more variables, over time. In a commercial environment, it is extremely important to know about performance problems before they begin to affect your users. Likewise, when problems occur, it is important to be able to isolate the source of the trouble quickly. Comprehensive resource usage graphs can make those tasks much easier.

[![](/images/docs/screenshots/professional-features/light/system-statistics.png "System Statistics Screenshot")](/images/docs/screenshots/professional-features/light/system-statistics.png)

{{< html span "" "" "jailkit" >}}
#### Environment limitations
In addition to the basic Jailkit functionalities in the GPL version, Virtualmin Professional offers enhanced features for more control and flexibility. These include the ability to reset the jail environment to its minimal state, providing a clean slate for reconfigurations. It also allows for the selective inclusion of additional tools and commands from specific sections of the /etc/jailkit/jk_init.ini file, such as git or apacheutils. Furthermore, users can efficiently manage extra commands and directories, ensuring necessary dependencies are handled automatically for a seamless jail environment setup.

This expanded feature set in Virtualmin Professional provides a robust solution for users seeking advanced control and customization in server environment management, particularly for security and isolation capabilities.

[![](/images/docs/screenshots/professional-features/light/environment-limitations.png "Environment Limitations Screenshot")](/images/docs/screenshots/professional-features/light/environment-limitations.png)

{{< html span "" "" "edit_res" >}}
#### Resource limits
This feature allows you to define limits on CPU and memory use that apply to this virtual server and all sub-servers. Limits apply to both PHP scripts, and commands run via an SSH login. They can be used to prevent any one domain owner from overloading the system with a fork bomb or commands that use an excessive amount of RAM.

[![](/images/docs/screenshots/professional-features/light/resource-limits.png "Resource Limits Screenshot")](/images/docs/screenshots/professional-features/light/resource-limits.png)

{{< html span "" "" "edit_html" >}}
#### Edit web pages
This feature lets you create, upload, and edit HTML files directly on the virtual server, offering both a visual editor and a raw HTML editor for quick and flexible content modification.

[![](/images/docs/screenshots/professional-features/light/edit-web-pages.png "Edit Web Pages Editor Screenshot")](/images/docs/screenshots/professional-features/light/edit-web-pages.png)

{{< html span "" "" "edit_php" >}}

{{< html span "" "" "edit_connect" >}}
#### External connectivity check
This feature checks the external accessibility of virtual servers, to run various tests to ensure that one or more virtual server's web, DNS and mail servers are accessible from the rest of the Internet. This is useful for debugging various connectivity and configuration problems.

[![](/images/docs/screenshots/professional-features/light/check-connectivity.png "Check Connectivity Screenshot")](/images/docs/screenshots/professional-features/light/check-connectivity.png)

{{< html span "" "" "edit_maillog" >}}
#### Search mail logs
This feature can be used to search the email logs for messages to some virtual server, or all servers if you are the master administrator, where you can select one or more of the following criteria, all of which must match: start date, end date, source address and destination address.

[![](/images/docs/screenshots/professional-features/light/search-mail-log.png "Search Mail Log Screenshot")](/images/docs/screenshots/professional-features/light/search-mail-log.png)

[![](/images/docs/screenshots/professional-features/light/search-mail-log-results.png "Search Mail Log: Message Details Screenshot")](/images/docs/screenshots/professional-features/light/search-mail-log-results.png)

#### Cloud DNS providers
This feature is used to configure Virtualmin to use cloud DNS services (Cloudflare DNS, Google Cloud DNS, Amazon Route 53) other than your own system. These typically provide higher availability and faster DNS lookups to clients, for a cost per hosted domain.

[![](/images/docs/screenshots/professional-features/light/cloud-dns-providers.png "Cloud DNS Providers Screenshot")](/images/docs/screenshots/professional-features/light/cloud-dns-providers.png)

{{< html span "" "" "smtpclouds" >}}
#### Cloud mail delivery providers
This feature provides support for systems with dynamic IPs reliably send email by using outgoing SMTP providers, like Amazon SES.

[![](/images/docs/screenshots/professional-features/light/cloud-mail-delivery-providers.png "Cloud Mail Delivery Providers Screenshot")](/images/docs/screenshots/professional-features/light/cloud-mail-delivery-providers.png)

{{< html span "" "" "newnotify" >}}
#### Email server owners
This feature can be used to send email to the owners of the selected virtual servers, for example to announce system down-time, upgrades or other service alterations. Substitions such as `${USER}`, `${DOM}`, `${HOME}` and other can be used in the message body and subject.

[![](/images/docs/screenshots/professional-features/light/email-server-owners.png "Email Server Owners Screenshot")](/images/docs/screenshots/professional-features/light/email-server-owners.png)

{{< html span "" "" "newretention" >}}
#### Mailbox cleanup
This feature can be used to setup a mailbox cleanup policy that applies to some or all virtual servers on your system. Unlike the per-domain spam and virus folder cleanup settings, this policy applies to all folders of all users in each chosen domain, including the inbox. Message deletion can be based either on a time threshold, or a maximum mailbox size. Deletion based on message age is an easy way to setup a retention policy to limit the maximum age of stored messages. 

[![](/images/docs/screenshots/professional-features/light/mailbox-cleanup.png "Mailbox Cleanup Screenshot")](/images/docs/screenshots/professional-features/light/mailbox-cleanup.png)

{{< html span "" "" "newlinks" >}}
#### Custom links
This feature allow the administrator to include additional links that appear in the left navigation menu when a virtual server is selected.

[![](/images/docs/screenshots/professional-features/light/create-custom-link.png "Create Custom Link Screenshot")](/images/docs/screenshots/professional-features/light/create-custom-link.png)

{{< html span "" "" "remotedns" >}}
#### Remote DNS servers
This feature lets you add a remote DNS server running on another system managed by Virtualmin, allowing it to be used as primary or secondary to improve reliability or provide external DNS for specific virtual servers.

[![](/images/docs/screenshots/professional-features/light/remote-dns-servers.png "Remote DNS Servers Screenshot")](/images/docs/screenshots/professional-features/light/remote-dns-servers.png)

{{< html span "" "" "newacmes" >}}
#### SSL providers
This feature allows you to choose from a variety of SSL certificate providers, including Let's Encrypt, ZeroSSL, Google Trust Services, Buypass, SSL.com, Sectigo, and others. You can also set up automatic renewal of SSL certificates, choose between RSA and EC certificate algorithms, and check connectivity before requesting a certificate.

[![](/images/docs/screenshots/professional-features/light/ssl-providers.png "SSL Providers Screenshot")](/images/docs/screenshots/professional-features/light/ssl-providers.png)

{{< html span "" "" "newmxs" >}}
#### Secondary mail servers
This feature is used to add a secondary mail server that can also receive email for one of the virtual servers managed by Virtualmin, but only as a temporary relay rather than the final destination. It is wise to setup a secondary server for heavily used mail domains, to act as a backup or holding place in case the primary mail server is down.

[![](/images/docs/screenshots/professional-features/light/secondary-mail-servers.png "Secondary Mail Servers Screenshot")](/images/docs/screenshots/professional-features/light/secondary-mail-servers.png)

{{< html span "" "" "newquotas" >}}
#### Disk quota monitoring
This feature can be used to set up regular automatic checking of virtual servers that have reached or are approaching their disk quotas. It is most useful on systems that do not have group quota support, and thus depend on manual enforcement to ensure that servers do not use more than their allowed disk space.

[![](/images/docs/screenshots/professional-features/light/disk-quota-monitoring.png "Disk Quota Monitoring Screenshot")](/images/docs/screenshots/professional-features/light/disk-quota-monitoring.png)

{{< html span "" "" "newcmass" >}}
#### Batch create servers
This feature allows you to create multiple virtual servers at once from a text file.

[![](/images/docs/screenshots/professional-features/light/batch-create-servers.png "Batch Create Servers Screenshot")](/images/docs/screenshots/professional-features/light/batch-create-servers.png)

{{< html span "" "" "bkeys" >}}
#### Backup encryption keys
This feature is used to create and manage GPG keys that Virtualmin can use to backup virtual servers. Encryption protects the contents of your backups when they are stored on an untrusted remote system (such as S3), and detects unauthorized modifications.

[![](/images/docs/screenshots/professional-features/light/backup-encryption-keys.png "Backup Encryption Keys Screenshot")](/images/docs/screenshots/professional-features/light/backup-encryption-keys.png)
