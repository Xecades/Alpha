import logger from "@/assets/js/logger";
import ScrollReveal from "scrollreveal";
import { nextTick } from "vue";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const type_of = (x) => {
    if (x.path === "/") return "index";
    if (x.name) return "home";

    const path = x.path;
    if (path.startsWith("/note")) return "note";
    else if (path.startsWith("/blog")) return "blog";

    throw new Error("Invalid route type");
};

const beforeEach = async (to, from) => {
    const t_from = type_of(from);
    const t_to = type_of(to);

    logger.star(`${from.fullPath} (${t_from}) -> ${to.fullPath} (${t_to})`);

    /**
     * Home -> Home: fade out
     * Home -> Note: fade out
     * Home -> Blog: fade out
     *
     * Note -> Home: fade out
     * Note -> Note: ScrollReveal
     * Note -> Blog: fade out
     *
     * Blog -> Home: fade out
     * Blog -> Note: fade out
     * Blog -> Blog: ScrollReveal
     */

    if (t_from === "index") {
        return true;
    } else if (t_from === "note" && t_to === "note") {
        // ScrollReveal
        const content = document.querySelector("#content");
        content.classList.add("hide");
        await sleep(100);
        //
    } else if (t_from === "blog" && t_to === "blog") {
        // ScrollReveal
        throw new Error("Not implemented");
        //
    } else {
        // Fade out
        document.querySelector("#main").classList.add("fade-out");
        await sleep(100);
    }
};

const afterEach = async (to, from) => {
    const t_to = type_of(to);
    const t_from = type_of(from);

    /**
     * Home -> Home: None
     * Home -> Note: ScrollReveal
     * Home -> Blog: ScrollReveal
     *
     * Note -> Home: None
     * Note -> Note: ScrollReveal
     * Note -> Blog: ScrollReveal
     *
     * Blog -> Home: None
     * Blog -> Note: ScrollReveal
     * Blog -> Blog: ScrollReveal
     */

    if (t_to === "note") {
        // ScrollReveal
        await nextTick();

        const content = document.querySelector("#content");
        content.classList.remove("hide");

        const target = "header h1, #breadcrumb, .markdown > *";

        ScrollReveal().reveal(target, {
            interval: 20,
            duration: 400,
            origin: "top",
            distance: "4px",
            scale: 0.99,
        });
        //
    } else if (t_to === "blog") {
        // ScrollReveal
        throw new Error("Not implemented");
        //
    }
};

function setupGuards(router) {
    router.beforeEach(beforeEach);
    router.afterEach(afterEach);
}

export default setupGuards;
