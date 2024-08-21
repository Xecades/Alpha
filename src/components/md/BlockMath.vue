<script setup>
import { render_block } from "@/assets/js/latex";

const props = defineProps({ data: String });

const raw = decodeURI(props.data);
const parsed = render_block(raw);
</script>

<template>
    <p v-html="parsed"></p>
</template>
