// @ts-ignore
import Walk from "@root/walk";

import type { PathnameFilter, TraverseResult } from "../types";
import type { Stats } from "fs";

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
): Promise<TraverseResult[]> => {
    const res: TraverseResult[] = [];
    const walk = Walk.create({ withFileStats: true });

    await walk(src, async (err: unknown, pathname: string, stats: Stats) => {
        if (err) {
            throw err;
        }

        if (filter(pathname)) {
            res.push({ pathname, stats });
        }
    });

    return res;
};
