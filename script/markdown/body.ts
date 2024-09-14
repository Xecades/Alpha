import MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.d.mts";
import type { RenderRule } from "markdown-it/lib/renderer.mjs";

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
import tab from "../preprocess/utils/md/tab";

const escape = (s: string): string =>
    s.replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("\n", "\\n");

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
     * @note Disable `inlineSpan` to avoid conflict with {@link markdown-it-task-checkbox}
     * @see https://github.com/antfu/markdown-it-mdc
     */
    md.use(MarkdownItMDC, {
        syntax: {
            inlineSpan: false,
        },
    });

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
            `<InlineMath data={"${escape(c)}"}></InlineMath>`,
    });

    md.use(MarkdownItWrapper, {
        type: "block",
        name: "katex_block",
        marker: "$$",
        renderer: (c: string) =>
            `<BlockMath data={"${escape(c)}"}></BlockMath>`,
    });

    md.use(MarkdownItWrapper, {
        type: "inline",
        name: "emoji_inline",
        marker: ":",
        renderer: getEmoji,
    });

    md.use(MarkdownItWrapper, {
        type: "block",
        name: "tab_block",
        marker: "@@@",
        parser: md.render.bind(md),
        renderer: tab,
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
    const defaultRender: RenderRule = (tokens, idx, options, env, self) =>
        self.renderToken(tokens, idx, options);

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
    const originalHeadingOpen = md.renderer.rules.heading_open || defaultRender;

    md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        tokens[idx].attrSet("class", "heading");
        return originalHeadingOpen(tokens, idx, options, env, self);
    };

    // 代码块渲染成 Vue 组件
    const originalFence = md.renderer.rules.fence || defaultRender;

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

            svg = escape(svg);

            return `<SVGCaptioned svg={"${svg}"} alt="${alt}">${cap_html}</SVGCaptioned>`;
            //
        } else {
            // Process other code block
            let html = originalFence(tokens, idx, options, env, self).trim();

            html = html.replace(/^<pre.*?>(.*)<\/pre>$/gs, (...m) => m[1]);
            html = escape(html);

            return `<BlockCode lang="${lang}" html={"${html}"}></BlockCode>`;
            //
        }
    };

    // MDC 预处理
    const originalMdcBlockOpen =
        md.renderer.rules.mdc_block_open || defaultRender;

    const clearAttr = (token: Token, name: string) => {
        let idx = token.attrIndex(name);
        if (idx !== -1) {
            token.attrs!.splice(idx, 1);
        }
    };

    md.renderer.rules.mdc_block_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        let override: string | undefined = undefined;

        // Translate boolean types to type attribute
        // e.g. <note default="true">  ->  <note type="default">
        if (token.info === "fold" || token.info === "note") {
            const TYPES: string[] = [
                "default",
                "primary",
                "success",
                "info",
                "warning",
                "danger",
            ];

            for (let type of TYPES) {
                if (token.attrGet(type) === "true") {
                    token.attrSet("type", type);
                }
                clearAttr(token, type);
            }
        }

        // Parse markdown string in attributes
        // e.g. <fold title="**primary**"> ->  <fold title={<strong>primary</strong>}>
        //
        // This is achieved by firstly replacing the markdown string with a placeholder,
        // then rendering the markdown string and replacing the placeholder.
        const placeholder = (id: string) => `__mdc_placeholder_[[${id}]]__`;
        const MD_TARGETS: Record<string, string[]> = {
            fold: ["title"],
        };

        if (MD_TARGETS[token.info]) {
            let attrs = MD_TARGETS[token.info];
            let values: Record<string, string> = {};

            for (let attr of attrs) {
                let value = token.attrGet(attr);
                if (value !== null) {
                    let ph = placeholder(attr);
                    token.attrSet(attr, ph);
                    values[attr] = value;
                }
            }

            override = originalMdcBlockOpen(tokens, idx, options, env, self);

            for (let attr of attrs) {
                if (values.hasOwnProperty(attr)) {
                    let ph = placeholder(attr);
                    let rendered = md.renderInline(values[attr]).trim();

                    override = override.replace(
                        `"${ph}"`,
                        `{<>${rendered}</>}`
                    );
                }
            }
        }

        // Translate string "true" / "false" to boolean true / false
        // e.g. <fold expand="true">  ->  <fold expand>
        const BOOL_TARGETS: Record<string, string[]> = {
            fold: ["expand"],
        };

        if (BOOL_TARGETS[token.info]) {
            override =
                override ||
                originalMdcBlockOpen(tokens, idx, options, env, self);

            let attrs = BOOL_TARGETS[token.info];
            for (let attr of attrs) {
                override = override.replace(` ${attr}="true"`, ` ${attr}`);
            }
        }

        return (
            override || originalMdcBlockOpen(tokens, idx, options, env, self)
        );
    };

    // The original h1 syntax is banned, instead it is used as tab panel delimiter.
    // So iterate through all h1 tokens and replace them with `delim`.
    md.core.ruler.before("anchor", "snippet_tab_replace_h1", (state) => {
        for (const token of state.tokens) {
            if (token.tag !== "h1") continue;

            let is_open: boolean = token.type === "heading_open";

            token.type = "delim_" + (is_open ? "open" : "close");
        }
    });

    // Some special tags like <quote> or <right> cause a warning in Vue.
    // So normalize them to ordinary tags.
    // e.g. <quote>  ->  <div class="quote">
    md.core.ruler.push("normalize_tags", (state) => {
        for (const token of state.tokens) {
            const type: string = token.type;
            const tag: string = token.tag;

            if (tag === "quote") {
                token.tag = "div";

                if (type === "mdc_block_open") {
                    token.attrSet("class", "quote");
                }
            }

            if (type === "inline") {
                const children = token.children!;

                for (const child of children) {
                    if (child.type === "html_inline") {
                        if (child.content === "<right>") {
                            child.content = '<div class="right">';
                        } else if (child.content === "</right>") {
                            child.content = "</div>";
                        }
                    }
                }
            }
        }
    });

    // console.log(md.core.ruler.__rules__.map((r) => r.name));

    return md;
};
