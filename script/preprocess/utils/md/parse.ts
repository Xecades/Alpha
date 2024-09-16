import markdown from "../../../markdown";

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

export const md: MarkdownIt = markdown();

/**
 * Parse markdown content to tokens.
 *
 * @param content - Markdown content
 * @returns Tokens
 */
export default (content: string): Token[] => {
    return md.parse(content, {});
};
