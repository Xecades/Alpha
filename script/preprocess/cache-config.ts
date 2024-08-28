import fs from "fs-extra";
import yaml from "yaml";
import type { ParsedData } from "./parse-md";

/**
 * @fileoverview 预处理 config.yml 文件
 *
 * @note nav 处理：
 *   - 要有标题、链接
 *   - { title: String, name: String, link: String, pathname: String, children: [] }
 *   + 先处理第一层，得到 Category 信息
 *   + 对每个 Category，递归处理 children
 *   + 最终得到的是 Array
 */

type NavRaw = Record<string, any>;

interface ConfigYML {
    nav: NavRaw[];
}

export interface Nav {
    title: string;
    name: string;
    link: string;
    children: Nav[];
}

export interface Config {
    nav: Nav[];
}

const readYML = async (path: string) => {
    const raw = await fs.readFile(path, "utf-8");
    return yaml.parse(raw) as ConfigYML;
};

const parse_nav = (
    nav: NavRaw[],
    data: ParsedData[],
    prefix: string
): Nav[] => {
    const name_of = (o: object) => Object.keys(o)[0];
    const title_of = (p: string) =>
        data.filter((d) => d.pathname === p)[0].attr.title;

    const traverse = (branch: object | string, path: string): Nav => {
        if (typeof branch === "string") {
            let name = branch;
            path += "/" + name;

            let pathname = path + ".md";

            let res: Nav = {
                title: title_of(pathname),
                name: name,
                link: path,
                children: [],
            };
            return res;
        }

        let name = name_of(branch);
        path += "/" + name;

        let pathname = path + "/index.md";

        let res: Nav = {
            title: title_of(pathname),
            name: name,
            link: path,
            children: [],
        };

        let children: NavRaw[] = (branch as any)[name];
        for (let child of children) {
            res.children.push(traverse(child, path));
        }

        return res;
    };

    let res: Nav[] = [];

    for (let branch of nav) {
        let tree = traverse(branch, prefix);
        res.push(tree);
    }

    return res;
};

export default async (
    data: ParsedData[],
    config_path: string,
    dist: string,
    prefix: string
) => {
    const config = await readYML(config_path);

    config.nav = parse_nav(config.nav, data, prefix);

    await fs.outputJSON(dist, config);
};
