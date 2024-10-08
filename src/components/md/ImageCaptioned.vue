<script setup lang="ts">
/**
 * @todo 图片懒加载
 */

import cursor from "@/assets/ts/cursor";
import { nextTick, onBeforeUnmount, onMounted, ref, type Ref } from "vue";

import mediumZoom from "medium-zoom";

const props = defineProps<{ alt: string; src: string }>();
const img: Ref<HTMLImageElement | null> = ref(null);

onMounted(() => {
    const zoom = mediumZoom(img.value as HTMLElement, {
        background: "var(--overlay-color)",
    });

    zoom.on("open", async () => {
        await nextTick();
        cursor.refresh();
    });
    onBeforeUnmount(zoom.detach.bind(zoom));
});
</script>

<template>
    <figure>
        <img
            ref="img"
            class="cursor"
            :class="src.endsWith('.svg') && 'svg'"
            :alt="alt"
            :src="src"
            data-ic-zoomable
        />
        <figcaption v-if="alt" :title="alt">
            <slot />
        </figcaption>
    </figure>
</template>

<style>
.medium-zoom-image[data-ic-zoomable] {
    z-index: 10000;
    border-radius: 0;
}

.medium-zoom-overlay {
    z-index: 9999;
    cursor: unset !important;
}

:root {
    --overlay-color: #47484a85;
}

@media (prefers-color-scheme: dark) {
    :root {
        --overlay-color: #0e0e0ed6;
    }
}
</style>

<style scoped>
figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0 2em;
    padding: 0;
}

img {
    max-width: var(--width);
    max-height: 20em;
    margin: 0;
    padding: 0;
    border-radius: 2px;
    transition: border-radius 0.3s;
    cursor: unset;
}

figcaption {
    margin-top: 1em;
    font-size: 0.8em;
    color: #8d8d8d;
    text-align: center;
    text-decoration: underline dotted;
    text-underline-offset: 4px;
}

@media (prefers-color-scheme: dark) {
    img {
        filter: brightness(0.8);
    }

    img.svg {
        filter: invert(0.75);
    }
}

@media (max-width: 768px) {
    img {
        max-height: 15em;
    }
}
</style>
