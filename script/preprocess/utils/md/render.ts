import { Post } from "../post";
import { md } from "./parse";

import type { MarkdownItEnv } from "../../../types";
import type Token from "markdown-it/lib/token.mjs";

/**
 * Render tokens to JSX string.
 *
 * @param tokens - Tokens
 * @param post - Post object
 * @returns JSX string
 */
export default (tokens: Token[], post: Post): string => {
    return md.renderer
        .render(tokens, md.options, { post } as MarkdownItEnv)
        .replace(/<!--.*?-->/g, "");
};
