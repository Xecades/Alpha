/**
 * 将 html 字符串编译为 Vue 组件
 * @see https://github.com/hmsk/vite-plugin-markdown/blob/main/src/index.ts#L134
 * @see https://github.com/vuejs/core/blob/main/packages/compiler-sfc/__tests__/compileTemplate.spec.ts
 */
import { render as DomSerializer } from "dom-serializer";
import { parseDOM } from "htmlparser2";
import { Element, type ChildNode } from "domhandler";
import { compileTemplate } from "vue/compiler-sfc";

export default (html: string, filename: string) => {
    const ast: ChildNode[] = parseDOM(html);

    // Top-level <pre> tags become <pre v-pre>
    ast.forEach((node: ChildNode) => {
        if (node instanceof Element) {
            if (["pre", "code"].includes(node.tagName)) {
                node.attribs["v-pre"] = "true";
            }
        }
    });

    // Any <code> tag becomes <code v-pre> excepting under `<pre>`
    const markCodeAsPre = (node: ChildNode) => {
        if (node instanceof Element) {
            if (node.tagName === "code") node.attribs["v-pre"] = "true";
            if (node.childNodes.length > 0)
                node.childNodes.forEach(markCodeAsPre);
        }
    };
    ast.forEach(markCodeAsPre);

    let { code } = compileTemplate({
        source: DomSerializer(ast),
        id: filename,
        filename,
    });

    code = code.replace("export function render(", `function render(`);
    code = code.split("\n").slice(1).join("\n").trim();

    return code;
};
