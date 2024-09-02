import DomHandler from "domhandler";
import DomSerializer from "dom-serializer";
import { Parser } from "htmlparser2";

import type { HTMLString } from "../../types";
import type { DomSerializerOptions } from "dom-serializer";

/**
 * Split HTML string into HTML string array.
 *
 * @note Comments and empty strings are ignored.
 *
 * @param html - HTML string
 * @returns HTML string array
 *
 * @see https://github.com/fb55/domhandler
 * @see https://github.com/cheeriojs/dom-serializer
 */
export default (html: HTMLString): HTMLString[] => {
    const res: HTMLString[] = [];
    const comment_pattern: RegExp = /<!--.*?-->/gs;

    const options: DomSerializerOptions = {
        selfClosingTags: true,
        encodeEntities: "utf8",
    };

    const handler = new DomHandler((error, dom) => {
        if (error) {
            throw error;
        }

        for (const node of dom) {
            const s: string = DomSerializer(node, options).trim();

            if (s !== "") {
                res.push(s);
            }
        }
    });

    const parser = new Parser(handler);

    parser.write(html.replaceAll(comment_pattern, ""));
    parser.end();

    return res;
};
