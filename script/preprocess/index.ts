import cache from "./cache";
import parse from "./utils/md";

import { BASE } from "../types";
import { Post } from "./utils/post";

/**
 * Cache function for markdown files.
 *
 * @param base - The base name for markdown caching.
 * @returns A function that caches markdown files.
 */
const cache_base = async (base: BASE) => {
    const posts: Post[] = await parse(base);

    cache.search(posts, base);
    cache.config(posts, base);
    cache.route(posts, base);
    cache.jsx(posts, base);
};

/**
 * Run script when
 *
 *  - in development mode.  ->  npm run dev
 *  - running script directly.  ->  npm run cache
 *    (In this case, process.env.NODE_ENV === undefined.)
 */
if (process.env.NODE_ENV !== "production") {
    cache_base(BASE.NOTE);
}
