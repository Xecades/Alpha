<script setup lang="ts">
import { render_inline } from "@/assets/js/latex";
import { nextTick, onMounted, ref, type Ref } from "vue";

const props = defineProps<{ data: string }>();

const raw: string = decodeURI(props.data);
const parsed: Ref<string> = ref(raw);

onMounted(async () => {
    await nextTick();
    parsed.value = render_inline(parsed.value);
})
</script>

<template>
    <span v-html="parsed"></span>
</template>
