<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { loadJS } from "@/assets/ts/utils";

import type { Ref } from "vue";
import { assertType, type RouteMeta } from "@script/types";

const route = useRoute();
const meta: Ref<RouteMeta> = computed(() => assertType<RouteMeta>(route.meta));

onMounted(async () => {
    await loadJS(
        "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
    );
});
</script>

<template>
    <div class="metadata">
        <router-link :to="meta.back.link" class="back cursor">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </span>
            <span class="text">{{ meta.back.title }}</span>
        </router-link>

        <span class="viewcount" v-if="meta.type === 'post'">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'eye']" />
            </span>
            <span class="text" id="busuanzi_value_page_pv">
                <font-awesome-icon :icon="['fas', 'spinner']" spin />
            </span>
        </span>
    </div>
</template>

<style scoped>
.metadata {
    margin: 0rem var(--margin-lr) var(--header-main-spacing);
    user-select: none;

    --back-color: #7a7e83;
    --back-hover-color: #252f3a;

    --viewcount-color: #7a7e83;
}

@media (prefers-color-scheme: dark) {
    .metadata {
        --back-color: #7a7e83;
        --back-hover-color: #d3d6dc;

        --viewcount-color: #7a7e83;
    }
}

.viewcount {
    display: inline-flex;
    margin-left: 10px;
    color: var(--viewcount-color);
    height: 1.5rem;
    line-height: 1.5rem;
}

.viewcount .icon {
    width: 19px;
    text-align: center;
    font-size: 0.7em;
    opacity: 0.85;
}

.viewcount .text {
    font-size: 0.9em;
}

.back {
    display: inline-flex;
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
