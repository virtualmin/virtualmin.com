// Chocolat on index page
window.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector("#theme-toggle"),
        getScreenshots = function () {
            const screenshotType =
                localStorage.getItem("pref-theme") === "dark" ||
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light";
            return [
                {
                    src: "/images/screenshots/" + screenshotType + "/1-dashboard.png",
                    title: "Virtualmin ⇾ Dashboard",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/2-virtual-server-summary.png",
                    title: "Virtualmin ⇾ Virtual Server Summary",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/3-create-virtual-server.png",
                    title: "Virtualmin ⇾ Create Virtual Server",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/4-edit-users.png",
                    title: "Virtualmin ⇾ Edit Users",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/5-create-user.png",
                    title: "Virtualmin ⇾ Create User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/6-create-ssh-user.png",
                    title: "Virtualmin ⇾ Create SSH User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/7-create-ftp-user.png",
                    title: "Virtualmin ⇾ Create FTP User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/8-create-mail-user.png",
                    title: "Virtualmin ⇾ Create Mail User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/9-create-database-user.png",
                    title: "Virtualmin ⇾ Create Database User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/10-create-webserver-user.png",
                    title: "Virtualmin ⇾ Create Webserver User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/11-edit-user-defaults.png",
                    title: "Virtualmin ⇾ Edit User Defaults",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/12-email-all-mailboxes.png",
                    title: "Virtualmin ⇾ Email All Mailboxes",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/13-email-client-settings.png",
                    title: "Virtualmin ⇾ Email Client Settings",
                },

            ];
        };

    // Prepare to initialize Chocolat
    const insertFullScreenToggle = function () {
            const fullscreenCont = document.createElement("div"),
                fullscreenIcon = document.createElement("i");
            fullscreenCont.classList.add("screen-full-container");
            fullscreenCont.setAttribute("aria-label", "Enter Full Screen");
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
        },
        chocolatOptions = function () {
            return {
                container: document.querySelector(".chocolat-drop"),
                loop: false,
                allowZoom: false,
                imageSize: "scale-down",
                closeOnBackgroundClick: false,
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
