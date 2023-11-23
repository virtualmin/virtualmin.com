---
title: "Professional Features"
date: 2023-11-23
draft: false
weight: 910
---

Virtualmin GPL is already an extremely powerful and flexible virtual hosting control panel, so we're frequently asked about the differences between Virtualmin GPL and Virtualmin Professional. So, if you were wondering whether you should upgrade, you've come to the right place.

### What makes a feature "professional"

Before going into specifics, we wanted to explain our philosophy on determining which features are included in both GPL and Professional, and which features are reserved for our paying customers. A feature is "professional", if any of the following are true:

  - It is really only useful in a commercial environment. We figure if you're using Virtualmin to make money, we'd like to make a little bit, too, so we can keep working on it, making it better, and releasing new versions. So, if it's obviously about making money, it's a candidate for only being in Virtualmin Professional. This doesn't mean all fiscally motivated features are excluded from GPL, but it is a starting point. **Reseller Accounts** are an example of this type of feature.
  - It costs us a lot of time and effort to keep it working. **Install Scripts** are the best example of this characteristic. Because there are so many, and because there are new versions that have to be deployed and tested every few days, we simply have to have revenue to support it.
  - It was an extremely large, and extremely expensive, feature to develop in the first place. This is a special case, and features that fit this description might end up in GPL eventually. A large number of the features you find in GPL today came about through this process. Mail processing is one example, as is PHP with **suexec** and **mod_fcgid** management.

#### Reseller accounts

One big difference in Virtualmin Professional is the addition of a reseller account type.

[![](/images/docs/screenshots/professional-features/light/reseller-accounts.png "Reseller Accounts Screenshot")](/images/docs/screenshots/professional-features/light/reseller-accounts.png)

This allows you to create users that can create users. These users can then be managed by the master administrator (_root_, and equivalents), or the reseller that created the account. These created users can also be re-assigned to other reseller accounts, or removed from control of the reseller, at any time by the master administrator.

It's worth pointing out that some users think they need this feature to allow users to create their own additional websites, but that's not the case. Both versions of Virtualmin allow users to create and manage their own websites (whether they are full featured sub-servers that have different content or aliases that point to an existing website). So, if you just need to allow unprivileged users to create new domain-based websites (and mail accounts, and everything that goes along with a website), reseller accounts are not necessary. Regular Virtualmin accounts, available in both GPL and Professional will work fine.

If you are a hosting provider, and you want to allow web developers to resell your services, you'll need Virtualmin Professional. Some large enterprise environments *might* find the reseller features useful for delegating web hosting management to local administrators or supervisors. We've also seen a few universities, colleges, and K12 schools use it for similar delegation. So, it's not *just* for reselling, but if you aren't a hosting provider, this feature probably won't be necessary.

#### Install scripts

