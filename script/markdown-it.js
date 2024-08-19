import MarkdownIt from "markdown-it";

import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItPrism from "markdown-it-prism";

import MarkdownItWrapper from "./markdown-it-wrapper";

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
    slugify: () => "t",
    uniqueSlugStartIndex: 2,
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

/**
 * @name markdown-it-wrapper
 */
md.use(MarkdownItWrapper, {
    type: "inline",
    name: "katex_inline",
    marker: "$",
    renderer: (c) => `<inline-math data="${encodeURI(c)}"></inline-math>`,
});

md.use(MarkdownItWrapper, {
    type: "block",
    name: "katex_block",
    marker: "$$",
    renderer: (c) => `<block-math data="${encodeURI(c)}"></block-math>`,
});

export default md;
