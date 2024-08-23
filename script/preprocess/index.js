/**
 * @fileoverview 在 vite 运行前预处理文件
 */

import parseMd from "./parse-md";
import cacheMeta from "./cache-meta";
import cacheComps from "./cache-comps";

const NOTE_BASE = "./note";
const notes = await parseMd(NOTE_BASE);

const NOTE_CACHE_COMP = "./cache/note/comps.js";
const NOTE_CACHE_META = "./cache/note/meta.js";
await cacheComps(notes, NOTE_CACHE_COMP);
await cacheMeta(notes, NOTE_CACHE_META);

export { notes };
