---
title: "How to Setup Cron Jobs"
author: "Ilia Ross"
weight: 2170000
---


This tutorial provides a straightforward method for setting up a cron job in Virtualmin. Cron is used to schedule commands to run at specific intervals.

### How to create a cron job

Scheduling cron jobs is a fundamental aspect of system administration for automating repetitive tasks. Here's how to set up a cron job in Virtualmin:

1. **Click Webmin**  
   Select **Webmin** in the top-left corner.

2. **Click System**  
   Navigate to **System** to access system-related modules.

3. **Click Scheduled Cron Jobs**  
   Choose **Scheduled Cron Jobs** to manage cron tasks.

4. **Click Create a new scheduled cron job**  
   Start the process by selecting **Create a new scheduled cron job**:

   - **Choose user to run as**  
      Specify the user who will execute the cron job in **Execute cron job as**. For administrative tasks, input `root`.

   - **Enter the command**  
      In the **Command** field, type the command you want to schedule. For example, `ps auxw` to list all running processes.

   - **Set frequency**  
      Decide how often the command should run. The default setting is **Hourly**, which runs the command at the top of each hour.

5. **Create the Cron job**  
   To finalize and activate the cron job, click **Create**.

The output from the cron job will be sent to the root user's email by default.
