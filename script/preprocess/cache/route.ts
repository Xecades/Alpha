import fs from "fs-extra";
import { to_JSX_path } from "./jsx";

import type { BASE, ParsedMarkdown, RouteMeta } from "../types";

/**
 * Generate `./cache/${base}/routes.js` from parsed markdown data.
 *
 * @note This module generates children routes for Vue SFCs.
 *
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 */
export default async (parsed: ParsedMarkdown[], base: BASE) => {
    const dist: string = `./cache/${base}/routes.js`;

    let cache: string = `import ${base} from "@/layout/${base}.vue";\n`;
    cache += "export default [\n";

    for (const item of parsed) {
        const JSX_path: string = "@" + to_JSX_path(item.pathname, base);
        const route_path: string =
            "/" + item.pathname.replace(/(\/?index)?\.md$/, "");

        const category: string =
            route_path === "index" ? "" : route_path.split("/")[0];

        const import_slot: string = "<IMP_SLOT>";
        const component_slot: string = "<COM_SLOT>";

        const route = {
            path: route_path,
            component: component_slot,
            meta: {
                pathname: item.pathname,
                category: category,
                body: import_slot as any,
                attr: item.attr,
                toc: item.toc,
                birthtime: item.stats.birthtime,
                mtime: item.stats.mtime,
            } as RouteMeta,
        };

        cache += JSON.stringify(route)
            .replace(`"${import_slot}"`, `() => import("${JSX_path}")`)
            .replace(`"${component_slot}"`, base);
        cache += ",\n";
    }

    cache += "];";
    await fs.outputFile(dist, cache);
};
