import fs from "fs-extra";
import Fuse from "fuse.js";

import type { IFuseOptions } from "fuse.js";
import type { BASE, ParsedMarkdown, SearchTarget } from "../../types";

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
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 */
export default async (parsed: ParsedMarkdown[], base: BASE) => {
    const md_ext: RegExp = /(\/index)?\.md$/g;
    const dist: string = `./cache/${base}/search.ts`;

    const link_of = (post: ParsedMarkdown): string =>
        "/" + post.pathname.replace(md_ext, "");

    const is_index = (post: ParsedMarkdown): boolean =>
        post.pathname.endsWith("/index.md");

    const searchTarget: SearchTarget[] = parsed
        .filter((post): boolean => post.pathname !== `${base}/404.md`)
        .map(
            (post): SearchTarget => ({
                title: post.attr.title,
                content: post.text,
                link: link_of(post),
                is_index: is_index(post),
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
