/**
 * @file config.ts
 * @description Parse raw config data, e.g. nav, and cache them.
 */

import fs from "fs-extra";
import yaml from "yaml";
import {join} from "path"

import type {
    BASE,
    Config,
    NavNode,
    ParsedMarkdown,
    RawConfig,
    RawNavNode,
} from "../../types";

/**
 * Read and parse YML config file to object.
 *
 * @param path - Path to the config file.
 * @returns Raw config data.
 */
const readYML = async (path: string): Promise<RawConfig> => {
    const raw: string = await fs.readFile(path, "utf-8");
    return yaml.parse(raw);
};

/**
 * Parse raw nav data to nav nodes.
 *
 * @param rawNav - Raw nav data to be parsed.
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 * @returns Parsed nav data.
 */
const parse_nav = (
    rawNav: RawNavNode[],
    parsed: ParsedMarkdown[],
    base: BASE
): NavNode[] => {
    const name_of = (node: RawNavNode) => Object.keys(node)[0];
    
    const title_of = (pathname: string) =>
        parsed.filter((d) => d.pathname === pathname)[0].attr.title;

    /**
     * Recursively traverse and parse raw nav data.
     */
    const dfs = (branch: RawNavNode | string, path: string): NavNode => {
        if (typeof branch === "string") {
            // Leaf node
            const name: string = branch;

            // Use path.join() instead of String+'/'+String to
            // ensure the capability of both Windows and Linux
            path = join(path,name)

            const pathname: string = path + ".md";

            return {
                title: title_of(pathname),
                name: name,
                link: path,
                children: [],
            };
        } else {
            // Branch node, i.e. `/index.md`
            const name: string = name_of(branch);


            // Use path.join() instead of String+'/'+String to
            // ensure the capability of both Windows and Linux
            path = join(path,name)

            const pathname: string = join(path,"/index.md");

            const res: NavNode = {
                title: title_of(pathname),
                name: name,
                link: path,
                children: [],
            };

            const children: RawNavNode[] = branch[name];
            for (const child of children) {
                res.children.push(dfs(child, path));
            }

            return res;
        }
    };

    const res: NavNode[] = [];

    for (const branch of rawNav) {
        const root: NavNode = dfs(branch, base);
        res.push(root);
    }

    return res;
};

/**
 * Parse and cache config (`./${base}/config.yml`) to `./cache/${base}/config.json`.
 *
 * @note This module caches `config.yml`.
 *
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 */
export default async (parsed: ParsedMarkdown[], base: BASE) => {
    const config_path: string = `./${base}/config.yml`;
    const dist: string = `./cache/${base}/config.json`;

    const rawConfig: RawConfig = await readYML(config_path);
    const config: Config = rawConfig as Config;

    config.nav = parse_nav(rawConfig.nav, parsed, base);

    await fs.outputJSON(dist, config);
};
