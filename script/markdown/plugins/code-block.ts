import markdownItPrism from "markdown-it-prism";
import { defaultRenderer, escape, extractText, typst } from "../utils";

import type MarkdownIt from "markdown-it";

/**
 * Register code block syntax highlighting.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    /**
     * @name markdown-it-prism
     * @see https://github.com/jGleitz/markdown-it-prism
     */
    md.use(markdownItPrism);

    const originalFence = md.renderer.rules.fence || defaultRenderer;

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
            // Process normal code block
            let html = originalFence(tokens, idx, options, env, self).trim();

            html = html.replace(/^<pre.*?>(.*)<\/pre>$/gs, (...m) => m[1]);
            html = escape(html);

            return `<BlockCode lang="${lang}" html={"${html}"}></BlockCode>`;
            //
        }
    };
};
