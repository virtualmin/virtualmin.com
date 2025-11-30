// Chocolat on index page
window.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector("#theme-toggle"),
        isMac = navigator.userAgent.includes("Mac"),
        altKey = isMac ? "⌥" : "Alt",
        concatKey = isMac ? " " : " + ",
        getScreenshots = function () {
            const screenshotType =
                localStorage.getItem("pref-theme") === "dark" ||
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light";
            const systemType = navigator.userAgent.includes("Mac") ? "mac" : "linux",
                  timeStamp = 202512010000;
            return [
                {
                    src: "/images/screenshots/" + screenshotType + "/1-dashboard.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Dashboard",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/2-virtual-server-summary.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Virtual Server Summary",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/3-create-virtual-server.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Create Virtual Server",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/4-edit-users.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Edit Users",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/5-create-user.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Create User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/6-create-ssh-user.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Create SSH User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/7-create-ftp-user.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Create FTP User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/8-create-mail-user.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Create Mail User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/9-create-database-user.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Create Database User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/10-create-webserver-user.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Create Webserver User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/11-edit-user-defaults.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Edit User Defaults",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/12-email-all-mailboxes.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Email All Mailboxes",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/13-email-client-settings.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Email Client Settings",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/14-edit-databases.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Edit Databases",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-install-script-wordpress.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Install WordPress",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-installed-script-wordpress.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Installed WordPress",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-manage-script-wordpress-dashboard.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Manage WordPress ⇾ Dashboard",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-manage-script-wordpress-system.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Manage WordPress ⇾ System",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-manage-script-wordpress-settings.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Manage WordPress ⇾ Settings",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-manage-script-wordpress-plugins.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Manage WordPress ⇾ Plugins",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-manage-script-wordpress-themes.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Manage WordPress ⇾ Themes",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-manage-script-wordpress-backup-and-restore.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Manage WordPress ⇾ Backup and Restore",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-manage-script-wordpress-clone.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Manage WordPress ⇾ Clone",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-manage-script-wordpress-development.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Web Apps ⇾ Manage WordPress ⇾ Development",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/16-file-manager.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ File Manager",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/16-file-manager-edit-file.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ File Manager ⇾ Edit File",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/17-terminal.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Terminal",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/17-terminal-edit-file-using-vim.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Terminal ⇾ Edit File using Vim",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/18-change-ip-address.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ Change IP Address",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/19-server-owner-limits.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ Server Owner Limits",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/20-move-virtual-server.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ Move Virtual Server",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/21-ssl-certificate.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ SSL Certificate",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/21-ssl-certificate-ssl-providers.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ SSL Certificate ⇾ Let's Encrypt",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/22-dns-options.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ DNS Settings ⇾ DNS Options",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/22-dns-records.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ DNS Settings ⇾ DNS Records",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/23-php-options.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Web Configuration ⇾ PHP Options",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/24-manage-php-configuration.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Web Configuration ⇾ Manage PHP Configuration",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/24-manage-php-configuration-resource-limits.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Web Configuration ⇾ Manage PHP Configuration ⇾ Resource Limits",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/24-manage-php-configuration-edit-manually.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Web Configuration ⇾ Manage PHP Configuration ⇾ Edit Configuration Manually",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/25-protected-web-directories.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Web Configuration ⇾ Protected Directories",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/25-proxy-paths.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Web Configuration ⇾ Proxy Paths",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/26-website-options.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Web Configuration ⇾ Website Options",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/27-spam-and-virus-delivery.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Mail Options ⇾ Spam and Virus Delivery",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/28-apache-access-log.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Logs and Reports ⇾ Apache Access Log",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/29-disk-usage.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Logs and Reports ⇾ Disk Usage",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/30-virtual-server-action-log.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Logs and Reports ⇾ Virtual Server Action Log",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/31-create-account-plan.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ System Settings ⇾ Account Plans",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/31-checking-configuration.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ System Settings ⇾ Re-Check Configuration",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/32-database-servers.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ System Settings ⇾ Database Servers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/33-edit-server-template-website-for-domain.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ System Settings ⇾ Server Templates ⇾ Website for Domain",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/34-change-ip-addresses.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Addresses and Networking ⇾ Change IP Addresses",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/35-cloud-dns-providers.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Addresses and Networking ⇾ Cloud DNS Providers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/36-dynamic-ip-update.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Addresses and Networking ⇾ Dynamic IP Update",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/37-shared-ip-addresses.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Addresses and Networking ⇾ Shared IP Addresses",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/38-domainkeys-identified-mail.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Email Settings ⇾ DomainKeys Identified Mail",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/38-mail-client-configuration.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Email Settings ⇾ Mail Client Configuration",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/38-mailbox-cleanup.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Email Settings ⇾ Mailbox Cleanup",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/39-spam-and-virus-scanning.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Email Settings ⇾ Spam and Virus Scanning",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/40-disk-quota-monitoring.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Limits and Validation ⇾ Disk Quota Monitoring",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/40-validate-virtual-servers.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Limits and Validation ⇾ Validate Virtual Servers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/41-import-virtual-server.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Add Servers ⇾ Import Virtual Server",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/42-migrate-virtual-server.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Add Servers ⇾ Migrate Virtual Server",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/43-backup-virtual-servers.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Backup and Restore ⇾ Backup Virtual Servers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/43-cloud-storage-providers.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ Backup and Restore ⇾ Cloud Storage Providers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/44-virtualmin-virtual-servers.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ List Virtual Servers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/44-wp-workbench-instances.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ WP Workbench Manager ⇾ Instances",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/44-wp-workbench-plugins.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ WP Workbench Manager ⇾ Plugins",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/44-wp-workbench-themes.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ WP Workbench Manager ⇾ Themes",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/44-wp-workbench-backups.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ WP Workbench Manager ⇾ Backups",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/45-system-statistics.png?v=" + timeStamp,
                    title: "Virtualmin ⇾ System Statistics",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/100-shortkeys-" + systemType + ".png?v=" + timeStamp,
                    title: "Keyboard Shortcuts",
                },
            ];
        };

    // Prepare to initialize Chocolat
    const insertFullScreenToggle = function () {
            const fullscreenCont = document.createElement("div"),
                fullscreenIcon = document.createElement("i");
            fullscreenCont.classList.add("screen-full-container");
            fullscreenCont.setAttribute("aria-label", "Enter Full Screen (" + altKey + concatKey + "F)");
            fullscreenCont.setAttribute("title", "Enter Full Screen (" + altKey + concatKey + "F)");
            fullscreenIcon.classList.add("wm", "wm-sm", "wm-fw", "wm-expand");
            fullscreenCont.appendChild(fullscreenIcon);
            document.querySelector(".chocolat-image-wrapper").appendChild(fullscreenCont);
            document.querySelector(".screen-full-container").addEventListener(
                "click",
                function (e) {
                    e.stopPropagation();
                    document.querySelector(".chocolat-bottom .chocolat-fullscreen").click();
                },
                false
            );
            // Toggle full screen on clicking the container
            document.querySelector(".chocolat-image-wrapper").addEventListener(
                "click",
                function (e) {
                    e.stopPropagation();
                    document.querySelector(".chocolat-bottom .chocolat-fullscreen").click();
                },
                false
            );
        },
        chocolatOptions = function () {
            return {
                container: document.querySelector(".chocolat-drop"),
                loop: true,
                allowZoom: false,
                imageSize: "scale-down",
                closeOnBackgroundClick: false,
                afterImageLoad: function() {
                    this.elems.img.setAttribute("aria-label", "Screenshot Gallery");
                },
            };
        };

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    });

    // Initialize Chocolat
    let chocolat = Chocolat(getScreenshots(), chocolatOptions());
    chocolat.api.open();

    // Insert custom open in full screen toggle
    insertFullScreenToggle();

    // If changing theme, reload the page to update screenshots
    themeToggle.addEventListener(
        "click",
        function () {
            const currIndex = chocolat.api.current();
            chocolat.destroy();
            chocolat = Chocolat(getScreenshots(), chocolatOptions());
            chocolat.api.open(currIndex || 0);
            insertFullScreenToggle();
        },
        false
    );

    // On resize accommodate Chocolat viewer
    window.addEventListener("resize", function () {
        const targetClassList = document.documentElement.classList;
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        ) {
            targetClassList.add("chocolat-fullscreen");
        } else {
            targetClassList.remove("chocolat-fullscreen");
            chocolat.api.set("imageSize", "contain");
            chocolat.api.position();
        }
    });

    // On exit full screen, resize Chocolat viewer to avoid image overflow
    document.addEventListener("fullscreenchange", function () {
        window.dispatchEvent(new Event("resize"));
        // Re-try when animation is complete
        setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
        }, 120);
    });
});
