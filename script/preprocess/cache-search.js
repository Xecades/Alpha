import fs from "fs-extra";
import Fuse from "fuse.js";

// https://www.fusejs.io/api/options.html
const options = {
    keys: ["title", "content"],
    includeMatches: true,
    ignoreLocation: true,
    threshold: 0.4,
};

export default async (data, dist) => {
    const md_ext = /(\/index)?\.md$/g;
    const link_of = (post) => "/" + post.pathname.replace(md_ext, "");
    const is_index = (post) => post.pathname.endsWith("/index.md");

    let db = data.map((post) => ({
        title: post.attr.title,
        content: post.text,
        link: link_of(post),
        is_index: is_index(post),
    }));

    let index = Fuse.createIndex(options.keys, db);

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
