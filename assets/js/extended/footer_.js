/* jshint esversion: 6 */
// Add event listener for Alt+T to toggle palette
document.addEventListener("keydown", function (e) {
    // Check first if no input or textarea is focused
    if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.contentEditable === "true" ||
        e.ctrlKey || e.metaKey
    ) {
        return;
    }
    // Alt+A to go to My Account page (if available)
    if (e.altKey && e.code === "KeyA") {
        e.preventDefault();
        this.location.href = "/account/";
    }
    // Alt+C to go to Cart page (if available)
    if (e.altKey && e.code === "KeyC") {
        e.preventDefault();
        this.location.href = "/cart/";
    }
    // Admin shortcut keys
    const menu = document.getElementById("menu");
    if (menu && menu.dataset.admin === "1") {
        // Alt+Y to go to Admin Dashboard page (if available)
        if (e.altKey && e.code === "KeyY") {
            e.preventDefault();
            this.location.href = "/wp-admin/";
        }
        // Alt+U to go to Admin Dashboard / Plugins updates page (if available)
        if (e.altKey && e.code === "KeyU") {
            e.preventDefault();
            this.location.href = "/wp-admin/update-core.php";
        }
        // Alt+O to go to Admin Dashboard / Orders page (if available)
        if (e.altKey && e.code === "KeyO") {
            e.preventDefault();
            this.location.href = "/wp-admin/edit.php?post_type=shop_order";
        }
        // Alt+P to go to Admin Dashboard / Subscriptions page (if available)
        if (e.altKey && e.code === "KeyP") {
            e.preventDefault();
            this.location.href = "/wp-admin/edit.php?post_type=shop_subscription";
        }
        // Alt+I to go to Admin Dashboard / Analytics / Revenue page (if available)
        if (e.altKey && e.code === "KeyI") {
            e.preventDefault();
            this.location.href = "/wp-admin/admin.php?page=wc-admin&path=/analytics/revenue";
        }
    }
});
