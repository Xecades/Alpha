import fs from "fs-extra";
import Fuse from "fuse.js";
import { Post } from "../utils/post";

import type { IFuseOptions } from "fuse.js";
import type { BASE, SearchTarget } from "../../types";

/** @see https://www.fusejs.io/api/options.html */
const options: IFuseOptions<SearchTarget> = {
    keys: ["title", "content"],
    includeMatches: true,
    ignoreLocation: true,
    threshold: 0.4,
};

/**
 * Cache search database to `./cache/${base}/search.ts`, which yields a `fuse.js` object.
 *
 * @note This module caches the purged html (.text).
 *
 * @param posts - Parsed post objects.
 * @param base - The base name for markdown caching.
 */
export default async (posts: Post[], base: BASE) => {
    const dist: string = `./cache/${base}/search.ts`;

    const searchTarget: SearchTarget[] = posts
        .filter((post): boolean => post.type !== "404")
        .map(
            (post): SearchTarget => ({
                title: post.front_matter.title,
                content: post.text,
                link: post.link,
                is_index: post.type === "index",
            })
        );

    const index = Fuse.createIndex<SearchTarget>(options.keys!, searchTarget);

    let cache: string = "";
    cache += 'import Fuse from "fuse.js";\n';
    cache +=
        'import type { CachedSearchFn, SearchTarget } from "@script/types";\n';
    cache += 'import type { FuseIndex, IFuseOptions } from "fuse.js";\n';
    cache += "const idx = " + JSON.stringify(index.toJSON()) + ";\n";
    cache +=
        "const db: SearchTarget[] = " + JSON.stringify(searchTarget) + ";\n";
    cache +=
        "const config: IFuseOptions<SearchTarget> = " +
        JSON.stringify(options) +
        ";\n";
    cache +=
        "const index: FuseIndex<SearchTarget> = Fuse.parseIndex<SearchTarget>(idx);\n";
    cache += "const fuse: Fuse<SearchTarget> = new Fuse(db, config, index);\n";
    cache +=
        "const search: CachedSearchFn = (t: string) => (t ? fuse.search(t) : db);\n";
    cache += "export default search;\n";

    await fs.outputFile(dist, cache);
};
