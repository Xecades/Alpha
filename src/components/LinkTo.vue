<script setup>
const $ = defineProps({
    src: String,
    mode: String
});

const inside = $.src.startsWith("/");
const rmode = $.mode ?? (inside ? "stay" : "jump");
</script>

<template>
    <template v-if="rmode == 'stay'">
        <router-link :to="encodeURI(src)" v-if="inside" class="cursor">
            <slot />
        </router-link>
        <a :href="src" v-else class="cursor">
            <slot />
        </a>
    </template>

    <template v-else>
        <a :href="src" target="_blank" class="cursor">
            <slot />
        </a>
    </template>
</template>

<style scoped>
a {
    color: rgb(0, 93, 146);
    transition: opacity 0.2s;
    opacity: .7;
    text-decoration: none;
}

a:hover {
    opacity: 1;
}

a:active {
    opacity: .9;
}
</style>