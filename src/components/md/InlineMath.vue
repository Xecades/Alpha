<script setup lang="ts">
import { render_inline } from "@/assets/js/latex";

const props = defineProps<{ data: string }>();

const parsed: string = render_inline(props.data);
</script>

<template>
    <span v-html="parsed"></span>
</template>
