/**
 * @description 提取 Markdown 文件的目录，需要支持 LaTeX 等
 *
 * @note 仅支持 ATX headings：https://github.github.com/gfm/#atx-headings
 * @note 判定为标题的要求：
 *       - 以 # 开头
 *       - # 后面有一个空格
 *       - 不在代码块中
 *
 * @note Permalink 格式：
 *       - 第一个为 t
 *       - 后面的以此类推为 t-2, t-3, ...
 */

import md from "../toc-renderer";

function toc(text) {
    const reg = /^ *#{1,6} /s;

    text = text.split("\n");
    let headers = [];

    let is_in_cb = false; // 是否在代码块中

    for (let i = 0; i < text.length; i++) {
        if (text[i].startsWith("```")) {
            is_in_cb = !is_in_cb;
        }

        if (!is_in_cb && reg.test(text[i])) {
            headers.push(text[i].trim());
        }
    }

    headers = headers.map((h, idx) => {
        let nbsp_idx = h.indexOf(" ");
        let level = h.slice(0, nbsp_idx).length;
        let title = h.slice(nbsp_idx + 1).trim();
        let link = idx == 0 ? "t" : `t-${idx + 1}`;

        title = md.renderInline(title);

        return { level, title, link };
    });

    console.log(headers);
    return headers;
}

export default toc;
