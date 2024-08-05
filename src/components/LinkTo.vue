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
a {
    color: rgb(0, 93, 146);
    transition: opacity 0.2s;
    opacity: .7;
}

a:hover {
    opacity: 1;
}

a:active {
    opacity: .9;
}
</style>