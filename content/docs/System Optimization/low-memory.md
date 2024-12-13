---
title: "Low Memory"
date: "2023-01-13"
author: "Ilia Ross"
weight: 2510600
---

A default installation of Virtualmin is optimized for performance rather than minimal memory usage. This configuration can lead to issues on systems with 1GB or less RAM, especially on VPS without swap space. 

Efficient memory management is essential for optimal performance. In terms of RAM usage, SpamAssassin can easily consume 1GB, while ClamAV often requires at least 2GB. MySQL or MariaDB usually require upwards of 400MB of memory, dependent on configuration settings. Apache can consume around 250MB, and BIND's memory usage can surpass 100MB, influenced by the number of hosted zones and its role as a recursive DNS server. PHP's memory consumption typically exceeds 100MB and also varies significantly based on its configuration settings. At the lower end, Virtualmin uses about 30MB and Postfix remains around 5MB.

### Reduce SpamAssassin and ClamAV memory usage
Basic mail services are lightweight in terms of memory usage, but incorporating spam and antivirus filtering, like SpamAssassin and ClamAV, significantly ramps up resource demands. For systems constrained by limited memory, a viable solution is to delegate spam and antivirus filtering tasks to an external server or to fully offsite email service.

Virtualmin offers a solution for remote management of ClamAV and SpamAssassin, allowing several servers to share a centralized scanning server, which efficiently allocates resources as described in the [Spam and Virus Scanning](/docs/server-components/spam-and-virus-scanning) documentation.

For setups where local mail delivery is crucial and external filtering isn't an option, the most effective way to save memory is to disable SpamAssassin and ClamAV completely. It's important to note that using these services on-demand might seem like a way to reduce memory usage, but this can lead to increased CPU usage and longer processing times. As a result, the overall performance can be negatively impacted, particularly in environments with limited CPU and memory resources.

To disable both SpamAssassin and ClamAV to optimize memory usage and system performance, follow these steps to accomplish this:

1. Log in as the master administrator.
2. Go to **Email Settings ⇾ Spam and Virus Scanning** page.
3. Disable and stop the services for spam and virus scanning.
4. Save the changes.

Furthermore, you should disable spam and antivirus features in Virtualmin by following these steps:

1. Log in as the master administrator.
2. Go to **System Settings ⇾ Features and Plugins**.
3. Disable the spam and antivirus features.
4. Save the changes.

By disabling both SpamAssassin and ClamAV, you can free up significant memory and processing resources, ensuring the efficiency and stability of your low-memory system.

### Reduce MySQL/MariaDB memory usage

Optimizing MySQL or MariaDB for a low-memory or resource-constrained system involves making careful adjustments to your database configuration. These adjustments are aimed at reducing memory usage while maintaining acceptable performance.

Finding the main configuration file for MySQL or MariaDB is essential for customizing database settings, so at first, locate the main configuration file for MySQL or MariaDB where the `[mysqld]` section is located. The exact location and naming of the configuration file can vary depending on the operating system and the specific installation package used.

- **Search for the `[mysqld]` section**  
Run the following command to find files containing the `[mysqld]` section in the `/etc` directory:
    ```text
    grep -Rsi '\[mysqld\]' /etc
    ```
    This section indicates MySQL/MariaDB configuration. Be careful not to confuse it with the `[mysql]` section (for client settings) or similar-looking sections in other services like Fail2ban or Logrotate.

- **Review the search results**: Look for files typically located at `/etc/mysql`, `/etc/my.cnf.d` or within `/etc/mysql/mariadb.conf.d`.

- **Proceed with caution**: Always back up the configuration file before making any changes. After editing, restart the MySQL/MariaDB service to apply your changes.

- **Add or change the following directives to the `[mysqld]` section**

    ```text
    innodb_buffer_pool_size         = 32M
    innodb_log_buffer_size          = 4M
    innodb_flush_log_at_trx_commit  = 2
    query_cache_type                = 0
    query_cache_size                = 0
    max_connections                 = 50
    max_user_connections            = 50
    key_buffer_size                 = 4M
    max_allowed_packet              = 2M
    table_open_cache                = 16
    sort_buffer_size                = 64K
    read_buffer_size                = 32K
    read_rnd_buffer_size            = 128K
    net_buffer_length               = 2K
    thread_stack                    = 256K
    ```

