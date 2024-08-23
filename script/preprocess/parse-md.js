import fs from "fs/promises";
import fm from "front-matter";

import traverse from "./traverse";
import vueCompiler from "./vue-compiler";
import md from "../markdown";
import tocRender from "../toc";

export default async (src) => {
    const ret = await traverse(src, (x) => x.endsWith(".md"));

    for (let i = 0; i < ret.length; i++) {
        const { pathname, dirent } = ret[i];
        const content = await fs.readFile(pathname, "utf-8");

        /**
         * Phase 1: 解析 front-matter
         */
        const { attributes: attr, body: raw } = fm(content);
        ret[i].attr = attr;
        ret[i].raw = raw;

        /**
         * Phase 2: 生成 ToC
         */
        const toc = tocRender(raw);
        ret[i].toc = toc;

        /**
         * Phase 3: 渲染 markdown
         */
        const html = md.render(raw);
        ret[i].html = html;

        /**
         * Phase 4: 编译 Vue Components
         */
        const vue = vueCompiler(html, dirent.name);
        ret[i].vue = vue;
    }

    return ret;
};
