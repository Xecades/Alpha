/**
 * Traverse a directory asynchronously.
 * @see https://www.npmjs.com/package/@root/walk
 */
import { walk } from "@root/walk";

export default async (src, filter) => {
    let ret = [];

    await walk(src, async (err, pathname, dirent) => {
        if (err) throw err;
        if (filter(pathname)) ret.push({ pathname, dirent });
    });

    return ret;
};
