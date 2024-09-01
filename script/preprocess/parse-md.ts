import fs from "fs/promises";
import fm from "front-matter";

import md from "../markdown";
import tocRender from "../toc";
import traverse from "./traverse";
import vueCompiler from "./vue-compiler";
import extractText from "./extract-text";

import type { PathnameDirent } from "./traverse";
import type { Header } from "../toc";

export interface FMAttr {
    title: string;
}

export interface ParsedData extends PathnameDirent {
    attr: FMAttr;
    raw: string;
    toc: Header[];
    html: string;
    text: string;
    vue: string;
}

export default async (src: string) => {
    const ret = (await traverse(src, (x) => x.endsWith(".md"))) as ParsedData[];

    for (let i = 0; i < ret.length; i++) {
        const { pathname, dirent } = ret[i];
        const content: string = await fs.readFile(pathname, "utf-8");

        /**
         * Phase 1: 解析 front-matter
         */
        const { attributes: attr, body: raw } = fm<FMAttr>(content);
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
        ret[i].html = html.replace(/<!--.*?-->/sg, "");

        /**
         * Phase 4: 提取纯文本
         */
        const text = extractText(html);
        ret[i].text = text;

        /**
         * Phase 5: 编译 Vue Components
         */
        const vue = vueCompiler(html, dirent.name);
        ret[i].vue = vue;
    }

    return ret;
};
