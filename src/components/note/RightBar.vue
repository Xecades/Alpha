<script setup lang="ts">
/**
 * @todo 完成 ToC 的动画！！！
 * @todo 样式不满意，仍需优化
 * @todo 联动 cursor（？）
 */

import { nextTick, ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";

import cursor from "@/assets/js/cursor";
import {
    navigate,
    normalize_toc,
    setup_scroll_listener,
} from "@/assets/js/note/rightbar";

import _meta_untyped from "@cache/note/meta";
const meta = _meta_untyped as CacheMeta;

// Types
import type { CacheMeta } from "script/preprocess/types";
import type { HeaderRef } from "@/assets/js/note/rightbar";

const route = useRoute();

const showtext: Ref<boolean> = ref(false);
const toc: Ref<HeaderRef[]> = ref([]);
const in_view: Ref<number | null> = ref(null);

const mouse_fn = {
    enter: () => {
        showtext.value = true;
    },
    leave: () => {
        showtext.value = false;
    },
};

watch(
    () => route.path,
    async () => {
        const pathname: string = route.meta.pathname as string;
        toc.value = normalize_toc(meta[pathname].toc);
        in_view.value = null;

        await nextTick();
        setup_scroll_listener(in_view);
    },
    { immediate: true }
);
</script>

<template>
    <Transition name="rightbar" appear>
        <div id="right" :key="$route.path">
            <Transition name="bars" @enter="cursor.refresh()">
                <div class="toc" v-if="!showtext" @mouseenter="mouse_fn.enter">
                    <template v-for="(item, idx) in toc">
                        <div
                            class="bar item cursor"
                            :style="{ width: item.width }"
                            :class="{ active: idx === in_view }"
                        ></div>
                    </template>
                </div>
                <div class="toc" v-else @mouseleave="mouse_fn.leave">
                    <template v-for="(item, idx) in toc">
                        <a
                            class="detail item cursor"
                            :href="'#' + item.link"
                            @click.prevent="navigate(item.link)"
                            :style="{ marginRight: item.indent }"
                            :class="{ 'active': idx === in_view, 'passed': idx < (in_view as number) }"
                        >
                            <span class="text" v-html="item.title"></span>
                            <span class="sign">
                                <font-awesome-icon
                                    :icon="['fas', 'caret-left']"
                                />
                            </span>
                        </a>
                    </template>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<style scoped>
* {
    --padding: 0.5rem;
    --margin: 1.5rem;
    --theme-color: #60a5fa;

    --offset-top: 11rem;
    --offset-right: calc(70px - var(--padding) - var(--margin));

    --bg-color: linear-gradient(90deg, #f7f7f780, #f7f7f7f5);
    --bg-radius: 4px;

    --translate-offset: 7px;

    --color: #e3e2e0;
    --gap: 15px;
    --bar-height: 4px;
    --bar-padding: 4px;

    --toc-title-indent: 0.5rem;
}

#right {
    position: fixed;
    width: 0;
    top: var(--offset-top);
    /** To avoid scrollbar flickering. */
    left: calc(100vw - var(--offset-right));
}

.toc {
    width: max-content;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) - 2 * var(--bar-padding));
    position: absolute;
    top: 0;
    right: 0;
    padding: var(--padding);
    margin: var(--margin);
    background-image: var(--bg-color);
    border-radius: var(--bg-radius);
}

:global(#right .toc .katex) {
    font-size: 1rem;
}

:global(#right .toc code) {
    font-family: var(--monospace);
    font-size: 0.85em;
}

:global(#right .toc em) {
    font-style: italic;
}

:global(#right .toc strong) {
    font-weight: bold;
}

.item {
    margin-left: auto;
    display: inline-block;
    color: #6e758c;
    font-size: 0.95rem;
    transition: color 0.05s;
    position: relative;
}

.item:hover {
    color: #60a5fa;
}

.bar {
    margin-top: var(--bar-padding);
    background-color: var(--color);
    border-radius: 4px;
    height: var(--bar-height);
    transition: background-color 0.15s;
}

.bar.active {
    background-color: #bdbbb8;
}

.detail {
    line-height: 1.6rem;
    transition: color 0.15s;
}

.detail.active {
    color: var(--theme-color);
}

.detail.passed {
    color: #acb1c1;
}

.detail .sign {
    color: var(--theme-color);
    opacity: 0;
    transition: opacity 0.1s;
    font-size: 0.7rem;
    display: block;
    float: inline-end;
    animation: shake-x 1s infinite ease-in-out;
}

.detail .text {
    padding-right: var(--toc-title-indent);
}

.detail:hover .text {
    color: var(--theme-color);
}

.detail:hover .sign {
    opacity: 1;
}

.rightbar-enter-active,
.rightbar-leave-active {
    transition-property: opacity;
}

.rightbar-enter-active {
    transition-duration: 0.37s;
    transition-timing-function: ease-out;
}

.rightbar-leave-active {
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.15, 0.79, 0.69, 0.68);
}

.rightbar-enter-from,
.rightbar-leave-to {
    opacity: 0;
}

.bars-enter-active,
.bars-leave-active {
    transition-property: opacity, transform;
}

.bars-enter-active {
    transition-duration: 0.37s;
    transition-timing-function: ease-out;
}

.bars-leave-active {
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.15, 0.79, 0.69, 0.68);
}

.bars-enter-from,
.bars-leave-to {
    opacity: 0;
    transform: translateX(var(--translate-offset));
}
</style>
