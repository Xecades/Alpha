import MarkdownItAnchor from "markdown-it-anchor";
import { defaultRenderer } from "../utils";

import type MarkdownIt from "markdown-it";

/**
 * Add class to headings and add anchor links.
 *
 * @param md - MarkdownIt instance
 *
 * @note Should be placed after `link.ts`, otherwise `<a>` tags will be mis-replaced
 */
export default (md: MarkdownIt) => {
    /**
     * @name markdown-it-anchor
     * @note 这个需要放在 MarkdownItForInline 后面，否则 <a> 标签会被替换
     * @see https://github.com/valeriangalliat/markdown-it-anchor
     */
    md.use(MarkdownItAnchor, {
        permalink: MarkdownItAnchor.permalink.linkInsideHeader({
            class: "cursor header-anchor",
            symbol: "¶",
            placement: "after",
        }),
        slugify: (): string => "t",
        uniqueSlugStartIndex: 2,
    });

    const originalHeadingOpen =
        md.renderer.rules.heading_open || defaultRenderer;

    md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        tokens[idx].attrSet("class", "heading");
        return originalHeadingOpen(tokens, idx, options, env, self);
    };
};
