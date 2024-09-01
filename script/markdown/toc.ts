import MarkdownIt from "markdown-it";

// @ts-ignore
import MarkdownItWrapper from "../markdown-it-wrapper";
import { render_inline } from "../../src/assets/js/latex";

/**
 * Get a markdown-it instance with inline KaTeX support, which is used for TOC rendering.
 *
 * @returns MarkdownIt instance
 */
export default (): MarkdownIt => {
    return (
        new MarkdownIt()
            .disable(["link", "image", "linkify", "newline"])

            // Pre-render static LaTeX
            .use(MarkdownItWrapper, {
                type: "inline",
                name: "katex_inline",
                marker: "$",
                renderer: render_inline,
            })
    );
};
