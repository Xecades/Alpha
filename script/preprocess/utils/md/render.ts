import bodyMD from "../../../markdown/body";

import type MarkdownIt from "markdown-it";
import type { ComponentString, MarkdownContent } from "../../../types";

/**
 * Render markdown content to HTML.
 *
 * @param content - Markdown content
 * @returns HTML string, which may contain JSX / Vue element(s)
 */
export default (content: MarkdownContent): ComponentString => {
    const md: MarkdownIt = bodyMD();

    return md.render(content);
};
