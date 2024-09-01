import logger from "@/assets/js/logger";
import ScrollReveal from "scrollreveal";
import { nextTick } from "vue";

import type {
    NavigationGuard,
    NavigationHookAfter,
    RouteLocationNormalizedGeneric,
    RouteLocationNormalizedLoadedGeneric,
    Router,
} from "vue-router";

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

type RouteLocation =
    | RouteLocationNormalizedGeneric
    | RouteLocationNormalizedLoadedGeneric;

enum RouteType {
    root = "root",
    home = "home",
    note = "note",
    blog = "blog",
}

const target = "header h1, #breadcrumb, .markdown > *";

const type_of = (x: RouteLocation): RouteType => {
    if (x.path === "/" && x.name === undefined) return RouteType.root;
    if (x.name) return RouteType.home;

    const path = x.path;
    if (path.startsWith("/note")) return RouteType.note;
    else if (path.startsWith("/blog")) return RouteType.blog;

    throw new Error("Invalid route type");
};

const beforeEach: NavigationGuard = async (to, from) => {
    const t_from: RouteType = type_of(from);
    const t_to: RouteType = type_of(to);

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

    if (t_from === RouteType.root) {
        // Navigating from nowhere
        return true;
        //
    } else if (t_from === RouteType.note && t_to === RouteType.note) {
        // ScrollReveal
        const content = document.querySelector("#content") as Element;
        content.classList.add("hide");
        await sleep(100);
        //
    } else if (t_from === RouteType.blog && t_to === RouteType.blog) {
        // ScrollReveal
        throw new Error("Not implemented");
        //
    } else {
        // Fade out
        const main = document.querySelector("#main") as Element;
        main.classList.add("fade-out");
        await sleep(100);
    }

    ScrollReveal().clean(target);
};

const afterEach: NavigationHookAfter = async (to, from) => {
    const t_to: RouteType = type_of(to);
    const t_from: RouteType = type_of(from);

    console.assert(t_to !== RouteType.root, "Navigating to root is impossible");

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

    if (t_to === RouteType.note) {
        // ScrollReveal
        await nextTick();

        const content = document.querySelector("#content") as Element;
        content.classList.remove("hide");

        ScrollReveal().reveal(target, {
            interval: 20,
            duration: 400,
            origin: "top",
            distance: "4px",
            scale: 0.99,
        });
        console.log(document.querySelectorAll(target));
        //
    } else if (t_to === RouteType.blog) {
        // ScrollReveal
        throw new Error("Not implemented");
        //
    }
};

function setupGuards(router: Router) {
    router.beforeEach(beforeEach);
    router.afterEach(afterEach);
}

export default setupGuards;