These directives are designed to reduce memory usage while maintaining acceptable performance. The values can be adjusted further based on your specific server's performance and the nature of the traffic it handles.

### Reduce Apache memory usage

Managing memory usage in Apache is also important for optimizing performance and stability on low-memory systems.

{{< alert primary exclamation "" "Note that Nginx consumes less RAM compared to Apache, making it a more suitable choice for systems with limited memory. That's why the [Virtualmin LEMP bundle](/docs/installation/automated/#lamp-apache-vs-lemp-nginx) is often recommended for setups where keeping memory use low is important." >}}

Apache's memory usage is directly related to the number of processes and modules loaded.

#### Reduce persistent connections
Persistent connections are connections that remain open after a request is completed. This can reduce the number of processes required to handle requests, thereby reducing memory usage. The `KeepAlive` and `KeepAliveTimeout` directives can be adjusted to optimize memory usage. These directives are used to manage persistent connections. The `KeepAlive` directive enables persistent connections, while the `KeepAliveTimeout` directive sets the time in seconds that Apache waits for a new request from a client before closing the connection. The default value for `KeepAliveTimeout` is 5 seconds. Reducing this value can reduce the number of processes required to handle requests, thereby reducing memory usage.

This adjustment is made in the main Apache's configuration file, which varies depending on the operating system.

- **EL systems**: Edit the `/etc/httpd/conf/httpd.conf` file.
- **Debian and Derivatives**: Modify the `/etc/apache2/apache2.conf` file.

To make this adjustment, open the correct to your operating system Apache configuration file and add or modify the following directives:

```text
KeepAlive On
KeepAliveTimeout 3
```

#### Reduce processes
The number of processes used by Apache can be reduced by adjusting the directive mentioned below. These directives are used to manage the number of processes used by Apache. The default values for these directives vary depending on the operating system. Adjusting these values can reduce the number of processes required to handle requests, thereby reducing memory usage.

Multi-Processing Modules (MPMs), responsible for handling incoming requests, vary in type — "prefork", "worker", or "event" — depending on the default settings of your operating system distribution and its version. For a newer operating system distributions, the default MPM for Apache is typically set to "event", known for its efficiency in handling requests.

Before modifying your Apache configuration, it's crucial to identify which MPM is currently enabled and which configuration file is used for it. To determine which MPM is enabled, run the following command:

```text
apachectl -V | grep MPM
```

##### MPM: "prefork" and "worker"
Note that "prefork" and "worker" MPMs are mutually exclusive, and only one can be enabled and used at a time. Adjust the values from the sample configuration based on your current MPM. Configuration files may vary depending on the operating system.

For example, in Debian and derivatives, the configuration file is `/etc/apache2/mods-available/mpm_prefork.conf` for "prefork" MPM and `/etc/apache2/mods-available/mpm_worker.conf` for "worker" MPM. In EL systems, the configuration file is `/etc/httpd/conf.modules.d/00-mpm.conf`, however any custom directives for either "prefork" or "worker" MPM should be placed in a custom file under the `/etc/httpd/conf.d/` directory.

Here is a sample configuration to optimize memory usage on low-memory systems for "prefork" MPM:

```text
<IfModule prefork.c>
    StartServers            2
    MinSpareServers         2
    MaxSpareServers         5
    MaxRequestWorkers       50
    MaxConnectionsPerChild  500
</IfModule>
```

And, here is a sample configuration to optimize memory usage on low-memory systems for "worker" MPM:

```text
<IfModule worker.c>
    StartServers            2
    MinSpareThreads         8
    MaxSpareThreads         16
    ThreadLimit             64
    ThreadsPerChild         12
    MaxRequestWorkers       50
    MaxConnectionsPerChild  500
</IfModule>
```

##### MPM: "event"

The "event" MPM works similarly to the "worker" MPM but is more efficient in handling a large number of keep-alive connections. It uses a dedicated thread to manage keep-alive connections, freeing up worker threads to handle other requests. This can reduce memory usage and increase efficiency, especially in environments with limited resources.

