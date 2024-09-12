const delim: RegExp = /<p>@ (.*?)<\/p>/g;
const PLACEHOLDER: string = "<TAB_PLACEHOLDER_@@@>";

/**
 * Parse `@@@` tab block.
 *
 * @param raw - Rendered content
 * @returns Translated Vue component
 */
export default (raw: string): string => {
    const titles: string[] = [];

    raw = raw.replace(delim, (_, t) => {
        titles.push(t.trim());
        return PLACEHOLDER;
    });

    const content: string[] = raw.split(PLACEHOLDER).map((v) => v.trim());
    console.assert(content[0] === "", "[!] No content before first tab block");
    content.shift();

    console.assert(
        content.length === titles.length,
        "[!] Content and title count mismatch"
    );

    let tabs: string = "";

    titles.forEach((title, idx) => {
        const t = title.replaceAll("\n", "");
        const c = content[idx].replaceAll("\n", "");

        if (idx !== 0) tabs += ", ";
        tabs += `{ "title": <>${t}</>, "content": <>${c}</> }`;
    });

    return `<Tab data={[${tabs}]}></Tab>`;
};
