import fs from "fs-extra";

export default async (data, dist) => {
    await fs.ensureFile(dist);

    let ret = {};
    for (const item of data) {
        ret[item.pathname] = {
            attr: item.attr,
            toc: item.toc,
        };
    }

    let cache = `export default ${JSON.stringify(ret)}\n`;
    await fs.outputFile(dist, cache);
};
