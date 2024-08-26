<script setup>
const props = defineProps({ href: String });
const is_internal = props.href.startsWith("/");
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
    --hover-bg: #499afedb;
    --active-bg: #83b5f2db;
}

a {
    color: var(--color);
    transition: color .1s, background-color .1s ease;
    margin: -2px;
    padding: 2px;
    border-radius: 2px;
    position: relative;
}

a:hover {
    background: var(--hover-bg);
    color: white;
}

a:active {
    background: var(--active-bg);
    color: white;
}
</style>