Below is a sample configuration designed to optimize memory usage in low-memory systems:

```text
<IfModule event.c>
    StartServers            1
    MinSpareThreads         10
    MaxSpareThreads         25
    ThreadLimit             64
    ThreadsPerChild         10
    MaxRequestWorkers       50
    MaxConnectionsPerChild  500
</IfModule>
```

Remember to restart Apache after making changes to the configuration. This can be done using `systemctl restart httpd` on EL systems, or `systemctl restart apache2` on Debian and derivatives.

This configuration aims to balance the need for responsiveness with the limitations of low-memory environments. It should provide a good starting point, but you may need to tweak the settings further based on your specific server's performance and the nature of the traffic it handles.

#### Remove modules

To further reduce memory usage, consider disabling unused Apache modules. This can have a significant impact on memory consumption, but identifying which modules are not in use can be challenging. We recommend disabling modules one at a time and monitoring the server's performance to determine which modules are safe to disable.

### Reduce PHP memory usage

To optimize PHP memory usage, you can make the following adjustments:

- Lower the maximum memory allocation option in the PHP configuration. This can be done in the **Web Configuration ⇾ PHP-FPM Configuration: Resource Limits** page. Be aware that modifying this setting will impact the memory usage of all PHP scripts running on the server.

- Switch to PHP-FPM execution mode, which is often more efficient in terms of memory usage and performance. You can do this in the **Web Configuration ⇾ PHP Options** page. Additionally, choose the appropriate process manager mode based on your needs:

    - _dynamic_: This mode spawns child processes based on demand, providing a good balance between performance and memory usage.
    
    - _static_: This mode keeps a fixed number of child processes, which can be memory efficient if you set a low number of processes.
    
    - _ondemand_: This mode starts processes only when needed, saving memory when your site has low traffic. However, there might be a performance hit on initial requests as processes are spawned.

- Limit the number of sub-processes. The default recommendation is usually a good starting point, but you can adjust this number based on your actual traffic and workload.

### Virtualmin library pre-loading
On systems with limited memory, it may be helpful to disable the Webmin libraries' preloading feature to reduce memory consumption. Although preloading can enhance Virtualmin's responsiveness, especially with multiple users, the trade-off in memory efficiency may not justify the speed benefit on systems with limited memory, where preventing swapping is crucial for maintaining overall performance.

To disable preloading of Webmin libraries in Virtualmin, do the following:

1. Log in as the master administrator.
2. In the left menu, go to **System Settings ⇾ Virtualmin Configuration**.
3. In the **Server settings** section, set **Preload Virtualmin libraries at startup?** to **No**.
4. Save changes and re-check the Virtualmin configuration.

### Enable swap

To optimize memory usage, it is important to have a configured swap file or partition, especially on systems with limited RAM. If you don't have a swap partition or swap file, you can create one as follows:

#### Creating swap
1. **Create a swap file**  
   Use the `fallocate` command to create a swap file. For example, to create a 4 GB swap file:
     ```text
     fallocate -l 4G /swapfile
     ```

2. **Set correct permissions**
     ```text
     chmod 600 /swapfile
     ```
    {{< note "Only the _root_ user should have read and write permissions to the swap file for security reasons." "Note:" "notification" >}}

3. **Make the file a swap file**  
   Convert the file into a swap space:
     ```text
     mkswap /swapfile
     ```

4. **Enable the swap file**  
   Activate the swap file:
     ```text
     swapon /swapfile
     ```

5. **Make the swap file permanent**  
   Edit `/etc/fstab` to add the swap file:
     ```text
     echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
     ```

#### Enlarging swap

If you already have a swap file and need to enlarge it:

1. **Turn off existing swap**  
   Disable the current swap file:
     ```text
     swapoff -v /swapfile
     ```
     {{< note "Actual swap file name may vary. To find the swap file name, run `cat /proc/swaps` command." "Note:" "notification" >}}

2. **Resize the swap file**  
   If you want to increase the swap size to 8 GB, for example:
     ```text
     fallocate -l 8G /swapfile
     ```

3. **Make the file a swap file**
   ```text
   mkswap /swapfile
   ```

4. **Turn on swap**
   ```text
   swapon /swapfile
   ```

