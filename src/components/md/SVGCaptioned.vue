<script setup lang="ts">
const props = defineProps<{ svg: string; alt: string }>();
</script>

<template>
    <figure class="svg-container">
        <div class="svg" v-html="svg"></div>
        <figcaption :title="alt">
            <slot />
        </figcaption>
    </figure>
</template>

<style scoped>
.svg-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    padding: 0;
}

.svg {
    width: fit-content;
    max-height: 20em;
}

.svg > * {
    max-width: 100%;
}

figcaption {
    font-size: 0.8em;
    color: #8d8d8d;
    text-align: center;
    text-decoration: underline dotted;
    text-underline-offset: 4px;
}

@media (prefers-color-scheme: dark) {
    .svg {
        filter: invert(0.75);
    }
}

@media (max-width: 768px) {
    .svg {
        max-height: 15em;
    }
}
</style>
