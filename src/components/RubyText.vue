<script setup>
const props = defineProps({
    text: String,
    rbclass: String,
    rtclass: String,
    class: String
});
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