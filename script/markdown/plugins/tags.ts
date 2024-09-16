import type MarkdownIt from "markdown-it";

/**
 * Normalize some special tags to ordinary tags.
 *
 * @note Some special tags like <quote> or <right> cause a warning in Vue.
 *       So normalize them to ordinary tags.
 *
 * @example `<quote>` => `<div class="quote">`
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
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
};
