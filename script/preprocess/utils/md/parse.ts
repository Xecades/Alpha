import markdown from "../../../markdown";
import { Post } from "../post";

import type { MarkdownItEnv } from "../../../types";
import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

export const md: MarkdownIt = markdown();

/**
 * Parse markdown content to tokens.
 *
 * @param content - Markdown content
 * @param post - Post object
 * @returns Tokens
 */
export default (content: string, post: Post): Token[] => {
    return md.parse(content, { post } as MarkdownItEnv);
};
