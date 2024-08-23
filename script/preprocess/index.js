/**
 * @fileoverview 在 vite 运行前预处理文件
 */

import chokidar from "chokidar";

import parseMd from "./parse-md";
import cacheMeta from "./cache-meta";
import cacheComps from "./cache-comps";

const NOTE_BASE = "./note";

const parse = async (path, cache_dir) => {
    const data = await parseMd(path);
    await cacheMeta(data, cache_dir + "/meta.js");
    await cacheComps(data, cache_dir + "/comps.js");
};

/**
 * Handle hot update
 * @see https://github.com/paulmillr/chokidar
 */
let cb_active = false;
const chokidar_cb = async () => {
    if (cb_active) return;

    cb_active = true;
    await parse(NOTE_BASE, "./cache/note");
    cb_active = false;
};

chokidar.watch(NOTE_BASE).on("change", chokidar_cb);
await chokidar_cb();