Virtualmin Professional provides automated installation of dozens of [installable web applications](http://www.virtualmin.com/docs/install-scripts), including blogs, wikis, content management systems, ad servers, ecommerce systems, and more.

This feature is popular with pretty much everyone, because it's just so convenient. Even *we* use this feature heavily, because even though we aren't intimidated by most install procedures for applications, we also like to save time and hassle.

If you plan to run more than one or two web applications, this feature will come in very handy. It not only makes installation a snap, it also makes it easier to upgrade in most cases. For applications with an automate-able upgrade process, you can upgrade to the latest version with the click of a button. You can also have Virtualmin notify you when new versions become available, and mass-upgrade all installations of an application on your system.

#### Resource usage graphs

Another popular feature is the resource usage graphs. This makes it easy to see how well your server is performing, how much memory is in use, CPU load, email and spam delivery rates, and many more variables, over time. In a commercial environment, it is extremely important to know about performance problems before they begin to affect your users. Likewise, when problems occur, it is important to be able to isolate the source of the trouble quickly. Comprehensive resource usage graphs can make those tasks much easier.

<img class="aligncenter size-full wp-image-14733" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-graphs.png" alt="" width="2226" height="980">


#### Resource limits

This feature allows you to define limits on CPU and memory use that apply to this virtual server and all sub-servers. Limits apply to both PHP scripts, and commands run via an SSH login. They can be used to prevent any one domain owner from overloading the system with a fork bomb or commands that use an excessive amount of RAM.

<img class="aligncenter size-full wp-image-14719" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-resource-limits-e1657844016565.png" alt="" width="2240" height="604">

#### Proxy paths

Proxying allows you to map a URL path in a virtual server's website to one or more destination URLs. It can be used to make other services available via a URL path on your website. For example, you might map the path `/nodejs` to the URL `http://localhost:3000`, an instance serving the application running on your Virtualmin system.

<img class="aligncenter size-full wp-image-14720" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-proxy-paths-e1657843957382.png" alt="" width="2244" height="572">

#### External connectivity check
This feature checks the external accessibility of virtual servers, to run various tests to ensure that one or more virtual server's web, DNS and mail servers are accessible from the rest of the Internet. This is useful for debugging various connectivity and configuration problems.

<img class="aligncenter size-full wp-image-14724" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-connectivity-check-e1657843879968.png" alt="" width="2242" height="678">

#### Search mail logs

This feature can be used to search the email logs for messages to some virtual server, or all servers if you are the master administrator, where you can select one or more of the following criteria, all of which must match: start date, end date, source address and destination address.

<img class="aligncenter size-full wp-image-14726" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-search-mail-log-e1657843819513.png" alt="" width="2244" height="690">

<img class="aligncenter size-full wp-image-14765" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-search-mail-log-details-1.png" alt="" width="2244" height="542">


#### Cloud DNS providers
This feature is used to configure Virtualmin to use cloud DNS services (Cloudflare DNS, Google Cloud DNS, Amazon Route 53) other than your own system. These typically provide higher availability and faster DNS lookups to clients, for a cost per hosted domain.

<img class="aligncenter size-full wp-image-14775" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-cloud-dns-providers.png" alt="" width="2244" height="444">

#### Cloud mail delivery providers

This feature provides support for systems with dynamic IPs reliably send email by using outgoing SMTP providers, like Amazon SES.

<img class="aligncenter size-full wp-image-14735" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-cloud-mail-delivery-providers-e1657843563582.png" alt="" width="2244" height="723">


#### Email server owners

This feature can be used to send email to the owners of the selected virtual servers, for example to announce system down-time, upgrades or other service alterations. Substitions such as `${USER}`, `${DOM}`, `${HOME}` and other can be used in the message body and subject.


<img class="aligncenter size-full wp-image-14745" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-mail-server-owners-e1657843386215.png" alt="" width="2242" height="1008">


#### Mailbox cleanup

This feature can be used to setup a mailbox cleanup policy that applies to some or all virtual servers on your system. Unlike the per-domain spam and virus folder cleanup settings, this policy applies to all folders of all users in each chosen domain, including the inbox. Message deletion can be based either on a time threshold, or a maximum mailbox size. Deletion based on message age is an easy way to setup a retention policy to limit the maximum age of stored messages. 

<img class="aligncenter size-full wp-image-14748" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-mailbox-cleanup-e1657843275809.png" alt="" width="2244" height="1026">


#### New reseller email

This feature is used to edit the template for the email message that can be sent to a new reseller account after it is created.

<img class="aligncenter size-full wp-image-14759" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-new-reseller-email.png" alt="" width="2244" height="862">


#### Custom links

This feature allow the administrator to include additional links that appear in the left navigation menu when a virtual server is selected.

<img class="aligncenter size-full wp-image-14761" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-custom-links.png" alt="" width="2244" height="742">


#### Secondary mail servers

This feature is used to add a secondary mail server that can also receive email for one of the virtual servers managed by Virtualmin, but only as a temporary relay rather than the final destination. It is wise to setup a secondary server for heavily used mail domains, to act as a backup or holding place in case the primary mail server is down.

<img class="aligncenter size-full wp-image-14763" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-secondary-mail-servers.png" alt="" width="2244" height="456">


#### Disk quota monitoring

This feature can be used to set up regular automatic checking of virtual servers that have reached or are approaching their disk quotas. It is most useful on systems that do not have group quota support, and thus depend on manual enforcement to ensure that servers do not use more than their allowed disk space.


<img class="aligncenter size-full wp-image-14767" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-disk-quota-monitoring.png" alt="" width="2244" height="1284">


#### Batch create servers

This feature allows you to create multiple virtual servers at once from a text file.

<img class="aligncenter size-full wp-image-14769" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-batch-create-servers.png" alt="" width="2244" height="1304">


#### Backup encryption keys

This feature is used to create and manage GPG keys that Virtualmin can use to backup virtual servers. Encryption protects the contents of your backups when they are stored on an untrusted remote system (such as S3), and detects unauthorized modifications.

<img class="aligncenter size-full wp-image-14772" src="https://www.virtualmin.com/wp-content/uploads/2022/07/professional-feature-backup-encryption-keys.png" alt="" width="2244" height="592">



