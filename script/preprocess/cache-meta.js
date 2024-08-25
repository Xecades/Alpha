import fs from "fs-extra";

export default async (data, dist) => {
    let cache = {};
    for (const item of data) {
        cache[item.pathname] = {
            attr: item.attr,
            toc: item.toc,
        };
    }

    await fs.outputJSON(dist, cache);
};
