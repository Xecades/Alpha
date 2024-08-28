<script setup lang="ts">
import { render_inline } from "@/assets/js/latex";

const props = defineProps<{ data: string }>();

const raw: string = decodeURI(props.data);
const parsed: string = render_inline(raw);
</script>

<template>
    <span v-html="parsed"></span>
</template>