5. **Update `/etc/fstab` if needed**  
   If the swap file path or name changes, update `/etc/fstab` accordingly.

#### Considerations

- Ensure your system has enough free space to accommodate the swap file.
- The performance of swap space on a disk drive is typically much slower than physical RAM.
- For resizing a swap partition, it's more complex and may involve resizing disk partitions, which is riskier and should be done with caution and backups.
- Disable unused services to free up memory before trying to increase swap space. This can be accomplished in Virtualmin under **System Settings ⇾ Features and Plugins**, and in Webmin through **System ⇾ Bootup and Shutdown**. Services such as the Postgres database or Mailman should be disabled if they are not in use. If SSH/SFTP is available, it's recommended to disable ProFTPd. Furthermore, if your DNS is hosted externally, consider disabling the BIND DNS server.

Always back up important data before performing such operations, as mistakes can lead to data loss. Additionally, consider the impact on your system's performance and storage when adjusting swap space. For a better performance, it's recommended to add more RAM instead of increasing swap space.

### Understanding memory usage with the OOM Killer
The Out-Of-Memory (OOM) Killer in Linux-based systems is a mechanism that is invoked when the system is critically low on memory. The process that the OOM Killer terminates first depends on several factors, primarily the calculated OOM score of the processes running on the system.

#### How the OOM Killer selects a process to terminate
The OOM Killer evaluates all processes on the system and assigns each one an OOM score, which determines the likelihood of the process being terminated during an out-of-memory event. The calculation is based on:

- 	**Memory usage**
   
    Processes consuming more memory generally have higher scores.

- 	**OOM score `oom_score_adj` adjustment**

    Processes can have their score explicitly adjusted via `/proc/<pid>/oom_score_adj`, with values ranging from -1000 (never kill) to 1000 (high likelihood of being killed).

- 	**Critical system processes**

    Kernel threads and certain _root_-owned processes are deprioritized unless no other options are available.
- 	**Impact of termination**

    The OOM Killer prioritizes processes whose termination will free the most memory while minimizing disruption.

To view the OOM score of a running process:

```text
cat /proc/<pid>/oom_score
```

To see the adjustment value:

```text
cat /proc/<pid>/oom_score_adj
```

Processes with a higher OOM score are more likely to be terminated, but factors like process priority and system configuration can influence this decision.

#### Automatic adjustments based on process activity
The OOM score can automatically increase for processes that appear “idle” or less active, but this is indirectly influenced by memory usage trends and process behavior rather than a direct “idle detection.” For example:

- Processes holding large amounts of memory but not actively using it may see their OOM score increase over time.

- Background or low-priority processes (e.g., daemons, detached sessions) may become higher-priority candidates for termination because they are often deemed “less critical” to the system’s immediate performance.

- Inactive processes consuming significant portions of file cache or buffer memory can also gain higher badness scores because freeing their memory benefits the system.

#### Debugging memory usage

If you suspect that the OOM Killer is terminating processes on your system, you can use the following steps to investigate the issue:

- The `journalctl` command is used to query and display messages from the _systemd_ journal, which is a centralized log management system. To specifically check for out-of-memory issues, use the following command:

   ```text
   journalctl -k | grep -i 'Out of memory'
   ```

   This command filters kernel messages for entries related to out-of-memory conditions. It’s a primary tool for investigating if the Out-Of-Memory (OOM) Killer has been activated and which processes were affected.

- If `journalctl` does not provide the needed information, or if you are working on a system where _systemd_ is not present, use the `dmesg` command. This command displays messages from the kernel ring buffer, which includes messages about processes being killed:

   ```text
   dmesg -T | grep -i 'killed process'
   ```

   The `-T` option in `dmesg` displays human-readable timestamps, making it easier to correlate events with system issues. This command is particularly useful for identifying processes terminated by the kernel, including those affected by the OOM Killer.

- Don't forget to correlate the findings from system logs with application-specific logs. If a particular application was killed, its own logs might contain valuable information preceding the termination.

- While focusing on logs, it's also a good idea to use system monitoring tools like `top`, `htop`, or custom monitoring solutions to understand the overall resource utilization trends over time.
