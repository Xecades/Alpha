import type MarkdownIt from "markdown-it";

/**
 * Iterate through all h1 tokens and transform them into `delim` tags.
 *
 * @note The original h1 syntax is banned, instead it is used as tab panel delimiter.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    md.core.ruler.before("anchor", "h1_to_delim", (state) => {
        for (const token of state.tokens) {
            if (token.tag !== "h1") continue;

            let is_open: boolean = token.type === "heading_open";

            token.type = "delim_" + (is_open ? "open" : "close");
            token.tag = "Delimiter";
        }
    });
};
