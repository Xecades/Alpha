import { extractText } from "../utils";

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

/**
 * Transform image syntax `![...](...)` into `ImageCaptioned` component.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        let src = tokens[idx].attrGet("src");
        let caption = self.renderInline(
            tokens[idx].children as Token[],
            options,
            env
        );

        let alt = extractText(caption) || "空";

        return `<ImageCaptioned alt="${alt}" src="${src}">${caption}</ImageCaptioned>`;
    };
};
