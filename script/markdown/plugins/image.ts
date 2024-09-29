import { escape, extractText } from "../utils";

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import type { MarkdownItEnv } from "../../types";

/**
 * Transform image syntax `![...](...)` into `ImageCaptioned` component.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    md.renderer.rules.image = (
        tokens,
        idx,
        options,
        env: MarkdownItEnv,
        self
    ) => {
        let src = tokens[idx].attrGet("src")!;
        let caption = self.renderInline(
            tokens[idx].children as Token[],
            options,
            env
        );

        let alt = extractText(caption) || "空";
        alt = escape(alt);

        if (src.startsWith(".") || src.startsWith("/"))
            src = "{" + env.post.use(src) + "}";
        else src = `"${src}"`;

        return `<ImageCaptioned alt={"${alt}"} src=${src}>${caption}</ImageCaptioned>`;
    };
};
