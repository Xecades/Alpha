import MarkdownIt from "markdown-it";
import { slugify } from "transliteration";

import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItPrism from "markdown-it-prism";

// MarkdownIt Configurations
// https://markdown-it.github.io/markdown-it/#MarkdownIt.new
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

/**
 * @name markdown-it-anchor
 * @link https://github.com/valeriangalliat/markdown-it-anchor
 */
md.use(MarkdownItAnchor, {
    permalink: MarkdownItAnchor.permalink.linkInsideHeader({
        class: "cursor header-anchor",
        symbol: "¶",
        placement: "after",
    }),
    slugify: slugify,
});

/**
 * @name markdown-it-prism
 * @link https://github.com/jGleitz/markdown-it-prism
 *
 * @todo match-braces 起作用了吗？看起来没有
 */
md.use(MarkdownItPrism, {
    highlightInlineCode: true,
    plugins: ["match-braces"],
});

export default md;
