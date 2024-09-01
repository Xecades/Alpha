/**
 * Store types for preprocessors
 *
 * @module types
 */

import type { Dirent } from "fs";
import type { FuseResult } from "fuse.js";

/**
 * Markdown content retrived directly from .md files, which contains unparsed front-matter.
 *
 * @note Usually named as `plain`.
 */
export type PlainMarkdownContent = string;

/**
 * Typical markdown content with front-matter purged.
 *
 * @note Usually named as `content`.
 */
export type MarkdownContent = string;

/**
 * HTML string, without JSX / Vue elements.
 *
 * @note Usually named as `html`.
 */
export type HTMLString = string;

/**
 * HTML string, with JSX / Vue elements.
 *
 * @note Usually named as `html`.
 */
export type ComponentString = string;

/** Front matter interface for markdown files. */
export interface MarkdownFrontMatter {
    /** Article title */
    title: string;
}

/** Parsed front matter. */
export interface MarkdownFrontMatterParsed {
    /** Front matter attributes */
    attr: MarkdownFrontMatter;

    /** Raw markdown content */
    raw: MarkdownContent;
}

/** Header extracted from markdown. */
export interface MarkdownHeader {
    /** Header level */
    level: number;

    /** Header title HTML */
    title: HTMLString;

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

    /** Dirent data */
    dirent: Dirent;
}

/** Parsed markdown data. */
export interface ParsedMarkdown extends TraverseResult {
    /** Parsed front matter */
    attr: MarkdownFrontMatter;

    /** Raw markdown content */
    raw: MarkdownContent;

    /** Table of contents */
    toc: MarkdownHeader[];

    /** Rendered HTML */
    html: ComponentString;

    /** Plain text extracted from HTML */
    text: string;
}

/** Component of metadata. */
export type CacheMetaContent = {
    /** Parsed front matter */
    attr: MarkdownFrontMatter;

    /** Table of contents */
    toc: MarkdownHeader[];
};

/** Cache metadata. Type of `meta.json` */
export type CacheMeta = Record<string, CacheMetaContent>;

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
export type RawNavNode = Record<string, any>;

/** Unparsed YML configurations. */
export interface RawConfig {
    /**
     * Navigation data.
     *
     * @todo Complete the recursive type structure.
     */
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
}

/** Cached search function. */
export type CacheSearch = (
    query: string
) => SearchTarget[] | FuseResult<SearchTarget>[];
