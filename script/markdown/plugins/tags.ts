import { removeAttr } from "../utils";
import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

/**
 * Transform block tags.
 *
 * @example `<quote>` => `<div class="quote">`
 *
 * @param token - Token
 * @returns Whether the token is transformed
 */
const transformBlock = (token: Token): boolean => {
    if (token.tag === "quote") {
        token.tag = "div";

        if (token.type === "mdc_block_open") {
            token.attrSet("class", "quote");
        }

        return true;
    } else if (token.tag === "asterisk") {
        token.tag = "div";
        console.assert(token.type === "mdc_block_shorthand");
        token.attrSet("class", "asterisk");

        return true;
    } else if (token.tag === "v") {
        token.tag = "div";
        console.assert(token.type === "mdc_block_shorthand");
        console.assert(
            token.attrs && token.attrs.length === 1,
            "v tag should have 1 attribute"
        );

        let value: string = token.attrs![0][0];
        token.attrSet("style", `margin-top: ${value}`);
        removeAttr(token, value);

        return true;
    }

    return false;
};

/**
 * Transform a right tag to a div tag.
 *
 * @example `<right>` => `<div class="right">`
 *
 * @param token - Token
 * @returns Whether the token is transformed
 */
const transformRight = (token: Token): boolean => {
    if (token.type === "html_inline") {
        if (token.content === "<right>") {
            token.content = '<div class="right">';
            return true;
        } else if (token.content === "</right>") {
            token.content = "</div>";
            return true;
        }
    }

    return false;
};

/**
 * Transform a mdc shorthand tag to another tag.
 *
 * @example `<sep>` => `<Delimiter>`
 *
 * @param token - Token
 * @returns Whether the token is transformed
 */
const transformMdcShorthand = (token: Token): boolean => {
    const pairs: Record<string, string> = {
        sep: "Delimiter",
        index: "Index",
    };

    if (token.type === "mdc_block_shorthand") {
        const tag = pairs[token.tag];
        if (tag) {
            token.tag = tag;
            return true;
        }
    }

    return false;
};

/**
 * Transform a mdc tag to a component tag.
 *
 * @example `<fold>` => `<Fold>`
 *
 * @param token - Token
 * @returns Whether the token is transformed
 */
const transformMdc = (token: Token): boolean => {
    const pairs: Record<string, string> = {
        fold: "Fold",
        tab: "Tab",
        note: "Note",
        linkcard: "LinkCard",
        grid: "Grid",
    };

    if (token.type === "mdc_block_open" || token.type === "mdc_block_close") {
        const tag = pairs[token.tag];
        if (tag) {
            token.tag = tag;
            return true;
        }
    }

    return false;
};

/**
 * Normalize some special tags to ordinary tags.
 *
 * @note Some special tags like <quote> or <right> cause a warning in Vue.
 *       So normalize them to ordinary tags.
 *
 * @example `<quote>` => `<div class="quote">`, `<fold>` => `<Fold>`
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    md.core.ruler.push("normalize_tags", (state) => {
        for (const token of state.tokens) {
            const type: string = token.type;

            // Block Transform
            if (transformBlock(token)) continue;
            if (transformMdc(token)) continue;
            if (transformMdcShorthand(token)) continue;

            // Inline Transform
            if (type === "inline") {
                for (const child of token.children!) {
                    if (transformRight(child)) continue;
                }
            }
        }
    });
};
