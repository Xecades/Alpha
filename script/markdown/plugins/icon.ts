import markdownItWrapper from "../../markdown-it-wrapper";

import type MarkdownIt from "markdown-it";

/**
 * Transform `:...:` into FontAwesome components.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    md.use(markdownItWrapper, {
        type: "inline",
        name: "emoji_inline",
        marker: ":",
        renderer: (name: string) => {
            return `<font-awesome-icon class="icon" icon="${name}" />`;
        },
    });
};
