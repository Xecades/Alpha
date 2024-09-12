import MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.d.mts";

import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItPrism from "markdown-it-prism";
import MarkdownItMDC from "markdown-it-mdc";

// @ts-ignore
import MarkdownItForInline from "markdown-it-for-inline";

// @ts-ignore
import MarkdownItTaskCheckbox from "markdown-it-task-checkbox";

// @ts-ignore
import MarkdownItWrapper from "../markdown-it-wrapper";

import extractText from "../preprocess/utils/md/text";
import getEmoji from "../preprocess/utils/md/emoji";
import typst from "../preprocess/utils/md/typst";

/**
 * Get a markdown-it instance with full support, which is used for main content rendering.
 *
 * @returns MarkdownIt instance
 */
export default (): MarkdownIt => {
    /**
     * MarkdownIt Configurations
     *
     * @see https://markdown-it.github.io/markdown-it/#MarkdownIt.new
     */
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
     * @name markdown-it-mdc
     * @see https://github.com/antfu/markdown-it-mdc
     */
    md.use(MarkdownItMDC);

    /**
     * @name markdown-it-task-checkbox
     * @see https://github.com/linsir/markdown-it-task-checkbox
     */
    md.use(MarkdownItTaskCheckbox, {
        divWrap: false,
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
        renderer: (c: string) =>
            `<InlineMath data="${encodeURI(c)}"></InlineMath>`,
    });

    md.use(MarkdownItWrapper, {
        type: "block",
        name: "katex_block",
        marker: "$$",
        renderer: (c: string) =>
            `<BlockMath data="${encodeURI(c)}"></BlockMath>`,
    });

    md.use(MarkdownItWrapper, {
        type: "inline",
        name: "emoji_inline",
        marker: ":",
        renderer: getEmoji,
    });

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

    md.use(
        MarkdownItForInline,
        "add_class_to_inline_code",
        "code_inline",
        (tokens: Token[], idx: number) => {
            tokens[idx].attrSet("class", "inline-code");
        }
    );

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

    /**
     * Custom Functions
     */
    // 图片渲染成 Vue 组件
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        let src = tokens[idx].attrGet("src");
        let caption = self.renderInline(
            tokens[idx].children as Token[],
            options,
            env
        );

        let alt = extractText(caption) || "空";

        return `<ImageCaptioned alt="${alt}" src="${src}">${caption}</ImageCaptioned>`;
    };

    // 标题渲染成 Vue 组件
    const originalHeadingOpen =
        md.renderer.rules.heading_open ||
        function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };

    md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        tokens[idx].attrSet("class", "heading");
        return originalHeadingOpen(tokens, idx, options, env, self);
    };

    // 代码块渲染成 Vue 组件
    const originalFence =
        md.renderer.rules.fence ||
        function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const { info } = tokens[idx];
        const lang = info.split(" ")[0] || "plain";
        const meta = info.split(" ").slice(1).join(" ");

        /** @todo 处理 meta 中的转义、引号等 */

        if (lang === "typst" || lang === "typ") {
            // Process Typst code block
            let svg = typst(tokens[idx].content);
            let cap = meta || "";
            let cap_html = md.renderInline(cap);
            let alt = extractText(cap_html) || "空";

            svg = encodeURIComponent(svg);

            return `<SVGCaptioned svg="${svg}" alt="${alt}">${cap_html}</SVGCaptioned>`;
            //
        } else {
            // Process other code block
            let html = originalFence(tokens, idx, options, env, self).trim();

            html = html.replace(/^<pre.*?>(.*)<\/pre>$/gs, (...m) => m[1]);
            html = encodeURIComponent(html);

            return `<BlockCode lang="${lang}" html="${html}"></BlockCode>`;
            //
        }
    };

    return md;
};
