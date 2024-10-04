<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

import type { Ref } from "vue";
import { assertType, type RouteMeta } from "@script/types";

const route = useRoute();
const meta: Ref<RouteMeta> = computed(() => assertType<RouteMeta>(route.meta));
</script>

<template>
    <div class="metadata">
        <router-link :to="meta.back.link" class="back cursor">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </span>
            <span class="text">{{ meta.back.title }}</span>
        </router-link>
    </div>
</template>

<style scoped>
.metadata {
    margin: 0rem var(--margin-lr) var(--header-main-spacing);

    --back-color: #7a7e83;
    --back-hover-color: #252f3a;
}

@media (prefers-color-scheme: dark) {
    .metadata {
        --back-color: #7a7e83;
        --back-hover-color: #d3d6dc;
    }
}

.back {
    display: flex;
    width: max-content;
    color: var(--back-color);
    transition: color 0.2s ease;
    height: 1.5rem;
    line-height: 1.5rem;
    margin-left: -2px;
}

.back:hover {
    color: var(--back-hover-color);
}

.back .icon,
.back .text {
    display: inline-block;
}

.back .icon {
    width: 15px;
    text-align: center;
    font-size: 0.7em;
    opacity: 0.85;
}

.back .text {
    font-size: 0.9em;
}
</style>
