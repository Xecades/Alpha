/**
 * @description Processes [wp]normal markdown[wp]
 * @example
 *  - $text$
 *  - $$text$$
 *  - ^text^
 */

// same as UNESCAPE_MD_RE plus a space
const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;

const is_substr_at = (str, pos, substr) => {
    if (pos + substr.length > str.length) return false;
    return str.substr(pos, substr.length) === substr;
};

const wrapper = (args) => (state, silent) => {
    const { marker, tag, allowSpaces, allowNewlines } = args;

    const posMax = state.posMax;
    const start = state.pos;

    if (!is_substr_at(state.src, start, marker)) return false;
    if (silent) return false;
    if (start + 2 >= posMax) return false;

    state.pos = start + 1;
    let found = false;

    while (state.pos < posMax) {
        if (is_substr_at(state.src, state.pos, marker)) {
            found = true;
            break;
        }

        state.md.inline.skipToken(state);
    }

    if (!found || start + 1 === state.pos) {
        state.pos = start;
        return false;
    }

    const content = state.src.slice(start + 1, state.pos);

    // If doesn't allow spaces
    if (!allowSpaces && content.includes(" ")) {
        state.pos = start;
        return false;
    }

    // If doesn't allow newlines
    if (!allowNewlines && content.includes("\n")) {
        state.pos = start;
        return false;
    }

    // found!
    state.posMax = state.pos;
    state.pos = start + 1;

    const token_so = state.push(tag + "_open", tag, 1);
    token_so.markup = marker;

    const token_t = state.push("text", "", 0);
    token_t.content = content.replace(UNESCAPE_RE, "$1");

    const token_sc = state.push(tag + "_close", tag, -1);
    token_sc.markup = marker;

    state.pos = state.posMax + 1;
    state.posMax = posMax;
    return true;
};

export default function wrapper_plugin(md, args) {
    md.inline.ruler.after("emphasis", "sup", wrapper(args));
}
