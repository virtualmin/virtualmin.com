---
title: "Troubleshooting Databases"
author: "Ilia Ross"
date: 2024-01-03
weight: 2510200
---

### Handling memory issues and preventing crashes

This troubleshoot aims to provide practical steps to troubleshoot and fix memory-related crashes in MySQL/MariaDB.

#### Identifying memory issues

1. **Check for OOM killer activity**
   - Use `journalctl -k | grep -i 'out of memory'` or `dmesg -T | grep -i 'killed process'` to check if the OOM killer has been terminating processes.
   - Look for lines mentioning MySQL or MariaDB.

2. **Monitor memory usage**
   - Use `free -mh` to view available and used memory.
   - Use `top` or `htop` to monitor real-time memory usage.

#### Reducing memory usage

**Tune MySQL/MariaDB settings**
   - Check `innodb_buffer_pool_size`: This setting controls the size of the buffer pool. It specifies the size of the buffer pool, where InnoDB caches table and index data. A larger buffer pool allows more data to be held in memory, reducing disk I/O but using more RAM.
   - Check `key_buffer_size`: This parameter is significant for MyISAM tables. It defines the size of the buffer used for index blocks. Increasing this value can improve the speed of index reads for MyISAM tables.
   - Check `sort_buffer_size`: This is the per-connection buffer used for sorting. Each client connection gets its own sort buffer of this size.
   - Modify `max_connections`: Decrease this if too many simultaneous connections are causing memory issues.

#### Increasing available memory

1. **Add physical memory (RAM)**: If the server is consistently running out of memory, consider adding more physical RAM.

2. **Configure swap space**: As a temporary solution, add or increase swap space.

#### Implement monitoring tools
   - Set up special tools like [Zabbix](https://www.zabbix.com/download) to monitor system and database performance.
   - Configure MySQL/MariaDB monitor and/or alerts for high memory usage in **Webmin / Tools ⇾ System and Server Status** module.

### Why can all of my users see a database named `test`?
MySQL and MariaDB, in their earlier versions, prior to 5.6, used to create a `test` database by default. This database was accessible by any user, and it was primarily intended for testing purposes. However, the creation of this database by default was eventually seen as a security risk, and more recent versions of these systems have stopped including it by default.
