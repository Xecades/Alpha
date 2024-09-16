import type { RenderRule } from "markdown-it/lib/renderer.mjs";
import type Token from "markdown-it/lib/token.mjs";

/** The default token renderer. */
export const defaultRenderer: RenderRule = (tokens, idx, options, env, self) =>
    self.renderToken(tokens, idx, options);

/** Escape special characters in a string. */
export const escape = (s: string): string =>
    s.replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("\n", "\\n");

/**
 * Remove attribute on token.
 *
 * @param token - Token
 * @param name - Attribute name
 */
export const removeAttr = (token: Token, name: string) => {
    let idx = token.attrIndex(name);
    if (idx !== -1) {
        token.attrs!.splice(idx, 1);
    }
};

/** Supported color themes. */
export const THEMES: string[] = [
    "default",
    "primary",
    "success",
    "info",
    "warning",
    "danger",
];

export { default as typst } from "./typst";
export { default as getEmoji } from "./emoji";
export { default as extractText } from "../../preprocess/utils/md/text";
export { default as MarkdownItWrapper } from "../../markdown-it-wrapper";
