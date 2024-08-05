const beforeEach = (to, from, next) => {
    console.debug(`[*] Navigating: ${from.fullPath} -> ${to.fullPath}`);

    // Fade out when navigating
    if (!from.name) {
        
        next();
    } else {
        document.querySelector("#main").classList.add("fade-out");
        setTimeout(() => {
            console.debug("     Fade out completed");
            next();
        }, 100);
    }
};

function setupGuards(router) {
    router.beforeEach(beforeEach);
}

export default setupGuards;
