<script setup lang="ts">
import { ref, type Ref } from "vue";
import type { JSX } from "vue/jsx-runtime";

const props = defineProps<{
    data: {
        title: () => JSX.Element;
        content: () => JSX.Element;
    }[];
}>();

const active: Ref<number> = ref(0);
</script>

<template>
    <div class="tab">
        <div class="header">
            <div
                class="cursor item"
                v-for="(tab, idx) in props.data"
                @click="active = idx"
                :class="{ active: idx === active }"
            >
                <component :is="tab.title()" />
            </div>
        </div>
        <div class="content">
            <component :is="props.data[active].content()" />
        </div>
    </div>
</template>

<style scoped>
* {
    --border-color: #222223;
    --content-background-color: #141415;
    --header-background-color: #1a1a1b;
    --title-hover-color: #242425;
    --title-underline-color: #5d5f61;
}

.tab {
    margin: 2rem var(--block-extend);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    overflow: hidden;
}

.header {
    display: flex;
    width: 100%;
    background-color: var(--header-background-color);
    border-bottom: 1px solid var(--border-color);
}

.header .item {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 0.85em;

    transition: background-color 0.2s ease;
}

.header .item:hover {
    background-color: var(--title-hover-color);
}

.header .item.active {
    text-decoration-line: underline;
    text-underline-offset: 5px;
    text-decoration-style: wavy;
    text-decoration-color: var(--title-underline-color);
}

.content {
    padding: 0.5rem 1.4rem;
    background-color: var(--content-background-color);
}
</style>
