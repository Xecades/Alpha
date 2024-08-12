<script setup>
/**
 * @todo 不需要传入完整的 posts，后续改为 postAttrs，etc.
 */
const props = defineProps({
    posts: Object,
});
</script>

<template>
    <!-- 临时样式 -->
    <div style="text-align: right; padding-top: 6rem;">
        LEFT BAR - CATEGORY & SEARCH
    </div>
</template>
