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
                    title: "Webmin ⇾ System ⇾ Dashboard",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/2-stats-history.png",
                    title: "Webmin ⇾ System ⇾ Dashboard ⇾ Stats History",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/3-webmin-configuration.png",
                    title: "Webmin ⇾ Webmin ⇾ Webmin Configuration",
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
                loop: true,
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
        // Check if the document is in fullscreen mode
        if (
            !document.fullscreenElement &&
            !document.webkitFullscreenElement &&
            !document.mozFullScreenElement &&
            !document.msFullscreenElement
        ) {
            window.dispatchEvent(new Event("resize"));
        }
    });
});
