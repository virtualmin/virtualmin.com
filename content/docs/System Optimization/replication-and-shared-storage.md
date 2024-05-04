---
title: "Replication and Shared Storage"
date: "2024-05-03"
author: "Ilia Ross"
weight: 2510610
---

In situations where a single system isn't sufficient for hosting a website due to high traffic or reliability concerns, replicating the site across multiple systems is a viable solution. This can be done using a front-end load balancer or multiple DNS entries to distribute traffic.

Virtualmin supports domain replication using backup and restore processes. Replication in Virtualmin is one-way, with a master system acting as the source of truth, and its state periodically copied to one or more replica systems.

### Requirements for domain replication

For effective replication, all Virtualmin systems should share domain home directories from a central server, typically using NFS. A databases should also be stored remotely, accessible by all Virtualmin systems. This setup is crucial for dynamic websites to keep application states synchronized. For static content sites, file sharing setup might be optional.

#### Setting up remote database and NFS  
This involves configuring remote database access and exporting/mounting directories via NFS. Detailed guides can be found here:
   - [Running Database on a Remote System](/docs/server-components/running-database-on-a-remote-system)
   - [Exporting Directories via NFS](https://webmin.com/docs/modules/nfs-exports)
   - [Mounting Filesystems using NFS](https://webmin.com/docs/modules/disk-and-network-filesystems)

When databases and home directories are shared, only domain metadata needs replication.

### Replicating your first domain

Once all systems are set up with shared storage, follow these steps to replicate a domain:

1. **Create and test domain on master**  
    Set up your domain, for example `domain.com` on the master system named `master.hostname.com`

2. **Transfer domain to replica**
   - SSH into the master system as _root_.
   - Run the command:
     ```test
     virtualmin transfer-domain --domain domain.com --host replica.hostname.com --replication --output --overwrite
     ```
     {{< note "If SSH keys are not set up, use the `--pass` flag to specify the password for the _root_ user on the replica system (not recommended)." "Note:" "notification" >}}

3. **Update DNS or load balancer**  
    Update any DNS records or load balancer configuration for the `domain.com` domain to use the IPs of both `master.hostname.com` and `replica.hostname.com` systems.

4. **Test the site**  
    Test that the site is accessible and functions correctly when traffic is being sent to both systems.

### Scheduled replication

After successful manual replication, set up regular scheduled replication to keep settings in sync:

- Create a `cron` job on the master system to run:
  ```text
  virtualmin transfer-domain --domain domain.com --host replica.hostname.com --replication --overwrite
  ```
- If shared storage is used for home directories and databases, a frequent schedule (e.g., every 10 minutes) is feasible, as the amount of data to transfer will be small.

### Deleting domains

When deleting a domain from a replica:

- Use the `--preserve-remote` flag in the `delete-domain` API command or the corresponding UI checkbox to avoid removing shared contents.
- For complete removal, delete the domain from all replicas first, then from the master system.

{{< alert primary exclamation "" "A built-in [domain synchronization](https://archive.virtualmin.com/documentation/cloudmin/vm/vsync) feature in Cloudmin will automatically use replication mode when the destination system is running Virtualmin." >}}
