import MarkdownIt from "markdown-it";

import MarkdownItWrapper from "@/../script/markdown-it-wrapper";
import { render_inline } from "./latex";

const md = new MarkdownIt();

md.disable(["link", "image", "linkify", "newline"]);

md.use(MarkdownItWrapper, {
    type: "inline",
    name: "katex_inline",
    marker: "$",
    renderer: render_inline,
});

export default md;
