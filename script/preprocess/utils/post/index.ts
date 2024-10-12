import fs from "fs-extra";
import path from "path";
import Token from "markdown-it/lib/token.mjs";
import chokidar from "chokidar";
import { createHash } from "node:crypto";
import { reactive } from "vue";
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
    dependencies: {
        src: string;
        name: string;
    }[];
    awaits: {
        target: () => Promise<string>;
        name: string;
    }[];
    base: BASE;
    time_data: { created: string; updated: string };
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
        this.dependencies = [];
        this.awaits = [];
    }

    /** Create a reactive post object. */
    static async reactive(pathname: string, base: BASE): Promise<Post> {
        const res = reactive(new Post(pathname, base));
        await res.update_time_data();

        if (process.env.NODE_ENV == "development") {
            chokidar.watch(pathname).on("change", async () => {
                res.reset();
                await res.update_time_data();
                console.log(`[Modified] ./${pathname}`);
            });
        }

        return res;
    }

    /** Reset all cached data. */
    reset() {
        this._raw = undefined;
        this._front_matter = undefined;
        this._markdown = undefined;
        this._tokens = undefined;
        this._toc = undefined;
        this._html = undefined;
        this._text = undefined;
        this.dependencies = [];
        this.awaits = [];
    }

    async update_time_data() {
        this.time_data = await timeDataOf(this.pathname);
    }

    require(content: string, ext: string): string {
        const filename: string =
            this.filename +
            "." +
            this.dependencies.length +
            "." +
            createHash("md5")
                .update(this.pathname + this.dependencies.length)
                .digest("hex")
                .slice(0, 8) +
            ext;

        const dist = `./cache/${this.base}/temp/${filename}`;
        const name = `temp_${this.dependencies.length}`;

        fs.outputFileSync(dist, content);

        this.dependencies.push({
            src: dist.slice(1),
            name: name,
        });

        return name;
    }

    use(src: string): string {
        const dist = "/" + path.join(path.dirname(this.pathname), src);
        const name = `dep_${this.dependencies.length}`;

        this.dependencies.push({
            src: dist,
            name: name,
        });

        return name;
    }

    await(promise: () => Promise<string>): string {
        const name = `await_${this.awaits.length}`;
        this.awaits.push({
            target: promise,
            name: name,
        });
        return name;
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
     *  "avl-tree"
     *  "cs"
     */
    get filename(): string {
        return path.basename(this.link);
    }

    /**
     * @example
     *  "/note/cs/ads/avl-tree"  =>  "/note/cs/ads"
     *  "/note"  =>  null
     *  "/error"  =>  "/note"
     */
    get back_link(): string | null {
        if (this.link === `/${this.base}`) {
            return null;
        } else if (this.type === "404") {
            return `/${this.base}`;
        }
        return this.link.replace(/\/[^/]+$/, "");
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
            this._tokens = parse(this.markdown, this);
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
            this._html = render(this.tokens, this);
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
