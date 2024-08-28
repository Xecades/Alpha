<script setup>
import { render_block } from "@/assets/js/latex";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const props = defineProps({ data: String });

const raw = decodeURI(props.data);
const parsed = render_block(raw);

const osOptions = {
    scrollbars: { autoHide: "move" },
    overflow: { y: "visible-hidden" },
};
</script>

<template>
    <OverlayScrollbarsComponent element="p" :options="osOptions" v-html="parsed" />
</template>
