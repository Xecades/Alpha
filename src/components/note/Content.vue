<script setup>
/**
 * @todo 图片缓存，不能每次都重写加载一遍
 * @note Markdown 加载文件很大，尽量缓存
 */

import Breadcrumb from "./Breadcrumb.vue";

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
            <Breadcrumb :path="path" />
        </header>

        <!-- TODO: Markdown CSS -->
        <main class="markdown">
            <!-- https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components -->
            <component :is="body" />
        </main>
    </div>
</template>
