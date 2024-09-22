import hmr from "./utils/hmr";
import cache from "./cache";
import parse from "./utils/md";

import { BASE } from "../types";
import { Post } from "./utils/post";

/**
 * Create a cache function for markdown files.
 *
 * @param base - The base name for markdown caching.
 * @returns A function that caches markdown files.
 */
const cache_fn_maker = (base: BASE) => async () => {
    const posts: Post[] = await parse(base);

    await cache.search(posts, base);
    await cache.config(posts, base);
    await cache.route(posts, base);
    await cache.jsx(posts, base);
};

/**
 * Preprocess files before Vue starts.
 */
export default () => {
    hmr(BASE.NOTE, cache_fn_maker(BASE.NOTE));
};
