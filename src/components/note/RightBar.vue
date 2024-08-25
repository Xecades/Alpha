<script setup>
/**
 * @todo 当页面到底部时，ToC 会跳动
 * 
 * @todo 完成 ToC 的动画！！！
 * @todo 样式不满意，仍需优化（LaTeX 块是否应该小一点？）
 * @todo hover 的纵向判定范围再广一点
 * @todo 联动 cursor（？）
 * 
 * @todo 测试当 ToC 过长时的换行
 * @todo 完成 ToC 中的 html 标签，例如 code 块
 * @todo 当鼠标移到 ToC 下面时，不应该展开 ToC
 * 
 * @todo ToC 展开后的层级效果！！！！！！
 * @todo 当前滚动进度高亮！！！！！
 */

import { computed, ref } from "vue";
import { refreshCursor } from "@/assets/js/cursor";

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
         * @todo 优化滚动效果，跳转留一个 offset
         */
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};
</script>

<template>
    <div class="wrapper">
        <Transition name="bars" class="wrapper" @enter="refreshCursor" @mouseenter="showtext = true"
            @mouseleave="showtext = false">
            <div class="toc" v-if="!showtext">
                <template v-for="item in toc">
                    <div class="bar item cursor" :style="{ width: item.width }"></div>
                </template>
            </div>
            <div class="toc" v-else>
                <template v-for="item in toc">
                    <a class="text item cursor" :href="'#' + item.link" v-html="item.title"
                        @click.prevent="navigate(item.link)"></a>
                </template>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
* {
    --padding: 2rem;
    --toc-width: 15rem;
    --offset-top: 11rem;
    --offset-right: calc(70px - var(--padding));

    --translate-offset: 7px;

    --color: #e3e2e0;
    --gap: 15px;
    --bar-height: 4px;
    --bar-padding: 4px;
}

.toc {
    width: var(--toc-width);
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) - 2 * var(--bar-padding));
    position: absolute;
    top: var(--offset-top);
    right: var(--offset-right);
    padding: var(--padding);
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
    transition: background-color .3s;
}

.text {
    line-height: 1.6rem;
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