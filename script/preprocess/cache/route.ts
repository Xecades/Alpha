import fs from "fs-extra";
import { to_JSX_path } from "./jsx";

import type { BASE, ParsedMarkdown } from "../types";

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

    let cache: string = 'import note from "@/layout/note.vue";\n';
    cache += "export default [\n";

    for (const item of parsed) {
        const JSX_path: string = "@" + to_JSX_path(item.pathname, base);
        const route_path: string =
            "/" + item.pathname.replace(/(\/?index)?\.md$/, "");

        const category: string =
            route_path === "index" ? "" : route_path.split("/")[0];

        cache += "{";
        cache += `path: "${route_path}",`;
        cache += `component: note,`;
        cache += `meta: {`;
        cache += `pathname: "${item.pathname}",`;
        cache += `category: "${category}",`;
        cache += `body: () => import("${JSX_path}"),`;
        cache += `},`;
        cache += "},\n";
    }

    cache += "];";
    await fs.outputFile(dist, cache);
};
