import logger from "@/assets/js/logger";

const beforeEach = (to, from, next) => {
    logger.star(`Navigating: ${from.fullPath} -> ${to.fullPath}`);

    // Fade out when navigating
    if (!from.name) {
        
        next();
    } else {
        document.querySelector("#main").classList.add("fade-out");
        setTimeout(() => {
            logger.nbsp("Fade out completed");
            next();
        }, 100);
    }
};

function setupGuards(router) {
    router.beforeEach(beforeEach);
}

export default setupGuards;
