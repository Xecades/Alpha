<script setup lang="ts">
/**
 * @todo 完成 ToC 的动画！！！
 * @todo 样式不满意，仍需优化
 * @todo 联动 cursor（？）
 */

import { computed, ref, type ComputedRef, type Ref } from "vue";
import { refreshCursor } from "@/assets/js/cursor";

// Types
import type { Header } from "script/toc";

type HeaderRef = Header & { width: string, indent: string };

const props = defineProps<{ toc_raw: Header[], in_view: number | null }>();

const width_preset = ["50px", "40px", "30px", "20px", "13px"];
const indent_preset = ["0rem", "1rem", "1.7rem", "2.3rem", "2.8rem"];

const levels: ComputedRef<number[]> = computed(() => props.toc_raw.map((item) => item.level));
const maxLevel: ComputedRef<number> = computed(() => Math.max(...levels.value));
const minLevel: ComputedRef<number> = computed(() => Math.min(...levels.value));

const toc: ComputedRef<HeaderRef[]> = computed(() => props.toc_raw.map((item: any) => {
    item.width = width_preset[4 + item.level - maxLevel.value];
    item.indent = indent_preset[item.level - minLevel.value];

    return item as HeaderRef;
}));

const showtext: Ref<boolean> = ref(false);

const navigate = (id: string) => {
    let el = document.getElementById(id);
    if (el) {
        // 不能用 scrollIntoView，因为 ScrollReveal 动画会打断滚动

        const offset = -4 * 16;
        const y: number = el.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top: y, behavior: "smooth" });
    }
};
</script>

<template>
    <div class="wrapper">
        <Transition name="bars" class="wrapper" @enter="refreshCursor" @mouseenter="showtext = true"
            @mouseleave="showtext = false">
            <div class="toc" v-if="!showtext">
                <template v-for="(item, idx) in toc">
                    <div class="bar item cursor" :style="{ width: item.width }" :class="{ 'active': idx === in_view }">
                    </div>
                </template>
            </div>
            <div class="toc" v-else>
                <template v-for="(item, idx) in toc">
                    <a class="detail item cursor" :href="'#' + item.link" @click.prevent="navigate(item.link)"
                        :style="{ marginRight: item.indent }"
                        :class="{ 'active': idx === in_view, 'passed': idx < (in_view as number) }">
                        <span class="text" v-html="item.title"></span>
                        <span class="sign"><font-awesome-icon :icon="['fas', 'caret-left']" /></span>
                    </a>
                </template>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
* {
    --padding: .5rem;
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

    --toc-title-indent: .5rem;
}

.toc {
    width: max-content;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) - 2 * var(--bar-padding));
    position: absolute;
    top: var(--offset-top);
    right: var(--offset-right);
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
    font-size: .85em;
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
    font-size: .95rem;
    transition: color .05s;
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
    transition: background-color .15s;
}

.bar.active {
    background-color: #bdbbb8;
}

.detail {
    line-height: 1.6rem;
    transition: color .15s;
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
    transition: opacity .1s;
    font-size: .7rem;
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

.bars-enter-active,
.bars-leave-active {
    transition-property: opacity, transform;
}

.bars-enter-active {
    transition-duration: .37s;
    transition-timing-function: ease-out;
}

.bars-leave-active {
    transition-duration: .2s;
    transition-timing-function: cubic-bezier(.15, .79, .69, .68);
}

.bars-enter-from,
.bars-leave-to {
    opacity: 0;
    transform: translateX(var(--translate-offset));
}
</style>