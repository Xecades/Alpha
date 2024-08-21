<script setup>
import { render_inline } from "@/assets/js/latex";

const props = defineProps({ data: String });

const raw = decodeURI(props.data);
const parsed = render_inline(raw);
</script>

<template>
    <span v-html="parsed"></span>
</template>
