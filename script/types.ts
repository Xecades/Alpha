import type { Stats } from "fs";
import type { FuseResult } from "fuse.js";
import type { RouteRecordSingleView } from "vue-router";
import type { JSX } from "vue/jsx-runtime";

export const assertType = <T>(value: any): T => value as unknown as T;

/** Front matter interface for markdown files. */
export interface MarkdownFrontMatter {
    /** Article title */
    title: string;

    /** Whether to show comments */
    comment?: boolean;

    /** Whether to show metadata, i.e. Creation & Modification time */
    metadata?: boolean;
}

/** Parsed front matter. */
export interface MarkdownFrontMatterParsed {
    /** Front matter attributes */
    attr: MarkdownFrontMatter;

    /** Raw markdown content */
    raw: string;
}

/** Header extracted from markdown. */
export interface MarkdownHeader {
    /** Header level */
    level: number;

    /** Header title HTML */
    title: string;

    /** Header permalink */
    link: string;
}

/** Header extracted from markdown, title is JSX element */
export interface MarkdownHeaderJsx {
    /** Header level */
    level: number;

    /** Header title */
    title: JSX.Element;

    /** Header permalink */
    link: string;
}

/** Filter applied on traversal */
export interface PathnameFilter {
    (pathname: string): boolean;
}

/** Result for directory traversal. */
export interface TraverseResult {
    /** Pathname of current file */
    pathname: string;

    /** Stat data */
    stats: Stats;
}

/** Parsed markdown data. */
export interface ParsedMarkdown extends TraverseResult {
    /** Parsed front matter */
    attr: MarkdownFrontMatter;

    /** Raw markdown content */
    raw: string;

    /** Table of contents */
    toc: MarkdownHeader[];

    /** Rendered HTML */
    html: string;

    /** Plain text extracted from HTML */
    text: string;
}

/**
 * Base names for markdown caching. Cache files are generated based on these names.
 *
 * @example
 *  - Source markdown files: `./${BASE}/.../*.md`
 *  - Cache files: `./cache/${BASE}/...`
 */
export enum BASE {
    NOTE = "note",
}

/** The object passed to fuse.js to be indexed. */
export interface SearchTarget {
    /** Article title */
    title: string;

    /** Purged article content */
    content: string;

    /** Article link */
    link: string;

    /** Whether is index file, i.e. pathname ends with `index.md` */
    is_index: boolean;
}

/** Unparsed nav node. */
export type RawNavNode = Record<string, RawNavNode[] | string>;

/** Unparsed YML configurations. */
export interface RawConfig {
    /** Navigation data. */
    nav: RawNavNode[];
}

/** Parsed nav node. */
export interface NavNode {
    /** Nav title */
    title: string;

    /** Nav name, e.g. `cs`, `math` */
    name: string;

    /** Link to the article */
    link: string;

    /** Children nodes */
    children: NavNode[];
}

/** Parsed configurations. */
export interface Config {
    nav: NavNode[];
}

/** Route meta data. */
export interface RouteMeta {
    /** Pathname of local markdown file */
    pathname: string;

    /** Category of the route, empty string for `${base}/index` */
    category: string;

    /** Body component */
    body: () => Promise<{ default: JSX.Element }>;

    /** Parsed front matter */
    attr: MarkdownFrontMatter;

    /** Table of contents */
    toc: MarkdownHeaderJsx[];

    /** Creation time */
    created: string;

    /** Last modified time */
    updated: string;

    /** Page type */
    type: "index" | "post";

    /** Route scroll to */
    scrollTo?: { left: number; top: number };
}

/** Cached route record. */
export type CachedRouteRecord = RouteRecordSingleView & { meta: RouteMeta };

/** Cached search function. */
export type CachedSearchFn = (
    query: string
) => SearchTarget[] | FuseResult<SearchTarget>[];

/** Note layout rightbar status. */
export enum NOTE_R_STATUS {
    /** To display */
    SHOW,

    /** To hide */
    HIDE,
}

/** Note layout leftbar status. */
export enum NOTE_L_STATUS {
    /**
     * Use hover status to determine whether to display.
     *
     * @note This is the default status. Whether to show the leftbar is
     *       determined by mouse events.
     */
    HOVER_TO_SHOW,

    /**
     * Always show the leftbar.
     *
     * @note This status means the category list will always be shown.\
     *       *BUT*, the detailed article list will **NEVER** be shown.
     */
    ALWAYS_SHOW,
}

/** Global color scheme. */
export enum COLOR_SCHEME {
    /** Light theme */
    LIGHT,

    /** Dark theme */
    DARK,

    /** Depends on system */
    SYSTEM,
}
