// @ts-ignore
import MarkdownItForInline from "markdown-it-for-inline";

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

/**
 * Add class to inline code.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    md.use(
        MarkdownItForInline,
        "add_class_to_inline_code",
        "code_inline",
        (tokens: Token[], idx: number) => {
            tokens[idx].attrSet("class", "inline-code");
        }
    );
};
