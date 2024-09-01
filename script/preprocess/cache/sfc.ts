/**
 * @file sfc.ts
 * @description Parse markdown files and cache them as SFCs.
 */

import fs from "fs-extra";
import path from "path";

import type { BASE, ParsedMarkdown } from "../types";

/**
 * Convert local markdown file path to SFC path.
 *
 * @param pathname - Path to local markdown file
 * @param dist - The directory where the SFC are stored
 * @returns - The path to SFC
 */
export const to_SFC_path = (pathname: string, base: BASE): string => {
    console.assert(
        pathname.endsWith(".md"),
        `Invalid markdown file: ${pathname}`
    );

    const dist = `./cache/${base}/posts`;

    let res = pathname.replace(/^.+?\//, "");
    res = res.replace(/\.md$/, ".vue");
    res = path.join(dist, res);

    return res;
};

/**
 * Cache parsed HTML and save them as SFCs in `./cache/${base}/posts/*`.
 *
 * @note This module caches Vue SFCs.
 *
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 */
export default async (parsed: ParsedMarkdown[], base: BASE) => {
    for (const item of parsed) {
        let cache: string = `<template>${item.html}</template>`;
        let dist: string = to_SFC_path(item.pathname, base);

        await fs.outputFile(dist, cache);
    }
};
