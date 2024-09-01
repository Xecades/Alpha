import fs from "fs/promises";

import traverse from "../traverse";
import _render from "./render";
import _text from "./text";
import _toc from "./toc";
import _fm from "./fm";

import type {
    ComponentString,
    MarkdownContent,
    MarkdownHeader,
    ParsedMarkdown,
    PathnameFilter,
    PlainMarkdownContent,
    TraverseResult,
} from "../../types";

/**
 * Read and parse markdown files.
 *
 * @param src - Source directory
 * @returns Parsed markdown data
 */
export default async (src: string): Promise<ParsedMarkdown[]> => {
    const filter: PathnameFilter = (x: string) => x.endsWith(".md");

    const res: ParsedMarkdown[] = [];
    const files: TraverseResult[] = await traverse(src, filter);

    for (const { pathname, dirent } of files) {
        const plain: PlainMarkdownContent = await fs.readFile(
            pathname,
            "utf-8"
        );

        const { attr, raw } = _fm(plain);
        const content: MarkdownContent = raw;

        const toc: MarkdownHeader[] = _toc(content);
        const html: ComponentString = _render(content);

        const text: string = _text(html);

        res.push({ pathname, dirent, attr, raw, toc, html, text });
    }

    return res;
};
