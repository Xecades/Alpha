import MarkdownIt from "markdown-it";
import MarkdownItWrapper from "@/../script/markdown-it-wrapper";

const md = new MarkdownIt();

// TODO: 不要 disable，而是只显示文字
md.disable(["link"]);

md.use(MarkdownItWrapper, {
    type: "inline",
    name: "katex_inline",
    marker: "$",
    renderer: (c) => `<inline-math data="${encodeURI(c)}"></inline-math>`,
});

export default md;
