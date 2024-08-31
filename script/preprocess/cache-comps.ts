import fs from "fs-extra";
import type { ParsedData } from "./parse-md";

export default async (data: ParsedData[], dist: string) => {
    let cache =
        'import { createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, createStaticVNode as _createStaticVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, withCtx as _withCtx } from "vue"\n';
    cache += "const cache = {}\n";

    for (const item of data) {
        cache += `// ${item.pathname}\n`;
        cache += `cache["${item.pathname}"] = (components) => {\n`;
        cache += item.vue;
        cache += "return { components, render }\n";
        cache += "\n}\n";
    }
    cache += "\nexport default cache\n";

    await fs.outputFile(dist, cache);
};
