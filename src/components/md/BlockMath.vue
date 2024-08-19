<script setup>
import katex from "katex";

const props = defineProps({
    data: String
});

const options = {
    displayMode: true,
    throwOnError: true,
};

const render = (raw) => {
    try {
        return katex.renderToString(raw, options);
    } catch (error) {
        console.log(error);
        return raw;
    }
};

const raw = decodeURI(props.data);
const parsed = render(raw);
</script>

<template>
    <p v-html="parsed"></p>
</template>
