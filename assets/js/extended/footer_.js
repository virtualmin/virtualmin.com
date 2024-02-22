/* jshint esversion: 6 */

// On resize event
window.addEventListener("resize", function () {
    // Set the height of the footer
    const blockSeparatorSelStr = ".index-page-intro-separator-block",
        leftOffset = document.querySelector(".post-content").getBoundingClientRect().left,
        documentWidth = document.documentElement.getBoundingClientRect().width,
        blockSeparators = document.querySelectorAll(blockSeparatorSelStr);

    blockSeparators.forEach((blockSeparator) => {
        blockSeparator.style.width = documentWidth + "px";
        blockSeparator.style.marginLeft = -leftOffset + "px";
    });
});

// Trigger resize on load
window.dispatchEvent(new Event("resize"));
