/**
 * @description 提取 Markdown 文件的目录，需要支持 LaTeX 等
 *
 * @note 仅支持 ATX headings：https://github.github.com/gfm/#atx-headings
 * @note 判定为标题的要求：
 *       - 以 # 开头
 *       - # 后面有一个空格
 *       - 不在代码块中
 *
 * @todo 以及锚点跳转：通过 transliteration 实现
 */

import md from "../md-title";

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

    headers = headers.map((h) => {
        let nbsp_idx = h.indexOf(" ");
        let level = h.slice(0, nbsp_idx).length;
        let title = h.slice(nbsp_idx + 1).trim();

        title = md.renderInline(title);

        return {
            level,
            title,
        };
    });

    console.log(headers);
    return {};
}

export default toc;

/*
平铺结构：x
[
    { "level": 2, "title": "二级标题" },
    { "level": 3, "title": "三级标题" },
    { "level": 4, "title": "四级标题" },
    { "level": 5, "title": "五级标题" },
    { "level": 6, "title": "六级标题" },
    { "level": 2, "title": "但是这里应该被判定为标题" },  <-+
    { "level": 4, "title": "这里也是" }                <-+- 这里第二项是否需要把 level 改为 3？x
]

Preorder Traverse 一下
树形结构：√
Indent?
[
    {
        "level": 2,
        "title": "二级标题",
        "children": [
            {
                "level": 3,
                "title": "三级标题",
                "children": [
                    {
                        "level": 4,
                        "title": "四级标题",
                        "children": [
                            {
                                "level": 5,
                                "title": "五级标题",
                                "children": [
                                    {
                                        "level": 6,
                                        "title": "六级标题"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "level": 2,
        "title": "但是这里应该被判定为标题",
        "children": [
            {
                "level": 4,
                "title": "这里也是"
            }
        ]
    }
]
*/
