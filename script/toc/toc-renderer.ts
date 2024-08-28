import MarkdownIt from "markdown-it";

// @ts-ignore
import MarkdownItWrapper from "../markdown-it-wrapper";
import { render_inline } from "../../src/assets/js/latex";

const md = new MarkdownIt();

md.disable(["link", "image", "linkify", "newline"]);

// 这里需要先把 LaTeX 渲染出来，否则还需要编译一遍 Vue Components
md.use(MarkdownItWrapper, {
    type: "inline",
    name: "katex_inline",
    marker: "$",
    renderer: render_inline,
});

export default md;
