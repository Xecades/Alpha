import { Post } from "../post";
import traverse from "../traverse";

import type { BASE } from "../../../types";

/**
 * Read and parse markdown files.
 *
 * @param base - Source directory
 * @returns Parsed reactive post objects
 */
export default async (base: BASE): Promise<Post[]> => {
    const files: string[] = traverse(base);
    const posts: Post[] = [];

    for (const pathname of files) {
        posts.push(await Post.reactive(pathname, base));
    }

    return posts;
};
