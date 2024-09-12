import type { HTMLString } from "../../../types";

/**
 * Split JSX string into JSX string array.
 *
 * @note Comments and empty strings are ignored.
 *
 * @param html - JSX string
 * @returns JSX string array
 */
export default (html: HTMLString): HTMLString[] => {
    const res: HTMLString[] = [];

    const patterns = {
        /** Matches <!-- text --> */
        comment: /^<!--.*?-->$/gm,

        /** Matches <tag> */
        start: /^<[^<>\/]*>$/gm,

        /** Matches </tag> */
        end: /^<\/[^<>]*>$/gm,
    };

    // Syntax like `text\` will start a new line, delete it.
    html = html.replaceAll("<br />\n", "<br />");

    const fragments: HTMLString[] = html.split("\n");

    for (let i = 0; i < fragments.length; i++) {
        // Ignore comments
        if (patterns.comment.test(fragments[i])) {
            continue;
        }

        // Encounter start tag, find the corresponding end tag
        if (patterns.start.test(fragments[i])) {
            let j = i + 1;
            let stack = 1;

            while (stack > 0 && j < fragments.length) {
                if (patterns.start.test(fragments[j])) {
                    stack++;
                } else if (patterns.end.test(fragments[j])) {
                    stack--;
                }

                j++;
            }

            res.push(fragments.slice(i, j).join("\n"));
            i = j - 1;

            continue;
        }

        // Normal tag
        res.push(fragments[i]);
    }

    return res;
};
