import { Post } from "../post";
import traverse from "../traverse";

import type { BASE } from "../../../types";

/**
 * Read and parse markdown files.
 *
 * @param base - Source directory
 * @returns Parsed reactive post objects
 */
export default (base: BASE): Post[] => {
    const files: string[] = traverse(base);

    return files.map((pathname) => Post.reactive(pathname, base));
};
