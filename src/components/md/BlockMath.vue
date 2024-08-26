<script setup>
import { render_block } from "@/assets/js/latex";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

const props = defineProps({ data: String });

const raw = decodeURI(props.data);
const parsed = render_block(raw);
</script>

<template>
    <PerfectScrollbar tag="p" v-html="parsed" />
</template>
