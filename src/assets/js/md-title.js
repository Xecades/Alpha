import MarkdownIt from "markdown-it";
import MarkdownItWrapper from "@/../script/markdown-it-wrapper";

const md = new MarkdownIt();

md.disable(["link", "image", "linkify", "newline"]);

md.use(MarkdownItWrapper, {
    type: "inline",
    name: "katex_inline",
    marker: "$",
    renderer: (c) => `<inline-math data="${encodeURI(c)}"></inline-math>`,
});

export default md;
