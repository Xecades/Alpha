import fs from "fs-extra";
import injection from "../utils/injection";
import { Post } from "../utils/post";

import type { BASE, RouteMeta } from "../../types";

/**
 * Generate `./cache/${base}/routes.tsx` from parsed markdown data.
 *
 * @note This module generates children routes for Vue SFCs.
 *
 * @param posts - Parsed post objects.
 * @param base - The base name for markdown caching.
 */
export default async (posts: Post[], base: BASE) => {
    const dist: string = `./cache/${base}/routes.tsx`;

    let cache: string = injection();
    cache += `import ${base} from "@/layout/${base}.vue";\n`;
    cache += `import type { CachedRouteRecord } from "@script/types";\n`;
    cache += "const routes: CachedRouteRecord[] = [\n";

    let error_cache: string = "";

    for (const post of posts) {
        const timeData = await post.time_data;

        const import_slot: string = "<IMP_SLOT>";
        const component_slot: string = "<COM_SLOT>";
        const toc_slot: string = "<TOC_SLOT>";
        const toc_title_slot: string = "<TOC_TITLE_SLOT>";

        const toc: string =
            "[" +
            post.toc
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
            path: post.type === "404" ? `/${base}/:pathMatch(.*)` : post.link,
            component: component_slot,
            meta: {
                pathname: post.pathname,
                category: post.category,
                body: import_slot as any,
                attr: post.front_matter,
                toc: toc_slot as any,
                created: timeData.created,
                updated: timeData.updated,
                type: post.type,
            } as RouteMeta,
        };

        const stringified: string =
            JSON.stringify(route)
                .replace(
                    `"${import_slot}"`,
                    `() => import("${post.tsx_import_path}")`
                )
                .replace(`"${component_slot}"`, base)
                .replace(`"${toc_slot}"`, toc) + ",\n";

        if (post.type === "404") error_cache = stringified;
        else cache += stringified;
    }

    cache += error_cache;
    cache += "];\n";
    cache += "export default routes;\n";

    await fs.outputFile(dist, cache);
};
