import katex from "katex";
import type { KatexOptions } from "katex";

const _render = (options: KatexOptions) => (raw: string) => {
    return raw;
    // try {
    //     return katex.renderToString(raw, options);
    // } catch (error) {
    //     console.error(error);
    //     return raw;
    // }
};

const render_inline = _render({ displayMode: false, throwOnError: true });
const render_block = _render({ displayMode: true, throwOnError: true });
const render = (raw: string, opts: KatexOptions) => _render(opts)(raw);

export { render, render_inline, render_block };
