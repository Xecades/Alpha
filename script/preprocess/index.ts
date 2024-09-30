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
const cache_base = (base: BASE) => {
    const posts: Post[] = parse(base);

    cache.search(posts, base);
    cache.config(posts, base);
    cache.route(posts, base);
    cache.jsx(posts, base);
};

cache_base(BASE.NOTE);
