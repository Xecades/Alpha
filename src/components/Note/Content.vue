<script setup lang="jsx">
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
            <NotePartBreadcrumb :data="breadcrumb" />
            <h1>{{ title }}</h1>
        </header>
        <main>
            <slot />
        </main>
    </div>
</template>

<style scoped>
header {
    margin: 3rem 0 2em 0;
    padding-left: 1.5rem;
}

h1 {
    font-size: 3rem;
    color: #6e6e6e;
    font-weight: bold;
    letter-spacing: .12rem;
}
</style>
