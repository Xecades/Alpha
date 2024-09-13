import tocMD from "../../../markdown/toc";

import type MarkdownIt from "markdown-it";
import type { MarkdownContent, MarkdownHeader } from "../../../types";

/**
 * Generate TOC based on markdown content.
 *
 * @param markdown - Markdown content
 * @returns Headers extracted from markdown
 */
export default (content: MarkdownContent): MarkdownHeader[] => {
    const header_match = /^ *#{2,6} /s;
    const md: MarkdownIt = tocMD();

    let lines = content.split("\n");
    let headers = [];

    let is_in_codeblock = false;

    for (let i = 0; i < lines.length; i++) {
        // `#` in code block is not a header
        if (lines[i].startsWith("```")) {
            is_in_codeblock = !is_in_codeblock;
        }

        if (!is_in_codeblock && header_match.test(lines[i])) {
            headers.push(lines[i].trim());
        }
    }

    headers = headers.map((h, idx) => {
        let whitespace_offset = h.indexOf(" ");

        let level = h.slice(0, whitespace_offset).length;
        let title = h.slice(whitespace_offset + 1).trim();

        return {
            level: level,
            title: md.renderInline(title),
            link: idx == 0 ? "t" : `t-${idx + 1}`,
        } as MarkdownHeader;
    });

    return headers;
};
