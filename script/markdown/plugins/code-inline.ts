import type MarkdownIt from "markdown-it";

import { escape } from "../utils";

/**
 * Escape inline code and add class to it.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        const content: string = tokens[idx].content;

        return `<code class="inline-code">{"${escape(content)}"}</code>`;
    };
};
