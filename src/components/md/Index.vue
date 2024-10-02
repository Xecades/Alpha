<script setup lang="ts">
import { computed, onMounted, watch, type Ref } from "vue";
import { render_index } from "@/assets/js/note/markdown";
import cursor from "@/assets/js/cursor";

import config from "@cache/note/config";

import type { NavNode } from "@script/types";

const props = defineProps<{ target: string }>();

/**
 * Locate the target node in the navigation tree recursively.
 */
const locate = (nodes: NavNode[], target: string): NavNode | undefined => {
    // If the target is the /note or /blog page, return the dummy root node.
    if (/^\/(note|blog)$/.test(target)) {
        return { title: "", name: "", link: "", children: nodes };
    }

    for (const node of nodes) {
        if ("/" + node.link === target) return node;

        const result = locate(node.children, target);
        if (result) return result;
    }
};

const root: Ref<NavNode> = computed(() => locate(config.nav, props.target)!);
const wrap: Ref<boolean> = computed(() =>
    // Only wrap the toc when all children are post nodes.
    root.value.children.every((node) => node.children.length === 0)
);

watch(
    () => props.target,
    () => {
        cursor.refresh();
    },
    { immediate: true }
);
</script>

<template>
    <div class="index-comp" :data-wrap="wrap">
        <div class="nav">
            <div class="header" v-if="wrap">文章目录</div>
            <component :is="render_index(root)" />
        </div>
    </div>
</template>

<style>
.index-comp {
    --gap-lr: 17px;
    --gap-tb: 14px;

    --icon-color: #b5bcbe9e;
    --border-color: #e1e1e1c4;
    --index-background: #eeeeee87;
    --title-color: #3c3c3e;
    --title-hover-color: #60a5fa;
    --timeago-color: #787b7e;
    --expand-color: #91979d;
    --expand-hover-color: #3c3c3e;
}

@media (prefers-color-scheme: dark) {
    .index-comp {
        --icon-color: #787b7c9e;
        --border-color: #333333c4;
        --index-background: #2d2d2d6e;
        --title-color: #c6c6c6;
        --title-hover-color: #87b3ea;
        --timeago-color: #787b7e;
        --expand-color: #676a6c;
        --expand-hover-color: #b3b3c1;
    }
}

.index-comp[data-wrap="true"] .nav {
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.index-comp .nav .header {
    background-color: var(--index-background);
    height: 3.5rem;
    line-height: 3.5rem;
    padding: 0 20px;
    user-select: none;
}

.index-comp .nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.index-comp .nav .title {
    display: flex;
    padding: 0 var(--gap-lr);
    line-height: 3.5rem;
    height: 3.5rem;
}

.index-comp .nav .child.index {
    border: 1px solid var(--border-color);
    margin-bottom: var(--gap-tb);
    border-radius: 3px;
    overflow: hidden;
}

.index-comp .nav .child.index:first-of-type {
    margin-top: var(--gap-tb);
}

.index-comp .nav .child.post + .child.post {
    border-top: 1px solid var(--border-color);
}

.index-comp .nav .child.post + .child.index {
    margin-top: 5px;
}

.index-comp .nav .child.index > .title {
    background-color: var(--index-background);
    padding: 0 var(--gap-lr);
    gap: 60px;
}

.index-comp .nav .child.post > .title .text {
    flex: 1;
}

.index-comp .nav .title .text .icon {
    color: var(--icon-color);
    margin-right: 9px;
}

.index-comp .nav .title .text a {
    padding: 0 1rem;
    margin-left: -1rem;
    color: var(--title-color);
    transition: color 0.15s ease-out;
}

.index-comp .nav .title .text a:hover {
    color: var(--title-hover-color);
}

.index-comp .nav .child.post > .title .timeago {
    font-size: 0.9rem;
    color: var(--timeago-color);
}

.index-comp .nav .child.index > .title .expand {
    color: var(--expand-color);
    margin-right: calc(-1 * var(--gap-lr));
    padding-right: 19px;
    text-align: right;
    flex: 1;
    transition: color 0.15s ease-out;
}

.index-comp .nav .child.index > .title .expand:hover {
    color: var(--expand-hover-color);
}

.index-comp .nav .title .expand svg {
    transition: transform 0.2s ease;
}

.index-comp .nav .title .expand svg[data-rotate="true"] {
    transform: rotate(90deg);
}

.index-comp .nav .child.post {
    padding-left: var(--gap-lr);
    padding-right: var(--gap-lr);
}

.index-comp .nav .child.index {
    margin-left: var(--gap-lr);
    margin-right: var(--gap-lr);
}

.index-comp[data-wrap="false"] .nav > .children > .child {
    margin-left: 0;
    margin-right: 0;
}

.index-comp .nav .child.post:last-of-type .title {
    border-bottom: none;
}

.index-comp .nav li {
    text-indent: 0;
}

@media (max-width: 768px) {
    .index-comp .nav .child.post > .title .timeago {
        display: none;
    }
}
</style>
