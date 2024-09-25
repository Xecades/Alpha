import fs from "fs-extra";
import yaml from "yaml";
import chokidar from "chokidar";
import { computed, ref, watchEffect } from "vue";
import { Post } from "../utils/post";

import type { Ref } from "vue";
import type { BASE, Config, NavNode, RawConfig, RawNavNode } from "../../types";

/**
 * Read and parse YML config file to object.
 *
 * @param path - Path to the config file.
 * @returns Raw config data.
 */
const readYML = (path: string): Ref<RawConfig> => {
    const raw: Ref<string> = ref(fs.readFileSync(path, "utf-8"));

    if (process.env.NODE_ENV == "development") {
        chokidar.watch(path).on("change", () => {
            raw.value = fs.readFileSync(path, "utf-8");
            console.log(`[Modified] ${path}`);
        });
    }

    return computed(() => yaml.parse(raw.value));
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
export default (posts: Post[], base: BASE) => {
    const config_path: string = `./${base}/config.yml`;
    const dist: string = `./cache/${base}/config.ts`;

    const rawConfig: Ref<RawConfig> = readYML(config_path);

    watchEffect(() => {
        const config: Config = { ...rawConfig.value, nav: [] };
        config.nav = parse_nav(rawConfig.value.nav, posts, base);

        const cache =
            'import type { Config } from "@script/types";\n' +
            `const config: Config = ${JSON.stringify(config)};\n` +
            "export default config;\n";

        fs.outputFileSync(dist, cache);
        console.log(`[Updated] ${dist}`);
    });
};
