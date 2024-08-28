<script setup lang="ts">
type fn = () => void;

const props = defineProps<{
    src: string | fn,
    mode?: "stay" | "jump"
}>();

const isButton: boolean = props.src instanceof Function;
const inside: boolean = !isButton && (props.src as string).startsWith("/");
const rmode: "stay" | "jump" = props.mode ?? (inside ? "stay" : "jump");
</script>

<template>
    <template v-if="isButton">
        <a class="cursor" @click="(src as fn)">
            <slot />
        </a>
    </template>

    <template v-else-if="rmode == 'stay'">
        <router-link :to="encodeURI(src as string)" v-if="inside" class="cursor">
            <slot />
        </router-link>
        <a :href="(src as string)" v-else class="cursor">
            <slot />
        </a>
    </template>

    <template v-else>
        <a :href="(src as string)" target="_blank" class="cursor">
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