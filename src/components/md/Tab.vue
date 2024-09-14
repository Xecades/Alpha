<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    useSlots,
    watch,
} from "vue";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import AnimateHeight from "vue-animate-height";

import type { Ref, VNodeRef } from "vue";
import type { JSX } from "vue/jsx-runtime";
import type { PartialOptions } from "overlayscrollbars";

type TabData = {
    title: JSX.Element[];
    content: JSX.Element[];
};

/** Map slots to tab data. */
const mapData = (parts: JSX.Element[]): TabData[] => {
    const res: TabData[] = [];

    for (const part of parts) {
        // <h1> is used as title
        if (part.type === "h1") {
            res.push({
                title: part.children as JSX.Element[],
                content: [],
            });
        } else {
            const last = res.length - 1;
            res[last].content.push(part);
        }
    }

    return res;
};

/** @see https://github.com/KingSora/OverlayScrollbars/ */
const osOptions: PartialOptions = {
    scrollbars: {
        autoHide: "move",
        autoHideDelay: 500,
    },
    overflow: { y: "visible-hidden" },
};

const active: Ref<number> = ref(0);
const height: Ref<number | string> = ref("auto");

const target: VNodeRef = ref();
const listener: Ref<HTMLElement> = computed(() =>
    target.value.$el.querySelector(".height-listener")
);

const parts: Ref<JSX.Element[]> = computed(() => useSlots().default!());
const data: Ref<TabData[]> = computed(() => mapData(parts.value));

const is_immensive: Ref<boolean> = ref(false);

let observer: ResizeObserver;

// If current tab is a single block, then set immensive mode.
watch(
    active,
    async () => {
        await nextTick();
        const children = listener.value.children;

        is_immensive.value =
            children.length === 1 &&
            (children[0].classList.contains("block-code") ||
                children[0].classList.contains("quote"));
    },
    { immediate: true }
);

onMounted(() => {
    const el: HTMLElement = listener.value;

    observer = new ResizeObserver(async () => {
        await nextTick();
        height.value = el.clientHeight;
    });
    observer.observe(el);
});

onBeforeUnmount(() => {
    observer.disconnect();
});
</script>

<template>
    <div class="tab">
        <OverlayScrollbarsComponent
            element="div"
            :options="(osOptions as any)"
            class="header-container"
        >
            <div class="header">
                <div
                    class="cursor item"
                    v-for="(tab, idx) in data"
                    @click="active = idx"
                    :class="{ active: idx === active }"
                >
                    <component :is="() => tab.title" />
                </div>
            </div>
        </OverlayScrollbarsComponent>
        <div class="content" :class="{ immensive: is_immensive }">
            <!-- @see https://www.npmjs.com/package/vue-animate-height -->
            <AnimateHeight
                ref="target"
                contentClass="height-listener"
                :height="height"
            >
                <component :is="() => data[active].content" />
            </AnimateHeight>
        </div>
    </div>
</template>

<style scoped>
* {
    --header-height: 3rem;

    --border-color: #e0e0e0;
    --header-color: #6d6e75;
    --content-background-color: #f9f9f9;
    --header-background-color: #f1f1f1;
    --title-hover-color: #e0e0e0;
    --title-underline-color: #9e9ea2;
}

@media (prefers-color-scheme: dark) {
    * {
        --border-color: #222223;
        --header-color: #b9bcc0;
        --content-background-color: #141415;
        --header-background-color: #1a1a1b;
        --title-hover-color: #242425;
        --title-underline-color: #5d5f61;
    }
}

.tab {
    margin: 2rem var(--block-extend);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    overflow: hidden;
}

.header-container {
    height: var(--header-height);
    border-bottom: 1px solid var(--border-color);
    background-color: var(--header-background-color);
}

.header-container :global(.os-scrollbar-horizontal) {
    --os-size: 7px;
}

.header {
    display: flex;
    color: var(--header-color);
    height: var(--header-height);
}

.header .item {
    display: inline-block;
    padding: 0.5rem 1rem;
    line-height: calc(var(--header-height) - 1rem);
    font-size: 0.85em;
    flex-shrink: 0;
    transition: background-color 0.2s ease;
    position: relative;
}

.header .item:hover {
    background-color: var(--title-hover-color);
}

.header .item::before {
    content: "";
    text-decoration-color: transparent;
    transition: text-decoration-color 0.5s ease;
}

.header .item.active::before {
    /** A CSS hack to avoid skipping ink on specific tags :-) */
    content: "............................................................................................................................................................................................................";
    user-select: none;
    color: transparent;
    width: calc(100% - 1rem * 2);
    overflow: hidden;
    position: absolute;
    text-decoration-line: underline;
    text-underline-offset: 5px;
    text-decoration-style: wavy;
    text-decoration-color: var(--title-underline-color);
}

.content {
    --block-extend: 0;
    --listener-padding: 0.5rem 1.4rem;

    background-color: var(--content-background-color);
}

.content.immensive {
    --listener-padding: 0;
}

.content :global(.height-listener) {
    padding: var(--listener-padding);
    /** Fix margin collapse */
    overflow: hidden;
}

.content.immensive .block-code {
    margin: 0;
    border: none;
    background: unset;
}

.content.immensive div.quote {
    margin: 3rem 1.4rem;
}
</style>
