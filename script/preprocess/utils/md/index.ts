import fs from "fs/promises";

import traverse from "../traverse";
import _render from "./render";
import _parse from "./parse";
import _text from "./text";
import _toc from "./toc";
import _fm from "./fm";

import type {
    MarkdownHeader,
    ParsedMarkdown,
    PathnameFilter,
    TraverseResult,
} from "../../../types";
import type Token from "markdown-it/lib/token.mjs";

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

    for (const { pathname, stats } of files) {
        const plain: string = await fs.readFile(pathname, "utf-8");

        const { attr, raw } = _fm(plain);
        const content: string = raw;

        const tokens: Token[] = _parse(content);
        const toc: MarkdownHeader[] = _toc(tokens);

        const html: string = _render(tokens);
        const text: string = _text(html);

        res.push({ pathname, stats, attr, raw, toc, html, text });
    }

    return res;
};
