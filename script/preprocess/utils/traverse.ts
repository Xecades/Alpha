// @ts-ignore
import { walk } from "@root/walk";

import type { PathnameFilter, TraverseResult } from "../types";
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
): Promise<TraverseResult[]> => {
    const res: TraverseResult[] = [];

    await walk(src, async (err: unknown, pathname: string, dirent: Dirent) => {
        if (err) throw err;
        if (filter(pathname)) res.push({ pathname, dirent });
    });

    return res;
};
