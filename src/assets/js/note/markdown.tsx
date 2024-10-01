import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import AnimateHeight from "vue-animate-height";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import locale_zhcn from "dayjs/locale/zh-cn";

import type { NavNode, RouteMeta } from "@script/types";
import type { JSX } from "vue/jsx-runtime";
import type { Ref, RenderFunction } from "vue";
import type { Dayjs } from "dayjs";

dayjs.extend(relativeTime);
dayjs.locale(locale_zhcn);

/**
 * Render the markdown index navigation.
 *
 * @param root - The nav node to render
 * @returns Rendered nav node
 */
export const render_index = (root: NavNode): RenderFunction => {
    const expanded: Ref<Map<string, boolean>> = ref(new Map());

    // Expand the first level, unless it's /note or /blog (i.e. there's a dummy root)
    const is_index = (node: NavNode): boolean => node.children.length > 0;
    if (root.link !== "") {
        root.children.filter(is_index).forEach((node) => {
            expanded.value.set("/" + node.link, true);
        });
    } else {
        let firstChild: NavNode | undefined = root.children.find(is_index);
        if (firstChild) {
            expanded.value.set("/" + firstChild.link, true);
        }
    }

    // For each node in the first level, expand it's first nodes until reaching a leaf
    root.children.filter(is_index).forEach((node) => {
        let child: NavNode | undefined = node.children.find(is_index);
        while (child && child.children.length > 0) {
            expanded.value.set("/" + child.link, true);
            child = child.children.find(is_index);
        }
    });

    // Render recursively
    const dfs = (node: NavNode, is_root: boolean = false): JSX.Element => {
        let { title, children, link } = node;

        // Add a leading slash to the link to make it valid
        link = "/" + link;

        let text_comp: JSX.Element = (
            <span class="text">
                {children.length === 0 ? (
                    <span class="icon">
                        <FontAwesomeIcon icon={["fas", "file"]} />
                    </span>
                ) : (
                    <></>
                )}

                <RouterLink to={link} class="cursor">
                    {title}
                </RouterLink>
            </span>
        );

        // If it is a leaf node, return link directly
        if (children.length === 0) {
            const routes = useRouter().getRoutes();
            const current = routes.find((route) => route.path === link)!;
            const meta = current.meta as unknown as RouteMeta;
            const creation: Dayjs = dayjs(meta.created);

            let timeago_comp: JSX.Element = (
                <span class="timeago">{creation.fromNow()}</span>
            );

            return (
                <li class="child post">
                    <div class="title">
                        {text_comp}
                        {timeago_comp}
                    </div>
                </li>
            );
        }

        const toggle = () => {
            expanded.value.set(link, !expanded.value.get(link));
        };

        let expand_comp: JSX.Element = (
            <span class="expand cursor" onClick={toggle}>
                <FontAwesomeIcon
                    icon={["fas", "angle-right"]}
                    data-rotate={expanded.value.get(link)}
                />
            </span>
        );

        let title_comp: JSX.Element = (
            <div class="title">
                {text_comp}
                {expand_comp}
            </div>
        );

        let child_comps: JSX.Element[] = children.map((child) => dfs(child));
        let children_comp: JSX.Element = (
            <ul class="children">{child_comps}</ul>
        );

        // If it is the root node, no need to add a title
        if (is_root) {
            return children_comp;
        }

        return (
            <li class="child index">
                {title_comp}
                <AnimateHeight height={expanded.value.get(link) ? "auto" : 0}>
                    {children_comp}
                </AnimateHeight>
            </li>
        );
    };

    return () => dfs(root, true);
};
