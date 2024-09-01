import fs from "fs-extra";

import type { BASE, CacheMeta, ParsedMarkdown } from "../types";

/**
 * Cache markdown metadata to `./cache/${base}/meta.json` for quick access.
 *
 * @note This module caches the front-matter attributes (.attr) and table of contents (.toc).
 *
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 */
export default async (parsed: ParsedMarkdown[], base: BASE) => {
    const cache: CacheMeta = {};
    const dist: string = `./cache/${base}/meta.json`;

    for (const item of parsed) {
        cache[item.pathname] = {
            attr: item.attr,
            toc: item.toc,
        };
    }

    await fs.outputJSON(dist, cache);
};
