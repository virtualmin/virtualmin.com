---
title: "OS Support"
date: 2024-07-10
draft: false
weight: 900000
---

Virtualmin runs on top of Webmin. Webmin is compatible with nearly every UNIX-based OS on the planet, and so Virtualmin can, with a little work, run on just about all of those same systems. However, we offer an automated [installation script](https://software.virtualmin.com/gpl/scripts/virtualmin-install.sh), as well as a well-maintained software updates system, for a few very popular operating systems.

If you're just starting out with Virtualmin, and want to have an easy installation process and smoothly running system, we strongly recommend you choose from the following Grade A supported systems. If in doubt about which of these systems to choose, we recommend the most recent supported version of the one you are most familiar with.

### Grade A supported systems

Grade A systems have an automated installation script, a well-maintained software repository for updates, and are expected to work out of the box if you run the install script on a freshly installed system running one of these OS. We strongly recommend the current stable release of one of these systems for most users. We never support beta or pre-release versions of any OS.

- Debian 11 and 12 on i386 and amd64
- Ubuntu 20.04 LTS, 22.04 LTS and 24.04 LTS on i386 and amd64
- Rocky, Alma, and RHEL 8 and 9 on x86_64

### Grade B supported systems

The following operating systems are _not_ recommended for new or intermediate users. You will need to have experience with your OS and with Virtualmin to successfully use any of these operating systems. Don't bother asking for help installing on any of these systems in the forum, you should only be attempting it if you already know what you're doing. Otherwise choose a grade A supported OS.

Most Grade B systems do not fully support automatic installation but are expected to work well, if you are capable of performing all of the necessary configuration and installation steps to get the other necessary components working together. There have been Virtualmin installations on all of these systems, but they are only recommended for experts. We will try to support Virtualmin and Webmin on these platforms within the bounds of our knowledge, but they have received little-to-no direct testing by us.

#### Grade B systems with automatic installation support

For enabling automatic installation support, use the `--unstable` param when running the `virtualmin-install.sh` script.

##### Debian derivatives
- Ubuntu interim (non-LTS) on i386 and amd64
- Kali Linux Rolling 2023 and above on i386 and amd64
##### EL derivatives
- CentOS Stream 8 and 9 on x86_64
- Fedora Server 40 and above on x86_64
- Amazon Linux 2023 and above on x86_64
- Oracle Linux 8 and 9 on x86_64
- CloudLinux Linux 8 and 9 on x86_64
- openEuler 24.03 and above on x86_64

#### Grade B systems without automatic installation support
- Raspbian Linux
- openSUSE Linux
- FreeBSD
- OpenBSD
- NetBSD

### Others

If it's not on the lists above, and it's a UNIX-based OS, Virtualmin can probably still work for you. Try installing Webmin first. If it works, then you're about halfway to confirming that Virtualmin will also work, but it will not be easy or quick to set it up. The installation process to make all of the services work together in a friendly way is wildly complicated, and should only be undertaken if you are an expert with both your OS and all of the services you'll be using with Virtualmin.

While Webmin provides limited support for Windows, Virtualmin does not work at all on Windows-based OS at this time, and it is not in our near-term plans to add support for Windows-based systems.
