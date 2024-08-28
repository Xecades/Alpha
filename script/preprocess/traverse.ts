/**
 * Traverse a directory asynchronously.
 * @see https://www.npmjs.com/package/@root/walk
 */
// @ts-ignore
import { walk } from "@root/walk";
import { Dirent } from "fs";

interface PathnameFilter {
    (pathname: string): boolean;
}

export interface PathnameDirent {
    pathname: string;
    dirent: Dirent;
}

export default async (src: string, filter: PathnameFilter) => {
    let ret: PathnameDirent[] = [];

    await walk(src, async (err: unknown, pathname: string, dirent: Dirent) => {
        if (err) throw err;
        if (filter(pathname)) ret.push({ pathname, dirent });
    });

    return ret;
};
