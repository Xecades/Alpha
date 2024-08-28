<script setup lang="ts">
const props = defineProps<{
    text: string,
    rbclass: string,
    rtclass: string,
    class: string
}>();
</script>

<template>
    <ruby :class="class">
        <rb :class="rbclass">
            <slot />
        </rb>
        <rt :class="rtclass">
            {{ text }}
        </rt>
    </ruby>
</template>

<style scoped>
rt {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
}
</style>