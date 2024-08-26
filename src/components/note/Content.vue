<script setup>
/**
 * @todo 图片缓存，不能每次都重新加载一遍
 */

import Breadcrumb from "./Breadcrumb.vue";

import "@/assets/css/markdown.css";
import "@/assets/css/prism-one-light.css";

const props = defineProps({
    body: Object,
    attr: Object,
    path: Array,
});
</script>

<template>
    <div>
        <header>
            <h1>{{ attr.title }}</h1>

            <!-- 如果 path 为空：Note Index / Category Index / 404 -->
            <!-- 但是不能不显示 Breadcrumb，否则会导致 flicker -->
            <!-- 考虑替换为其他东西 -->
            <!-- TODO: 不要 Breakcrumb，改成 Metadata -->
            <Breadcrumb id="breadcrumb" :path="path" />
        </header>

        <!-- TODO: Markdown CSS -->
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