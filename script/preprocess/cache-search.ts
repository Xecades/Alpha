import fs from "fs-extra";
import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import type { ParsedData } from "./parse-md";

// https://www.fusejs.io/api/options.html
const options: IFuseOptions<string> = {
    keys: ["title", "content"],
    includeMatches: true,
    ignoreLocation: true,
    threshold: 0.4,
};

export default async (data: ParsedData[], dist: string) => {
    const md_ext = /(\/index)?\.md$/g;

    const link_of = (p: ParsedData) => "/" + p.pathname.replace(md_ext, "");
    const is_index = (p: ParsedData) => p.pathname.endsWith("/index.md");

    let db = data.map((post) => ({
        title: post.attr.title,
        content: post.text,
        link: link_of(post),
        is_index: is_index(post),
    }));

    let index = Fuse.createIndex((options as any).keys, db);

    let cache = 'import Fuse from "fuse.js";\n';
    cache += "const idx = " + JSON.stringify(index.toJSON()) + ";\n";
    cache += "const db = " + JSON.stringify(db) + ";\n";
    cache += "const config = " + JSON.stringify(options) + ";\n";
    cache += "const index = Fuse.parseIndex(idx);\n";
    cache += "const fuse = new Fuse(db, config, index);\n";
    cache += "export default t => t";
    cache += " ? fuse.search(t) ";
    cache += ": db.map(p => ({ ...p, highlight: false }));\n";

    await fs.outputFile(dist, cache);
};
