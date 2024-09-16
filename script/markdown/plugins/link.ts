// @ts-ignore
import MarkdownItForInline from "markdown-it-for-inline";

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

/**
 * Transform `<a>` into `Anchor` component.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    /**
     * @name markdown-it-for-inline
     * @see https://github.com/markdown-it/markdown-it-for-inline
     */

    md.use(
        MarkdownItForInline,
        "vueify_anchor_open",
        "link_open",
        (tokens: Token[], idx: number) => {
            tokens[idx].tag = "Anchor";
        }
    );

    md.use(
        MarkdownItForInline,
        "vueify_anchor_close",
        "link_close",
        (tokens: Token[], idx: number) => {
            tokens[idx].tag = "Anchor";
        }
    );
};
