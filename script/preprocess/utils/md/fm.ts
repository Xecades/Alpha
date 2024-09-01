import fm from "front-matter";

import type {
    MarkdownFrontMatter,
    MarkdownFrontMatterParsed,
    PlainMarkdownContent,
} from "../../types";

/**
 * Parse front matter from plain markdown text.
 *
 * @param plain - Raw markdown content
 * @returns Parsed front matter
 */
export default (plain: PlainMarkdownContent): MarkdownFrontMatterParsed => {
    const { attributes: attr, body: raw } = fm<MarkdownFrontMatter>(plain);
    return { attr, raw };
};
