import fs from "fs-extra";
import injection from "../utils/injection";
import { to_JSX_path } from "./jsx";

import type { BASE, ParsedMarkdown, RouteMeta } from "../../types";

/**
 * Generate `./cache/${base}/routes.jsx` from parsed markdown data.
 *
 * @note This module generates children routes for Vue SFCs.
 *
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 */
export default async (parsed: ParsedMarkdown[], base: BASE) => {
    const dist: string = `./cache/${base}/routes.jsx`;

    let cache: string = injection();
    cache += `import ${base} from "@/layout/${base}.vue";\n`;
    cache += "export default [\n";

    let error_cache: string = "";

    for (const item of parsed) {
        const JSX_path: string = "@" + to_JSX_path(item.pathname, base);
        const route_path: string =
            "/" + item.pathname.replace(/(\/?index)?\.md$/, "");

        const is_index: boolean = item.pathname.endsWith("index.md");
        const is_404: boolean = item.pathname === `${base}/404.md`;

        const category: string =
            route_path === `/${base}` || is_404 ? "" : route_path.split("/")[2];

        const import_slot: string = "<IMP_SLOT>";
        const component_slot: string = "<COM_SLOT>";
        const toc_slot: string = "<TOC_SLOT>";
        const toc_title_slot: string = "<TOC_TITLE_SLOT>";

        const toc: string =
            "[" +
            item.toc
                .map((x) => {
                    let title: string = x.title;
                    x.title = toc_title_slot;

                    return JSON.stringify(x).replace(
                        `"${toc_title_slot}"`,
                        `<>${title}</>`
                    );
                })
                .join(",") +
            "]";

        const route = {
            path: is_404 ? `/${base}/:pathMatch(.*)` : route_path,
            component: component_slot,
            meta: {
                pathname: item.pathname,
                category: category,
                body: import_slot as any,
                attr: item.attr,
                toc: toc_slot as any,
                birthtime: item.stats.birthtime,
                mtime: item.stats.mtime,
                type: is_index ? "index" : "post",
            } as RouteMeta,
        };

        const stringified: string =
            JSON.stringify(route)
                .replace(`"${import_slot}"`, `() => import("${JSX_path}")`)
                .replace(`"${component_slot}"`, base)
                .replace(`"${toc_slot}"`, toc) + ",\n";

        if (is_404) error_cache = stringified;
        else cache += stringified;
    }

    cache += error_cache;
    cache += "];";

    await fs.outputFile(dist, cache);
};
