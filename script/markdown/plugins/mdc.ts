import MarkdownItMdc from "markdown-it-mdc";
import { defaultRenderer, removeAttr, THEMES } from "../utils";
import { Post } from "../../preprocess/utils/post";

import type { MarkdownItEnv } from "../../types";
import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

type Targets = Record<string, string[]>;

const placeholder = (id: string) => `__mdc_placeholder_[[${id}]]__`;

/**
 * Squash boolean theme attributes to a single type attribute.
 *
 * @example `<note default="true">` => `<note type="default">`
 *
 * @param token - Token to transform
 * @param targets - Attributes to transform
 */
const convertToAttribute = (token: Token, targets: Targets) => {
    if (targets[token.info]) {
        let attrs = targets[token.info];

        for (let attr of attrs) {
            if (token.attrGet(attr) === "true") {
                token.attrSet("type", attr);
            }
            removeAttr(token, attr);
        }
    }
};

/**
 * Replace the original attributes with placeholders, and get the original values.
 *
 * @param token - Token to transform
 * @param targets - Attributes to transform
 * @returns Original values of the attributes
 */
const convertToPlaceholder = (
    token: Token,
    targets: Targets
): Record<string, string> => {
    let values: Record<string, string> = {};

    if (targets[token.info]) {
        let attrs: string[] = targets[token.info];

        for (let attr of attrs) {
            let value = token.attrGet(attr);
            if (value !== null) {
                let ph = placeholder(attr);

                token.attrSet(attr, ph);
                values[attr] = value;
            }
        }
    }

    return values;
};

/**
 * Attach attributes to the token.
 *
 * @param token - Token to attach attributes
 */
const attachAttributes = (token: Token, post: Post) => {
    if (token.info === "index") {
        // For <Index /> Tag, attach the `target` attribute
        if (token.attrGet("target") === null) {
            token.attrSet("target", post.link);
        }
    }
};

/**
 * Transform markdown string in attributes to JSX.
 *
 * @example `<fold title="**success**">` => `<fold title={<strong>success</strong>}>`
 *
 * @note This is achieved by firstly replacing the markdown string with a placeholder,
 *       then rendering the markdown string and replacing the placeholder.
 *
 * @param token - Token to transform
 * @param md - MarkdownIt instance
 * @param rendered - Rendered string
 * @param targets - Attributes to transform
 * @param values - Original values of the attributes
 * @returns Transformed string
 */
const transformToJsx = (
    token: Token,
    md: MarkdownIt,
    rendered: string,
    targets: Targets,
    values: Record<string, string>
): string => {
    if (targets[token.info]) {
        let attrs: string[] = targets[token.info];

        for (let attr of attrs) {
            if (values!.hasOwnProperty(attr)) {
                let ph = placeholder(attr);
                let html = md.renderInline(values[attr]).trim();

                rendered = rendered.replace(`"${ph}"`, `{<>${html}</>}`);
            }
        }
    }

    return rendered;
};

/**
 * Transform boolean attributes.
 *
 * @example `<fold expand="true">` => `<fold expand>`
 *
 * @param token - Token to transform
 * @param rendered - Rendered string
 * @param targets - Attributes to transform
 * @returns Transformed string
 */
const transformToBoolean = (
    token: Token,
    rendered: string,
    targets: Targets
): string => {
    if (targets[token.info]) {
        let attrs = targets[token.info];
        for (let attr of attrs) {
            rendered = rendered.replace(` ${attr}="true"`, ` ${attr}`);
        }
    }

    return rendered;
};

/**
 * Transform MDC components.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    /**
     * @name markdown-it-mdc
     * @see https://github.com/antfu/markdown-it-mdc
     */

    /** @note Disable `inlineSpan` to avoid conflict with {@link checkbox}. */
    md.use(MarkdownItMdc, {
        syntax: {
            inlineSpan: false,
        },
    });

    const originalMdcBlockOpen =
        md.renderer.rules.mdc_block_open || defaultRenderer;

    md.renderer.rules.mdc_block_open = (
        tokens,
        idx,
        options,
        env: MarkdownItEnv,
        self
    ) => {
        const token = tokens[idx];

        const targets = {
            theme: {
                fold: THEMES,
                note: THEMES,
            },
            jsx: {
                fold: ["title"],
            },
            bool: {
                fold: ["expand"],
            },
        };

        convertToAttribute(token, targets.theme);
        attachAttributes(token, env.post);
        let jsxVal = convertToPlaceholder(token, targets.jsx);

        let res: string = originalMdcBlockOpen(tokens, idx, options, env, self);
        res = transformToJsx(token, md, res, targets.jsx, jsxVal);
        res = transformToBoolean(token, res, targets.bool);

        return res;
    };
};
