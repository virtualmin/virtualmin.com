/* jshint esversion: 6 */

// On resize event
window.addEventListener("resize", function () {
    // Set the height of the footer
    const blockSeparatorSelStr = ".index-page-intro-separator-block",
        leftOffset = document.querySelector(".post-content").getBoundingClientRect().left,
        documentWidth = document.documentElement.getBoundingClientRect().width;
    document.querySelector(blockSeparatorSelStr).style.width = documentWidth + "px";
    document.querySelector(blockSeparatorSelStr).style.marginLeft = -leftOffset + "px";
});

// Trigger resize on load
window.dispatchEvent(new Event("resize"));
