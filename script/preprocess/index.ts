import hmr from "./utils/hmr";
import cache from "./cache";
import parse from "./utils/md";

import { BASE, type ParsedMarkdown } from "../types";

/**
 * Create a cache function for markdown files.
 *
 * @param base - The base name for markdown caching.
 * @returns A function that caches markdown files.
 */
const cache_fn_maker = (base: BASE) => async () => {
    const parsed: ParsedMarkdown[] = await parse(base);

    await cache.search(parsed, base);
    await cache.config(parsed, base);
    await cache.route(parsed, base);
    await cache.jsx(parsed, base);
};

/**
 * Preprocess files before Vue starts.
 */
export default () => {
    hmr(BASE.NOTE, cache_fn_maker(BASE.NOTE));
};
