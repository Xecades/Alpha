<script setup>
/**
 * @todo 当页面到底部时，ToC 会跳动
 * 
 * @todo 完成 ToC 的动画！！！
 */

import { computed, ref } from "vue";

const props = defineProps({
    toc_raw: Array,
});

const width_preset = ["50px", "40px", "30px", "20px", "13px"];
const levels = computed(() => props.toc_raw.map((item) => item.level));

const maxLevel = computed(() => Math.max(...levels.value));
const toc = computed(() => props.toc_raw.map((item) => {
    item.width = width_preset[4 + item.level - maxLevel.value];
    return item;
}));

const showtext = ref(false);

const navigate = (id) => {
    let el = document.getElementById(id);
    if (el) {
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView
         * @todo 优化滚动效果，不用原生的
         */
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};
</script>

<template>
    <div class="container">
        <div class="wrapper" @mouseenter="showtext = true" @mouseleave="showtext = false">
            <a class="item cursor" :href="'#' + item.link" v-for="item in toc" @click.prevent="navigate(item.link)">
                <div class="bar" :style="{ width: item.width }" v-if="!showtext"></div>
                <div class="text" v-html="item.title" v-else></div>
            </a>
        </div>
    </div>
</template>

<style scoped>
* {
    --padding-top: 11rem;
    --color: #e3e2e0;
    --height: 4px;
    --gap: 15px;
    --bar-padding: 4px;
    --margin-right: 40px;
}

.container {
    padding-top: var(--padding-top);
    right: 0;
}

.wrapper {
    margin-left: auto;
    margin-right: var(--margin-right);
    width: 15rem;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) - 2 * var(--bar-padding));
}

.item {
    margin-left: auto;
    display: block;
    color: #6e758c;
    font-size: .95rem;
    transition: color .05s;
}

.item:hover {
    color: #60a5fa;
}

.slot {
    margin-left: auto;
}

.bar {
    margin: var(--bar-padding);
    background-color: var(--color);
    border-radius: 4px;
    height: var(--height);
    transition: background-color .3s;
}

.text {}
</style>