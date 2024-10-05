import logger from "@/assets/ts/logger";
import ScrollReveal from "scrollreveal";
import { reveal_config } from "@/assets/ts/reveal";
import { nextTick } from "vue";

import type { RouteMeta } from "@script/types";
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

enum ROUTE_TYPE {
    ROOT = "root",
    HOME = "home",
    NOTE = "note",
    BLOG = "blog",
}

const target: string =
    ".note-layout #content > header h1, .note-layout #content > .metadata, .note-layout #left";

const type_of = (x: RouteLocation): ROUTE_TYPE => {
    if (x.path === "/" && x.name === undefined) return ROUTE_TYPE.ROOT;
    if (x.name) return ROUTE_TYPE.HOME;

    const path = x.path;
    if (path.startsWith("/note")) return ROUTE_TYPE.NOTE;
    else if (path.startsWith("/blog")) return ROUTE_TYPE.BLOG;

    throw new Error("Invalid route type");
};

const setupTitle = (to: RouteLocation, type: ROUTE_TYPE) => {
    /**
     * -> Home: Xecades  /  Xecades | ${page title}
     * -> Note: Xecades Notes  /  ${article title} | Xecades Notes
     * -> Blog: throw not implemented error
     */

    const prefix = "Xecades";

    if (type === ROUTE_TYPE.HOME) {
        // Xecades  /  Xecades | title
        const title: string = to.meta.title as string;

        if (title === "") {
            document.title = prefix;
        } else {
            document.title = `${prefix} | ${title}`;
        }
        //
    } else if (type === ROUTE_TYPE.NOTE) {
        // Xecades Notes  /  title | Xecades Notes
        const meta: RouteMeta = to.meta as any;
        const title: string = meta.attr.title;
        const is_root: boolean = meta.category === "";

        if (is_root) {
            document.title = `${prefix} Notes`;
        } else {
            document.title = `${title} | ${prefix} Notes`;
        }
        //
    } else if (type === ROUTE_TYPE.BLOG) {
        //
        throw new Error("Not implemented");
        //
    }
};

const beforeEach: NavigationGuard = async (to, from) => {
    const t_from: ROUTE_TYPE = type_of(from);
    const t_to: ROUTE_TYPE = type_of(to);

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

    if (t_from === ROUTE_TYPE.ROOT) {
        // Navigating from nowhere
        return true;
        //
    } else if (t_from === ROUTE_TYPE.NOTE && t_to === ROUTE_TYPE.NOTE) {
        // ScrollReveal
        const content = document.querySelector("#content") as Element;
        content.classList.add("fade");
        await sleep(100);
        //
    } else if (t_from === ROUTE_TYPE.BLOG && t_to === ROUTE_TYPE.BLOG) {
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
    const t_to: ROUTE_TYPE = type_of(to);
    const t_from: ROUTE_TYPE = type_of(from);

    console.assert(
        t_to !== ROUTE_TYPE.ROOT,
        "Navigating to root is impossible"
    );

    setupTitle(to, t_to);

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

    if (t_to === ROUTE_TYPE.NOTE) {
        // ScrollReveal
        await nextTick();

        const content = document.querySelector("#content") as Element;
        content.classList.remove("fade");

        ScrollReveal().reveal(target, reveal_config);
        //
    } else if (t_to === ROUTE_TYPE.BLOG) {
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
