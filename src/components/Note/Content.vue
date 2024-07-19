<script setup lang="jsx">
import { config, parsePath, getNodeBy } from "@/assets/js/noteUtils";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const path = computed(() => parsePath(route.path));
const page = computed(() => getNodeBy.link(config.root, path.value[0]));
const category = computed(() => page.value.title);
</script>

<template>
    <div>
        <slot />
    </div>
</template>
