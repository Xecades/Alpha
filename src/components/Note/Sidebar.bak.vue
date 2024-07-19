<script setup lang="jsx">
import { config, getNodeBy, parsePath } from "@/assets/js/noteUtils";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

// console.log(JSON.stringify(config));

function render(node) {
    const walk = [];

    const is_active = () => walk.every((v, i) => v === path.value[i]);
    const is_leaf = (node) => !node.child.length;

    function dfs(node) {
        walk.push(node.link);
        let link = <router-link to={node.link} class="cursor">{node.title}</router-link>
        if (is_leaf(node)) {
            walk.pop();
            return <div active={is_active()}>{link}</div>;
        }
        let children = node.child.map(dfs);
        walk.pop();
        return <div>{link}<div>{children}</div></div>;
    }

    return <>{node.child.map(dfs)}</>;
};

const route = useRoute();
const path = computed(() => parsePath(route.path));
const page = computed(() => getNodeBy.link(config.root, path.value[0]));
const category = computed(() => page.value.title);
const VBody = ref(render(page.value));

watch(category, () => { VBody.value = render(page.value); });
</script>

<template>
    <div class="sidebar">
        <div class="title">
            {{ category }}
        </div>
        <div class="body">
            <VBody />
        </div>
    </div>
</template>

<style scoped>
:global(.sidebar .body a) {
    color: unset;
    text-decoration: none;
}

:global(.sidebar .body div[active="true"]) {
    background: rgba(0, 123, 255, 0.279);
}

:global(.sidebar .body div) {
    border: 1px solid cyan;
    margin: 10px;
}
</style>