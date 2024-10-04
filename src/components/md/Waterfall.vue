<script setup lang="ts">
import { computed, useSlots } from "vue";

import type { Ref } from "vue";
import type { JSX } from "vue/jsx-runtime";

const props = defineProps<{ width?: string; gap?: string }>();
const width: number = Number(props.width) || 300;
const gap: number = Number(props.gap) || 16;

const slots: Ref<JSX.Element[]> = computed(() => useSlots().default!());
const parts = computed(() => {
    const res: (() => JSX.Element)[] = [];
    for (const part of slots.value) res.push(() => part);
    return res;
});
</script>

<template>
    <div class="waterfall">
        <!-- https://www.npmjs.com/package/@yeger/vue-masonry-wall -->
        <masonry-wall :items="parts" :column-width="width" :gap="gap">
            <template #default="{ item, index }">
                <component :key="index" :is="item" />
            </template>
        </masonry-wall>
    </div>
</template>

<style scoped>
.waterfall {
    margin: 3rem var(--block-extend);
}
</style>
