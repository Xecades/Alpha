// @ts-ignore
import Walk from "@root/walk";

import type { PathnameFilter } from "../../types";
import type { Dirent } from "fs";

/**
 * Traverse a directory asynchronously.
 *
 * @param src - Source directory
 * @param filter - Pathname filter
 * @returns Traverse results
 *
 * @see https://www.npmjs.com/package/@root/walk
 */
export default async (
    src: string,
    filter: PathnameFilter
): Promise<string[]> => {
    const res: string[] = [];
    const walk = Walk.create();

    await walk(src, async (err: unknown, pathname: string, dirent: Dirent) => {
        if (err) {
            throw err;
        }

        if (filter(pathname)) {
            res.push(pathname);
        }
    });

    return res;
};
