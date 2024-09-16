import { md } from "./parse";

import type Token from "markdown-it/lib/token.mjs";

/**
 * Render tokens to JSX string.
 *
 * @param tokens - Tokens
 * @returns JSX string
 */
export default (tokens: Token[]): string => {
    return md.renderer.render(tokens, md.options, {});
};
