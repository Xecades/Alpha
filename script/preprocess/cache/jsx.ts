import fs from "fs-extra";
import camelCase from "camelcase";
import injection from "../utils/injection";
import { Post } from "../utils/post";

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
export default async (posts: Post[], base: BASE) => {
    for (const post of posts) {
        const dist: string = post.tsx_pathname;
        let cache: string = injection();

        cache += injectFontAwesome(post.html);
        cache += `import type { JSX } from "vue/jsx-runtime";\n`;
        cache += `const jsx: JSX.Element = (<>${post.html}</>)\n`;
        cache += `export default jsx;\n`;

        await fs.outputFile(dist, cache);
    }
};
