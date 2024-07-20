import _raw_config from "@/note/config.yml";

function _parseNav(nav) {
    function dfs(node) {
        let ret = [];
        for (const item of node) {
            let key = Object.keys(item)[0];
            let val = item[key];
            switch (typeof val) {
                case "string":
                    ret.push({ title: key, link: val, child: [] });
                    break;
                case "object":
                    let split = key.split("@");
                    let title = split[0].trim();
                    let link = split[1].trim();
                    ret.push({ title, link, child: dfs(val) });
                    break;
            }
        }
        return ret;
    }
    return { title: "", link: "", child: dfs(nav) };
}

/**
 * Convert note path to an array of path segments.
 *
 * @param {string} path - The path to be parsed.
 * @returns {Array<string>|boolean} - An array of path segments if path valid, otherwise false.
 * @example
 * parsePath("/note/cs/c/intro") // ["cs", "c", "intro"]
 * parsePath("/foo") // false
 */
function parsePath(path) {
    let p = /^\/note\/(.*)\/?$/.exec(path);
    return p === null ? false : p[1].split("/");
}

const _getNodeBy_gen = (fn) => (n, v) => n.child.find((x) => fn(x) === v);
const getNodeBy = {
    title: _getNodeBy_gen((x) => x.title),
    link: _getNodeBy_gen((x) => x.link),
    fn: _getNodeBy_gen,
};

const config = {};
config.site_name = _raw_config.site_name;
config.root = _parseNav(_raw_config.nav);

export { config, parsePath, getNodeBy };

// {
//     "site_name": "笔记本",
//     "nav": {
//         "title": "",
//         "link": "",
//         "child": [
//             {
//                 "title": "计算机科学",
//                 "link": "cs",
//                 "child": [
//                     {
//                         "title": "C 语言",
//                         "link": "c",
//                         "child": [
//                             {
//                                 "title": "C 语言介绍",
//                                 "link": "intro",
//                                 "child": []
//                             },
//                             {
//                                 "title": "代码片段",
//                                 "link": "snippets",
//                                 "child": []
//                             }
//                         ]
//                     },
//                     {
//                         "title": "计算机逻辑设计基础课程笔记",
//                         "link": "cldf",
//                         "child": []
//                     },
//                     { "title": "数据结构课程笔记", "link": "fds", "child": [] }
//                 ]
//             },
//             {
//                 "title": "数学",
//                 "link": "math",
//                 "child": [
//                     { "title": "线性代数课程笔记", "link": "la", "child": [] },
//                     { "title": "离散数学", "link": "dm", "child": [] }
//                 ]
//             }
//         ]
//     }
// }
