import { escape, MarkdownItWrapper } from "../utils";
import type MarkdownIt from "markdown-it";

/**
 * Transform `$...$` and `$$...$$` into inline and block math components.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    /**
     * @name markdown-it-for-inline
     * @see https://github.com/markdown-it/markdown-it-for-inline
     */

    md.use(MarkdownItWrapper, {
        type: "inline",
        name: "math_inline",
        marker: "$",
        renderer: (c: string) =>
            `<InlineMath data={"${escape(c)}"}></InlineMath>`,
    });

    md.use(MarkdownItWrapper, {
        type: "block",
        name: "math_block",
        marker: "$$",
        renderer: (c: string) =>
            `<BlockMath data={"${escape(c)}"}></BlockMath>`,
    });
};
