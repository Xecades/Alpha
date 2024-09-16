import fs from "fs-extra";
import path from "path";
import injection from "../utils/injection";

import type { BASE, ParsedMarkdown } from "../../types";

/**
 * Convert local markdown file path to JSX path.
 *
 * @param pathname - Path to local markdown file
 * @param dist - The directory where the JSX are stored
 * @returns - The path to JSX
 */
export const to_JSX_path = (pathname: string, base: BASE): string => {
    console.assert(
        pathname.endsWith(".md"),
        `Invalid markdown file: ${pathname}`
    );

    const dist = `./cache/${base}/posts`;

    let res = pathname.replace(/^.+?\//, "");
    res = res.replace(/\.md$/, ".jsx");
    res = path.join(dist, res);

    return res;
};

/**
 * Cache parsed HTML and save them as JSXs in `./cache/${base}/posts/*`.
 *
 * @note This module caches Vue components as JSX.
 *
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 */
export default async (parsed: ParsedMarkdown[], base: BASE) => {
    for (const item of parsed) {
        const dist: string = to_JSX_path(item.pathname, base);
        let cache: string = injection();

        // Remove comments from the JSX content.
        const html: string = item.html.replace(/<!--.*?-->/g, "");

        cache += `export default <>${html}</>`;

        await fs.outputFile(dist, cache);
    }
};
