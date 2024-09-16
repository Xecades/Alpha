// @ts-ignore
import MarkdownItTaskCheckbox from "markdown-it-task-checkbox";

import type MarkdownIt from "markdown-it";

/**
 * Parse task list syntax `- [ ]`.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    /**
     * @name markdown-it-task-checkbox
     * @see https://github.com/linsir/markdown-it-task-checkbox
     */
    md.use(MarkdownItTaskCheckbox, {
        divWrap: false,
        divClass: "checkbox",
        idPrefix: "cbx_",
        ulClass: "task-list",
        liClass: "task-list-item",
    });
};
