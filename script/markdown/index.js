import MarkdownIt from "markdown-it";

import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItPrism from "markdown-it-prism";
import MarkdownItForInline from "markdown-it-for-inline";
import MarkdownItTaskCheckbox from "markdown-it-task-checkbox";

import MarkdownItWrapper from "../markdown-it-wrapper";

import extractText from "../preprocess/extract-text";

// MarkdownIt Configurations
// https://markdown-it.github.io/markdown-it/#MarkdownIt.new
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
});

/**
 * @name markdown-it-prism
 * @see https://github.com/jGleitz/markdown-it-prism
 */
md.use(MarkdownItPrism, {
    highlightInlineCode: true,
});

/**
 * @name markdown-it-task-checkbox
 * @see https://github.com/linsir/markdown-it-task-checkbox
 */
md.use(MarkdownItTaskCheckbox, {
    divWrap: true,
    divClass: "checkbox",
    idPrefix: "cbx_",
    ulClass: "task-list",
    liClass: "task-list-item",
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

/**
 * @name markdown-it-for-inline
 * @see https://github.com/markdown-it/markdown-it-for-inline
 */
md.use(
    MarkdownItForInline,
    "vueify_anchor_open",
    "link_open",
    (tokens, idx) => {
        tokens[idx].tag = "anchor";
    }
);

md.use(
    MarkdownItForInline,
    "vueify_anchor_close",
    "link_close",
    (tokens, idx) => {
        tokens[idx].tag = "anchor";
    }
);

/**
 * @name markdown-it-anchor
 * @see https://github.com/valeriangalliat/markdown-it-anchor
 *
 * @note 这个需要放在 MarkdownItForInline 后面，否则 <a> 标签会被替换
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
 * Custom Function
 */
md.renderer.rules.image = function (tokens, idx, options, env, self) {
    let src = tokens[idx].attrGet("src");
    let caption = self.renderInline(tokens[idx].children, options, env);
    let alt = extractText(caption);

    return `<image-captioned alt="${alt}" src="${src}">${caption}</image-captioned>`;
};

const originalHeadingOpen =
    md.renderer.rules.heading_open ||
    function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    // console.log(tokens[idx]);

    // const token = tokens[idx]
    // let level = +token.tag.slice(1);
    // let id = token.attrGet("id");

    tokens[idx].attrSet("class", "heading");
    return originalHeadingOpen(tokens, idx, options, env, self);
};

export default md;
