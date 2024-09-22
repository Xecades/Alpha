import { Post } from "../post";
import traverse from "../traverse";

import type { BASE, PathnameFilter } from "../../../types";

/**
 * Read and parse markdown files.
 *
 * @param base - Source directory
 * @returns Parsed post objects
 */
export default async (base: BASE): Promise<Post[]> => {
    const filter: PathnameFilter = (x: string) => x.endsWith(".md");
    const files: string[] = await traverse(base, filter);

    return files.map((pathname) => new Post(pathname, base));
};
