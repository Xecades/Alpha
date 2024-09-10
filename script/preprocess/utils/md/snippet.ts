type Snippet = (slot: string, argv: string[]) => string;

const snippets: Record<string, Snippet> = {
    quote: (slot: string, argv: string[]): string => {
        console.assert(
            argv.length === 0,
            "`quote` snippet takes no arguments."
        );

        return `<snippet quote>${slot}</snippet>`;
    },
};

/**
 * Handle `:::` block snippet.
 *
 * @note Syntax:
 *      ```
 *      ::: <name> [arg1 [arg2 [...]]]
 *      <content>
 *      :::
 *      ```
 *
 * @param raw - Inner content of the block snippet
 * @returns Parsed HTML string
 * 
 * @todo 传参方式，引号、转义如何处理
 */
export const blockSnippet = (raw: string): string => {
    raw = raw.trim();

    const [cmd, ...argv] = raw.split("\n")[0].split(" ");
    const slot: string = raw.split("\n").slice(1).join("\n");

    const handler: Snippet = snippets[cmd];

    if (handler === undefined) {
        console.error(`[!] Unknown snippet: ${cmd}`);
        return "<p>:::" + raw + ":::<p>";
    }

    return handler(slot, argv);
};
