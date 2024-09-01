/**
 * 从 html 中提取纯文本，用于 fuse.js 搜索
 * @see https://www.npmjs.com/package/innertext
 */

// @ts-ignore
import innerText from "innertext";

/** @todo 改 MD 渲染的时候记得检查这里 */
const inline_math_regex = /<InlineMath data=".*?"><\/InlineMath>/g;
const block_math_regex = /<BlockMath data=".*?"><\/BlockMath>/g;
const anchor_regex = / <a class="cursor header-anchor" href="#t.*?">¶<\/a>/g;

export default (html: string): string => {
    // Sanitize math tags
    html = html.replaceAll(inline_math_regex, "[公式]");
    html = html.replaceAll(block_math_regex, "[公式]");

    // Sanitize header anchors
    html = html.replaceAll(anchor_regex, "");

    return innerText(html);
};
