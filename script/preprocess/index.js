/**
 * @fileoverview 在 vite 运行前预处理文件
 */

import parseMd from "./parse-md";
import cacheMeta from "./cache-meta";
import cacheComps from "./cache-comps";
import cacheConfig from "./cache-config";
import hmr from "./hmr";

const NOTE_BASE = "./note";

const parse_fn = (path, cache_dir) => async () => {
    const data = await parseMd(path);
    await cacheMeta(data, cache_dir + "/meta.js");
    await cacheComps(data, cache_dir + "/comps.js");
    await cacheConfig(data, path + "/config.yml", cache_dir + "/config.js", "note");
};

hmr(NOTE_BASE, parse_fn(NOTE_BASE, "./tmp/note"));
