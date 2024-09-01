<script setup lang="ts">
/**
 * @todo 图片缓存，不能每次都重新加载一遍
 */

import { computed, nextTick, watch } from "vue";
import { useRoute } from "vue-router";

import _meta_untyped from "@cache/note/meta";
const meta = _meta_untyped as CacheMeta;

import "@/assets/css/markdown.css";
import "@/assets/css/prism-one-light.css";

// Types
import type { ComputedRef } from "vue";
import type { CacheMeta, MarkdownFrontMatter } from "script/preprocess/types";

const route = useRoute();

const pathname: ComputedRef<string> = computed(
    () => route.meta.pathname as string
);
const attr: ComputedRef<MarkdownFrontMatter> = computed(
    () => meta[pathname.value].attr
);

/**
 * Iterate through headings and register anchor click event.
 */
const register_anchor = () => {
    const headings = document.querySelectorAll(".heading");

    headings.forEach((heading) => {
        const anchor = heading.querySelector(".header-anchor");
        if (anchor) {
            anchor.addEventListener("click", (e: Event) => {
                e.preventDefault();

                const offset: number = -4 * 16;
                const y: number =
                    heading.getBoundingClientRect().top +
                    window.scrollY +
                    offset;

                window.scrollTo({ top: y, behavior: "smooth" });
            });
        }
    });
};

watch(
    () => route.path,
    async () => {
        await nextTick();
        register_anchor();
    },
    { immediate: true }
);
</script>

<template>
    <div>
        <!-- 通过 key 强制组件刷新，从而正常触发动画 -->
        <header :key="attr.title">
            <h1>{{ attr.title }}</h1>

            <!-- 如果 path 为空：Note Index / Category Index / 404 -->
            <!-- 但是不能不显示 Breadcrumb，否则会导致 flicker -->
            <!-- 考虑替换为其他东西 -->
            <!-- @TODO: 不要 Breakcrumb，改成 Metadata -->
            <!-- <Breadcrumb id="breadcrumb" :path="path" /> -->
        </header>

        <main class="markdown">
            <RouterView />
        </main>
    </div>
</template>

<style scoped>
* {
    --margin-lr: 3rem;
    --margin-top: 4rem;
    --margin-bottom: 10rem;

    --header-main-spacing: 2.3rem;

    --header-color: #535353;
    --header-size: 2.2rem;
    --header-line-height: 3.5rem;
}

main {
    margin: 0 var(--margin-lr) var(--margin-bottom);
}

header {
    margin: var(--margin-top) var(--margin-lr) var(--header-main-spacing);
}

h1 {
    font-size: var(--header-size);
    color: var(--header-color);
    letter-spacing: 0.12rem;
    line-height: var(--header-line-height);
}

#breadcrumb {
    margin-top: 0.3rem;
    margin-left: 0.1rem;
}
</style>
