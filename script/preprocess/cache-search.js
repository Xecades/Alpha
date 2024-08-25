import fs from "fs-extra";
import Fuse from "fuse.js";

const options = { keys: ["title", "content"] };

export default async (data, dist) => {
    let db = [];
    for (let post of data) {
        console.log(post);
        db.push({
            title: post.attr.title,
            content: post.text,
        });
    }

    const index = Fuse.createIndex(options.keys, db);
    await fs.outputJSON(dist, index);
};
