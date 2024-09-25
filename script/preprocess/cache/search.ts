import fs from "fs-extra";
import Fuse from "fuse.js";
import { watchEffect } from "vue";
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
export default (posts: Post[], base: BASE) => {
    const dist: string = `./cache/${base}/search.ts`;

    watchEffect(() => {
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

        const index = Fuse.createIndex<SearchTarget>(
            options.keys!,
            searchTarget
        );

        const idx_inj: string = JSON.stringify(index.toJSON());
        const db_inj: string = JSON.stringify(searchTarget);
        const config_inj: string = JSON.stringify(options);

        const cache: string =
            'import Fuse from "fuse.js";\n' +
            'import type { CachedSearchFn, SearchTarget } from "@script/types";\n' +
            'import type { FuseIndex, IFuseOptions } from "fuse.js";\n' +
            `const idx = ${idx_inj};\n` +
            `const db: SearchTarget[] = ${db_inj};\n` +
            `const config: IFuseOptions<SearchTarget> = ${config_inj};\n` +
            "const index: FuseIndex<SearchTarget> = Fuse.parseIndex<SearchTarget>(idx);\n" +
            "const fuse: Fuse<SearchTarget> = new Fuse(db, config, index);\n" +
            "const search: CachedSearchFn = (t: string) => (t ? fuse.search(t) : db);\n" +
            "export default search;\n";

        fs.outputFileSync(dist, cache);
        console.log(`[Updated] ${dist}`);
    });
};
