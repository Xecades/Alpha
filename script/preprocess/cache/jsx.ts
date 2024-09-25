import fs from "fs-extra";
import camelCase from "camelcase";
import injection from "../utils/injection";
import { Post } from "../utils/post";
import { watchEffect } from "vue";

import type { BASE } from "../../types";

const injectFontAwesome = (html: string): string => {
    const iconRegex: RegExp =
        /<font-awesome-icon class="icon" icon="(.*?)" \/>/gs;
    const to_module_name = (icon: string) => camelCase("fa-" + icon);

    const icons = new Set<string>();

    let match;
    while ((match = iconRegex.exec(html))) {
        icons.add(to_module_name(match[1]));
    }

    if (icons.size === 0) return "";

    let res: string =
        'import { library } from "@fortawesome/fontawesome-svg-core";\n';
    for (const icon of icons) {
        res += `import { ${icon} } from "@fortawesome/free-solid-svg-icons";\n`;
    }
    res += "library.add(" + Array.from(icons).join(", ") + ");\n";

    return res;
};

/**
 * Cache parsed HTML and save them as TSXs in `./cache/${base}/posts/*`.
 *
 * @note This module caches Vue components as TSX.
 *
 * @param posts - Parsed post objects.
 * @param base - The base name for markdown caching.
 */
export default (posts: Post[], base: BASE) => {
    for (const post of posts) {
        watchEffect(() => {
            const dist: string = post.tsx_pathname;

            const cache: string =
                injection() +
                injectFontAwesome(post.html) +
                `import type { JSX } from "vue/jsx-runtime";\n` +
                `const jsx: JSX.Element = (<>${post.html}</>)\n` +
                `export default jsx;\n`;

            fs.outputFileSync(dist, cache);

            console.log(`[Updated] ./${post.tsx_pathname}`);
        });
    }
};
