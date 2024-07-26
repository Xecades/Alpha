<script setup lang="jsx">
import "@/assets/css/markdown.css"
import { config, parsePath, getNodeBy, flattenPath } from "@/assets/js/noteUtils";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const path = computed(() => parsePath(route.path));
const page = computed(() => getNodeBy.path(config.root, path.value));

const title = computed(() => page.value.title);
const isIndex = computed(() => page.value.child.length !== 0);

const breadcrumb = computed(() => flattenPath(config.root, path.value.slice(0, -1)));
</script>

<template>
    <div>
        <header>
            <h1>{{ title }}</h1>
            <NotePartBreadcrumb class="breadcrumb" :data="breadcrumb" />
        </header>
        <main class="markdown">
            <slot />
        </main>
    </div>
</template>

<style scoped>
header {
    margin-top: 3rem;
    margin-bottom: 2.3rem;
    margin-left: var(--content-margin-lr);
    margin-right: var(--content-margin-lr);
}

h1 {
    font-size: 2.2rem;
    color: #535353;
    letter-spacing: .12rem;
    line-height: 3.5rem;
    height: 3.5rem;
}

.breadcrumb {
    margin-top: .3rem;
    margin-left: .1rem;
}

main {
    margin: 1.4rem var(--content-margin-lr);
}
</style>
