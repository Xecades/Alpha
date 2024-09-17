import fs from "fs-extra";
import path from "path";
import camelCase from "camelcase";
import injection from "../utils/injection";

import type { BASE, ParsedMarkdown } from "../../types";

/**
 * Convert local markdown file path to JSX path.
 *
 * @param pathname - Path to local markdown file
 * @param dist - The directory where the JSX are stored
 * @returns - The path to JSX
 */
export const to_JSX_path = (pathname: string, base: BASE): string => {
    console.assert(
        pathname.endsWith(".md"),
        `Invalid markdown file: ${pathname}`
    );

    const dist = `./cache/${base}/posts`;

    let res = pathname.replace(/^.+?\//, "");
    res = res.replace(/\.md$/, ".jsx");
    res = path.join(dist, res);

    return res;
};

const injectFontAwesome = (html: string): string => {
    const iconRegex: RegExp = /<font-awesome-icon class="icon" icon="(.*?)" \/>/gs;
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
 * Cache parsed HTML and save them as JSXs in `./cache/${base}/posts/*`.
 *
 * @note This module caches Vue components as JSX.
 *
 * @param parsed - Parsed markdown data.
 * @param base - The base name for markdown caching.
 */
export default async (parsed: ParsedMarkdown[], base: BASE) => {
    for (const item of parsed) {
        const dist: string = to_JSX_path(item.pathname, base);
        let cache: string = injection();

        // Remove comments from the JSX content.
        const html: string = item.html.replace(/<!--.*?-->/g, "");

        cache += injectFontAwesome(html);
        cache += `export default <>${html}</>`;

        await fs.outputFile(dist, cache);
    }
};
