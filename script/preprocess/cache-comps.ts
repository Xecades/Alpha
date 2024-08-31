import fs from "fs-extra";
import path from "path";
import type { ParsedData } from "./parse-md";

/**
 * Convert a markdown file path to a Vue component path
 *
 * @param pathname - Path to local markdown file
 * @param dist - The directory where the Vue components are stored
 * @returns - The path to the Vue component
 */
const pathname_to_cache = (pathname: string, dist: string) => {
    let res = pathname.replace(/^.+?\//, "");

    console.assert(res.endsWith(".md"));
    res = path.join(dist, res.replace(/\.md$/, ".vue"));
    return res;
};

/**
 * Cache Vue components
 *
 * @param data - Parsed data
 * @param dist - Path to where the cached js module is stored
 * @param vue_dist - Path to where the Vue components are stored
 */
export default async (data: ParsedData[], dist: string, vue_dist: string) => {
    let mod_cache = "export default {\n";

    for (const item of data) {
        let cache = `<script setup>import {onMounted} from "vue";const emit = defineEmits(['mounted']);onMounted(()=>{emit("mounted")})</script><template>${item.html}</template>`;
        let target = pathname_to_cache(item.pathname, vue_dist);

        mod_cache += `"${item.pathname}": () => import("@${target}"),\n`;
        await fs.outputFile(target, cache);
    }
    mod_cache += "}";

    await fs.outputFile(dist, mod_cache);
};
