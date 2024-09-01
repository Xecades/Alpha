import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { RouterLink } from "vue-router";

import type { NavNode } from "script/preprocess/types";
import type { JSX } from "vue/jsx-runtime";

/**
 * Render the leftbar navigation.
 * 
 * @param node - The nav node to render
 * @param is_root - Whether the node is the root node. Default is `false`
 * @returns Rendered nav node
 */
export const render_list = (node: NavNode, is_root: boolean = false): JSX.Element => {
    let { title, children, link } = node;
    link = "/" + link;

    const text_comp: JSX.Element = <span class="text">{title}</span>;
    const icon_comp: JSX.Element = <span class="sign"><FontAwesomeIcon class="icon" icon="fa-solid fa-caret-right" /></span>;
    const title_comp: JSX.Element = <RouterLink to={link} class="title cursor">{icon_comp}{text_comp}</RouterLink>;

    // If it is a leaf node, mark and return
    if (children.length === 0) {
        (title_comp.props as any).leaf = true;
        return title_comp;
    }

    let child_comps: JSX.Element[] = children.map(child => <li class="child">{render_list(child)}</li>);
    let children_comp: JSX.Element = <ul class="children">{child_comps}</ul>;

    // If it is the root node, no need to add a title
    if (is_root) {
        return children_comp;
    }

    return <>{[title_comp, children_comp]}</>;
};
