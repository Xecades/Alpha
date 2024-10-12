import { escape, extractText } from "../utils";
import { sizeOf } from "../../preprocess/utils/image";
import isRelativeUrl from "is-relative-url";
import path from "path";

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

        let size = env.post.await(async () => {
            let r_src = isRelativeUrl(src)
                ? path.join(path.dirname(env.post.pathname), src)
                : src;

            return JSON.stringify(await sizeOf(r_src));
        });

        let u_src = isRelativeUrl(src)
            ? "{" + env.post.use(src) + "}"
            : `"${src}"`;

        return `<ImageCaptioned alt={"${alt}"} src=${u_src} size={${size}}>${caption}</ImageCaptioned>`;
    };
};
