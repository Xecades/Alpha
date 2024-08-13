<script setup>
/**
 * @todo 不需要传入完整的 posts，后续改为 postAttrs，etc.
 */
const props = defineProps({
    toc: Object,
});
</script>

<template>
    <!-- 临时样式 -->
    <div style="padding-top: 6rem;">
        RIGHT BAR - TOC
        <p>
            {{ toc }}
        </p>
    </div>
</template>
