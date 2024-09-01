import fs from "fs-extra";
import { to_SFC_path } from "./sfc";

import type { BASE, ParsedMarkdown, RouteMeta } from "../types";

/**
 * Generate `./cache/${base}/routes.js` from parsed markdown data.
 *
 * @note This module generates children routes for Vue SFCs.
 *
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 *
 * @todo 或许把其他的 cache 整合到一起，作为参数传入？
 */
export default async (parsed: ParsedMarkdown[], base: BASE) => {
    const dist: string = `./cache/${base}/routes.js`;
    let cache: string = "export default [\n";

    for (const item of parsed) {
        const SFC_path: string = "@" + to_SFC_path(item.pathname, base);
        const route_path: string = item.pathname
            .replace(/^.+?\//, "")
            .replace(/(\/index)?\.md$/, "");

        const category: string =
            route_path === "index" ? "" : route_path.split("/")[0];

        const meta: RouteMeta = {
            pathname: item.pathname,
            category: category,
        };

        const meta_str: string = JSON.stringify(meta);
        cache += `{ path: "${route_path}", component: () => import("${SFC_path}"), meta: ${meta_str} },\n`;
    }

    cache += "];";
    await fs.outputFile(dist, cache);
};
