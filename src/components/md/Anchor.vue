<script setup lang="ts">
const props = defineProps<{ href: string }>();
const is_internal: boolean = props.href.startsWith("/");
</script>

<template>
    <router-link :to="encodeURI(href)" v-if="is_internal" class="cursor">
        <slot />
    </router-link>
    <a :href="href" v-else class="cursor" target="_blank">
        <slot />
    </a>
</template>

<style scoped>
* {
    --color: #3083e8;
    --hover-color: #0454b3;
}

a {
    color: var(--color);
    transition: color .1s;
}

a:hover {
    color: var(--hover-color);
}

a::after {
    content: "✦";
    font-size: 0.7em;
    line-height: 1em;
    padding: 0 2px;
    vertical-align: super;
}
</style>