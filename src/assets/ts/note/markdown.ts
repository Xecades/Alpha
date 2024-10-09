import { useRouter } from "vue-router";
import config from "@cache/note/config";

import { assertType, type NavNode, type RouteMeta } from "@script/types";

/**
 * Locate the target node in the navigation tree recursively.
 *
 * @param target - The target path
 * @returns The target node
 */
export const locate_node = (target: string): NavNode | undefined => {
    const nodes: NavNode[] = config.nav;

    // If the target is the /note or /blog page, return a dummy root node.
    if (/^\/(note|blog)$/.test(target)) {
        return { title: "", name: "", link: "", children: nodes };
    }

    const dfs = (nodes: NavNode[]): NavNode | undefined => {
        for (const node of nodes) {
            if ("/" + node.link === target) return node;

            const result = dfs(node.children);
            if (result) return result;
        }
    };

    return dfs(nodes);
};

/**
 * Get the route of a link.
 *
 * @param link - The link of the route
 * @returns The route of the link
 */
export const route_of = (link: string) => {
    const routes = useRouter().getRoutes();
    return routes.find((route) => route.path === link)!;
};

/**
 * Get the metadata of a link.
 *
 * @param link - The link of the route
 * @returns Meta of the link
 */
export const meta_of = (link: string | NavNode): RouteMeta => {
    if (typeof link === "string")
        return assertType<RouteMeta>(route_of(link).meta);
    return meta_of("/" + link.link);
};

/**
 * Get the leaf index nodes of a navigation tree.
 *
 * @param root - The root node
 * @returns The leaf index nodes
 */
export const leaf_nodes = (root: NavNode): NavNode[] => {
    // If some children are leaf nodes, return the root node
    if (root.children.some((node) => node.children.length === 0)) {
        return [root];
    }

    return root.children.flatMap(leaf_nodes);
};
