<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";

import cursor from "@/assets/js/cursor";
import { navigate, normalize_toc } from "@/assets/js/note/rightbar";

// Types
import type { HeaderRef } from "@/assets/js/note/rightbar";
import type { MarkdownHeader } from "@script/types";

const props = defineProps<{ in_view: number | null }>();
const route = useRoute();

const showtext: Ref<boolean> = ref(false);
const toc: Ref<HeaderRef[]> = ref([]);

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
        toc.value = normalize_toc(route.meta.toc as MarkdownHeader[]);
    },
    { immediate: true }
);
</script>

<template>
    <Transition name="rightbar" appear>
        <div
            id="right"
            :key="$route.path"
            @mouseenter="mouse_fn.enter"
            @mouseleave="mouse_fn.leave"
        >
            <Transition name="bars" @enter="cursor.refresh()">
                <div class="toc" v-if="!showtext">
                    <template v-for="(item, idx) in toc">
                        <div
                            class="bar item cursor"
                            :style="{ width: item.width }"
                            :class="{ active: idx === in_view }"
                        ></div>
                    </template>
                </div>
                <div class="toc" v-else>
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
    --offset-top: 28px;
    --offset-right: 35px;

    --width: 298px;
    --height: calc(100vh - var(--offset-top) * 2);
    --theme-color: #60a5fa;

    --toc-gap: 15px;
    --toc-padding: 0.5rem;
    --toc-margin: 1.5rem;
    --toc-offset-top: calc(11rem - var(--offset-top));

    --toc-background-image: linear-gradient(90deg, #f7f7f780, #f7f7f7f5);
    --toc-border-radius: 4px;
    --toc-title-indent: 0.5rem;
    --toc-translate-offset: 7px;

    --item-color: #6e758c;
    --item-hover-color: #60a5fa;

    --bar-background-color: #e3e2e0;
    --bar-active-background-color: #bdbbb8;

    --bar-height: 4px;
    --bar-padding: 4px;

    --detail-color-passed: #acb1c1;
}

@media (prefers-color-scheme: dark) {
    * {
        --theme-color: #87b3ea;
        --toc-background-image: linear-gradient(90deg, #10101080, #101010f5);
        --bar-background-color: #363636;
        --bar-active-background-color: #9e9e9e;
        --item-color: #c4c6ce;
        --item-hover-color: #87b3ea;
        --detail-color-passed: #5f6064;
    }
}

#right {
    position: fixed;
    width: var(--width);
    height: var(--height);
    top: var(--offset-top);
    z-index: 100;
    /** To avoid scrollbar flickering. */
    left: calc(100vw - var(--offset-right) - var(--width));
}

.toc {
    width: max-content;
    display: flex;
    flex-direction: column;
    gap: calc(var(--toc-gap) - 2 * var(--bar-padding));
    position: absolute;
    top: var(--toc-offset-top);
    right: 0;
    padding: var(--toc-padding);
    margin: var(--toc-margin);
    background-image: var(--toc-background-image);
    border-radius: var(--toc-border-radius);
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
    color: var(--item-color);
    font-size: 0.95rem;
    transition: color 0.05s;
    position: relative;
}

.item:hover {
    color: var(--item-hover-color);
}

.bar {
    margin-top: var(--bar-padding);
    background-color: var(--bar-background-color);
    border-radius: 4px;
    height: var(--bar-height);
    transition: background-color 0.15s;
}

.bar.active {
    background-color: var(--bar-active-background-color);
}

.detail {
    line-height: 1.6rem;
    transition: color 0.15s;
}

.detail.active {
    color: var(--theme-color);
}

.detail.passed {
    color: var(--detail-color-passed);
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
    transform: translateX(var(--toc-translate-offset));
}
</style>
