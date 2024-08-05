<script setup>
const props = defineProps({
    src: String | Function,
    mode: String
});

const isButton = props.src instanceof Function;
const inside = !isButton && props.src.startsWith("/");
const rmode = props.mode ?? (inside ? "stay" : "jump");
</script>

<template>
    <template v-if="isButton">
        <a class="cursor" @click="src">
            <slot />
        </a>
    </template>

    <template v-else-if="rmode == 'stay'">
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
* {
    --color: rgb(0, 93, 146);
    --opacity: .7;
    --hover-opacity: 1;
    --active-opacity: .9;
}

a {
    color: var(--color);
    transition: opacity 0.2s;
    opacity: var(--opacity);
}

a:hover {
    --opacity: var(--hover-opacity);
}

a:active {
    --opacity: var(--active-opacity);
}
</style>