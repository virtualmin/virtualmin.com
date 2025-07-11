---
title: "How to Migrate to a New Server"
author: "Ilia Ross"
date: "2023-12-12"
weight: 2510505
---

Migrating your Virtualmin installation to a new server involves several steps, such as backups and restores, testing, and going live. This document is designed to help you navigate through this process. The process of migrating your Virtualmin installation is versatile, and unaffected by differences in operating system, version, or architecture. For example, you can smoothly transition from an Alma-based LAMP stack to a Debian-based LEMP stack, or from a LAMP stack on Ubuntu to a LEMP stack on Rocky.

### Lower DNS TTL

Start by reducing the DNS Time-to-Live (TTL) settings to minimize caching issues during the switch. Execute the following command on your current server about 48 hours before the migration:

```text
virtualmin modify-dns --all-domains --ttl 300
```

This sets the TTL to 5 minutes, instructing DNS servers to refresh their cache of your domain information more frequently.

### Set up the new server

Install a preferred Linux distribution on your new machine. While it doesn’t need to match your old server's OS, sticking to a [Grade A supported OS](/docs/os-support/#grade-a-supported-systems) is wise for optimal compatibility and performance.

### Install Virtualmin

Next, install Virtualmin using the `virtualmin-install.sh` script. During the migration phase, it's acceptable to run Virtualmin Pro on both servers temporarily. Ignore any alerts about duplicate license usage; these will resolve once you decommission the old server.

### Generate and transfer backups

On your current server, create a backup directory and back up all virtual servers using these commands:

```test
mkdir /root/backups
virtualmin backup-domain --dest /root/backups/ --all-domains --all-features --newformat --all-virtualmin  
```

Transfer the backups to your new server with secure copy:

```test
scp -r /root/backups root@new-server.com:/root/
```

### Restore domains

Now the exciting part, restoring domains onto the new server. Run these commands, and be patient, it can take a while:

```test
virtualmin restore-domain --source /root/backups/virtualmin.tar.gz --all-virtualmin
virtualmin restore-domain --source /root/backups/ --all-domains --all-features
```

This process restores your Virtualmin settings first, then all your virtual servers.

### Testing phase

Test each site to ensure functionality. Use the **Preview Website** feature in Virtualmin, since DNS still points to the old server. If issues arise, check `$HOME/logs/error_log` for error messages that can help identify missing dependencies or other problems.

### Refresh backups&nbsp;(optional)

If substantial time has passed during testing, consider making fresh backups to capture recent data changes. Generate incremental backups on the old server with:

```test
virtualmin backup-domain --dest /root/backups/ --all-domains --all-features --newformat --all-virtualmin --incremental
```

### Going live

When you're satisfied with the testing, update your domain's nameserver IP addresses to point to the new server. This is the big switch.

#### Post-live testing

After going live, continue testing. Most issues should be straightforward to fix. If anything major comes up, you can temporarily revert the nameserver IP addresses back to the old server while you troubleshoot.

### Reset DNS TTL

When confident everything is stable, increase the DNS TTL back to normal to optimize DNS resolution performance:

```test
virtualmin modify-dns --all-domains --ttl 3600
```

### Final steps

With successful testing and DNS updates, your migration is complete! Enjoy your new server setup, and consider keeping the old one as a temporary backup during the transition period.

In addition, here are some suggestions to consider:

- **User notification**: Inform your users about planned downtimes and expected changes in service availability during the migration process.
- **Security review**: Post-migration, conduct a security audit to ensure that the new server adheres to your security policies and that all services are running as expected.

Remember, thorough planning and testing are the keys to a smooth migration.