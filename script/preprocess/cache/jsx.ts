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

type Dependencies = typeof Post.prototype.dependencies;
const injectDependencies = (dep: Dependencies): string => {
    let res: string = "";

    for (const { src, name } of dep) {
        res += `import ${name} from "${src}";\n`;
    }

    return res;
};

type Awaits = typeof Post.prototype.awaits;
const injectAwaits = async (awaits: Awaits): Promise<string> => {
    let res: string = "";

    for (const { target, name } of awaits) {
        res += `const ${name} = ${await target()};\n`;
    }

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
        watchEffect(async () => {
            const dist: string = post.tsx_pathname;

            const cache: string =
                injection() +
                injectFontAwesome(post.html) +
                injectDependencies(post.dependencies) +
                (await injectAwaits(post.awaits)) +
                `export default () => (<>\n${post.html}</>);\n`;

            fs.outputFileSync(dist, cache);

            console.log(`[Updated] ./${post.tsx_pathname}`);
        });
    }
};
