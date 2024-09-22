import fm from "front-matter";

import type {
    MarkdownFrontMatter,
    MarkdownFrontMatterParsed,
} from "../../../types";

/**
 * Parse front matter from plain markdown text.
 *
 * @param plain - Raw markdown content
 * @returns Parsed front matter
 */
export default (plain: string): MarkdownFrontMatterParsed => {
    const { attributes: front_matter, body: markdown } =
        fm<MarkdownFrontMatter>(plain);
    return { front_matter, markdown };
};
