<script setup lang="ts">
/**
 * @todo 图片缓存，不能每次都重新加载一遍
 */

import { nextTick, ref, watch, type Ref } from "vue";
import ScrollReveal from "scrollreveal";

import Breadcrumb from "./Breadcrumb.vue";

import "@/assets/css/markdown.css";
import "@/assets/css/prism-one-light.css";

// Types
import type { FMAttr } from "script/preprocess/parse-md";
import type { JsxElement } from "typescript";

type TitleLink = { title: string, link: string };


const props = defineProps<{ renderer: () => any, attr: FMAttr, path: TitleLink[] }>();
const body: Ref<JsxElement | undefined> = ref();

const register_anchor = () => {
    const headings = document.querySelectorAll(".heading");

    headings.forEach((heading) => {
        const anchor = heading.querySelector(".header-anchor");
        if (anchor) {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();

                const offset = -4 * 16;
                const y: number = heading.getBoundingClientRect().top + window.scrollY + offset;

                window.scrollTo({ top: y, behavior: "smooth" });
            });
        }
    });
};


const register_scrollreveal = () => {
    const target = "header h1, #breadcrumb, .markdown > *";

    ScrollReveal().reveal(target, {
        interval: 20,
        duration: 400,
        origin: "top",
        distance: "4px",
        scale: 0.99,
    });
}


watch(
    () => props.renderer,
    async () => {
        await nextTick();
        body.value = (await props.renderer()).default;
        console.log(body.value);

        await nextTick();
        register_anchor();
        await nextTick();
        register_scrollreveal();
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
            <!-- TODO: 不要 Breakcrumb，改成 Metadata -->
            <Breadcrumb id="breadcrumb" :path="path" />
        </header>

        <main class="markdown">
            <!-- https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components -->
            <component :is="body" />
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
    letter-spacing: .12rem;
    line-height: var(--header-line-height);
}

#breadcrumb {
    margin-top: .3rem;
    margin-left: .1rem;
}
</style>