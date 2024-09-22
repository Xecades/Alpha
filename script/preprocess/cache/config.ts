import fs from "fs-extra";
import yaml from "yaml";
import { Post } from "../utils/post";

import type { BASE, Config, NavNode, RawConfig, RawNavNode } from "../../types";

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
 * @param posts - Parsed post objects.
 * @param base - The base name for markdown caching.
 * @returns Parsed nav data.
 */
const parse_nav = (
    rawNav: RawNavNode[],
    posts: Post[],
    base: BASE
): NavNode[] => {
    const name_of = (node: RawNavNode) => Object.keys(node)[0];
    const title_of = (pathname: string) =>
        posts.filter((d) => d.pathname === pathname)[0].front_matter.title;

    /**
     * Recursively traverse and parse raw nav data.
     */
    const dfs = (branch: RawNavNode | string, path: string): NavNode => {
        if (typeof branch === "string") {
            // Leaf node
            const name: string = branch;
            path += "/" + name;

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
            path += "/" + name;

            const pathname: string = path + "/index.md";

            const res: NavNode = {
                title: title_of(pathname),
                name: name,
                link: path,
                children: [],
            };

            const children: RawNavNode[] | string = branch[name];

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
 * Parse and cache config (`./${base}/config.yml`) to `./cache/${base}/config.ts`.
 *
 * @note This module caches `config.yml`.
 *
 * @param posts - Parsed post objects.
 * @param base - The base name for markdown caching.
 */
export default async (posts: Post[], base: BASE) => {
    const config_path: string = `./${base}/config.yml`;
    const dist: string = `./cache/${base}/config.ts`;

    const rawConfig: RawConfig = await readYML(config_path);
    const config: Config = { ...rawConfig, nav: [] };

    config.nav = parse_nav(rawConfig.nav, posts, base);

    let cache = "";
    cache += 'import type { Config } from "@script/types";\n';
    cache += `const config: Config = ${JSON.stringify(config)};\n`;
    cache += "export default config;\n";

    await fs.outputFile(dist, cache);
};
