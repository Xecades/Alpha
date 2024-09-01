/**
 * @fileoverview 在 vite 运行前预处理文件
 */

import parseMd from "./parse-md";
import cacheMeta from "./cache-meta";
import cacheComps from "./cache-comps";
import cacheConfig from "./cache-config";
import cacheSearch from "./cache-search";
import hmr from "./hmr";

const NOTE_BASE = "./note";

const parse_fn = (path: string, cache_dir: string) => async () => {
    const data = await parseMd(path);
    await cacheMeta(data, cache_dir + "/meta.json");
    await cacheComps(data, cache_dir + "/comps.js", cache_dir + "/posts");
    await cacheSearch(data, cache_dir + "/search.js");
    await cacheConfig(
        data,
        path + "/config.yml",
        cache_dir + "/config.json",
        "note"
    );
};

hmr(NOTE_BASE, parse_fn(NOTE_BASE, "./cache/note"));
