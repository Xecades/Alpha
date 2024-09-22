import fs from "fs";
import path from "path";
import Token from "markdown-it/lib/token.mjs";
import { timeDataOf } from "../git";

import {
    BASE,
    type MarkdownFrontMatter,
    type MarkdownHeader,
} from "../../../types";

import fm from "../md/fm";
import parse from "../md/parse";
import toc from "../md/toc";
import render from "../md/render";
import text from "../md/text";

export interface Post {
    /**
     * @example
     *  "note/cs/ads/avl-tree.md"
     *  "note/cs/index.md"
     */
    pathname: string;
    base: BASE;
}

export class Post {
    protected _raw?: string;
    protected _front_matter?: MarkdownFrontMatter;
    protected _markdown?: string;
    protected _tokens?: Token[];
    protected _toc?: MarkdownHeader[];
    protected _html?: string;
    protected _text?: string;

    constructor(pathname: string, base: BASE) {
        console.assert(
            pathname.startsWith(base),
            `Invalid pathname: ${pathname}`
        );

        this.pathname = pathname;
        this.base = base;
    }

    /**
     * @example
     *  "/note/cs/ads/avl-tree"
     *  "/note/cs"
     */
    get link(): string {
        const ext: RegExp = /(\/index)?\.md$/g;
        return "/" + this.pathname.replace(ext, "");
    }

    /**
     * @example
     *  "cache/note/posts/cs/ads/avl-tree.tsx"
     *  "cache/note/posts/cs/index.tsx"
     */
    get tsx_pathname(): string {
        const dist = `./cache/${this.base}/posts`;

        let res = this.pathname.replace(/^.+?\//, "");
        res = res.replace(/\.md$/, ".tsx");
        res = path.join(dist, res);

        return res;
    }

    /**
     * @example
     *  "@cache/note/posts/cs/ads/avl-tree"
     *  "@cache/note/posts/cs/index"
     */
    get tsx_import_path(): string {
        return "@" + this.tsx_pathname.replace(/\.tsx$/, "");
    }

    /**
     * @example
     *  "note/cs/ads/avl-tree.md"  =>  "cs"
     *  "note/404.md"  =>  ""
     *  "note/index.md"  =>  ""
     */
    get category(): string {
        if (this.link === `/${this.base}` || this.type === "404") {
            return "";
        }
        return this.link.split("/")[2];
    }

    /**
     * @example
     *  "note/cs/ads/avl-tree.md"  =>  "post"
     *  "note/cs/index.md"  =>  "index"
     *  "note/404.md"  =>  "404"
     */
    get type(): "index" | "post" | "404" {
        if (this.pathname.endsWith("/404.md")) {
            return "404";
        } else if (this.pathname.endsWith("/index.md")) {
            return "index";
        }
        return "post";
    }

    get time_data(): Promise<{ created: string; updated: string }> {
        return timeDataOf(this.pathname);
    }

    get raw(): string {
        if (this._raw === undefined) {
            this._raw = fs.readFileSync(this.pathname, "utf-8");
        }
        return this._raw;
    }

    get front_matter(): MarkdownFrontMatter {
        if (this._front_matter === undefined) {
            this._front_matter = fm(this.raw).front_matter;
        }
        return this._front_matter;
    }

    get markdown(): string {
        if (this._markdown === undefined) {
            this._markdown = fm(this.raw).markdown;
        }
        return this._markdown;
    }

    get tokens(): Token[] {
        if (this._tokens === undefined) {
            this._tokens = parse(this.markdown);
        }
        return this._tokens;
    }

    get toc(): MarkdownHeader[] {
        if (this._toc === undefined) {
            this._toc = toc(this.tokens);
        }
        return this._toc;
    }

    get html(): string {
        if (this._html === undefined) {
            this._html = render(this.tokens);
        }
        return this._html;
    }

    get text(): string {
        if (this._text === undefined) {
            this._text = text(this.html);
        }
        return this._text;
    }
}
