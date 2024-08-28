/**
 * 从 html 中提取纯文本，用于 fuse.js 搜索
 * @see https://www.npmjs.com/package/innertext
 */

// @ts-ignore
import innerText from "innertext";

const inline_math_regex = /<inline-math data=".*?"><\/inline-math>/g;
const block_math_regex = /<block-math data=".*?"><\/block-math>/g;
const anchor_regex = / <a class="cursor header-anchor" href="#t.*?">¶<\/a>/g;

export default (html: string): string => {
    // Sanitize math tags
    html = html.replaceAll(inline_math_regex, "[公式]");
    html = html.replaceAll(block_math_regex, "[公式]");

    // Sanitize header anchors
    html = html.replaceAll(anchor_regex, "");

    return innerText(html);
};
