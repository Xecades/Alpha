import fs from "fs-extra";
import yaml from "yaml";

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

const readYML = async (path) => {
    const raw = await fs.readFile(path, "utf-8");
    return yaml.parse(raw);
};

const parse_nav = (nav, data, prefix) => {
    const name_of = (o) => Object.keys(o)[0];
    const title_of = (p) => data.filter((d) => d.pathname === p)[0].attr.title;
    const traverse = (branch, path) => {
        if (typeof branch === "string") {
            let name = branch;
            path += "/" + name;

            let pathname = path + ".md";

            let res = {
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

        let res = {
            title: title_of(pathname),
            name: name,
            link: path,
            children: [],
        };

        let children = branch[name];
        for (let child of children) {
            res.children.push(traverse(child, path));
        }

        return res;
    };

    let res = [];

    for (let branch of nav) {
        let tree = traverse(branch, prefix);
        res.push(tree);
    }

    return res;
};

export default async (data, config_path, dist, prefix) => {
    const config = await readYML(config_path);

    config.nav = parse_nav(config.nav, data, prefix);

    await fs.outputJSON(dist, config);
};
