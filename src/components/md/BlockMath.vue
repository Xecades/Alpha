<script setup lang="ts">
import { render_block } from "@/assets/js/latex";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import type { PartialOptions } from "overlayscrollbars";

const props = defineProps<{ data: string }>();

const raw: string = decodeURI(props.data);
const parsed: string = render_block(raw);

const osOptions: PartialOptions = {
    scrollbars: { autoHide: "move" },
    overflow: { y: "visible-hidden" },
};
</script>

<template>
    <OverlayScrollbarsComponent element="p" :options="(osOptions as any)" v-html="parsed" />
</template>
