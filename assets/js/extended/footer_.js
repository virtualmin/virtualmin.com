/* jshint esversion: 6 */
(function () {
    const
        headerTargSel = "body > .header",
        menuLinkTargSel = "" + headerTargSel + " > .nav #menu > li > a",
        hmenuSignInLink = document.querySelector("" + menuLinkTargSel + '[href$="/signin/"]'),
        hmenuSignInLinkText = hmenuSignInLink.querySelector("span");

    hmenuSignInLinkText.classList.add("wm", "wm-md", "wm-user-circle");
    hmenuSignInLinkText.insertAdjacentHTML('afterend', '<span class="font-default">Sign in</span>');
    hmenuSignInLink.innerHTML = `<span class="btn btn-danger">${hmenuSignInLink.innerHTML}</span>`;
})();
