<script setup>
/**
 * @todo 不需要传入完整的 posts，后续改为 postAttrs，etc.
 */
const props = defineProps({
    posts: Object,
});
</script>

<template>
    <div>
        <div class="menu cursor">
            <font-awesome-icon :icon="['fas', 'bars']" />
        </div>
        <div class="category">
            <!-- PLACEHOLDER -->
        </div>
    </div>
</template>

<style scoped>
* {
    --margin-top: 28px;
    --margin-left: 35px;

    --menu-width: 42px;
    --menu-height: 40px;
    --menu-color: #cecece;
    --menu-bg-hover-color: #e8e9e97d;
}

.menu {
    margin-top: var(--margin-top);
    margin-left: var(--margin-left);

    height: var(--menu-height);
    width: var(--menu-width);
    text-align: center;
    line-height: var(--menu-height);
    font-size: 1.4rem;
    border-radius: 3px;
    transition: background-color .15s;
    color: var(--menu-color);
}

.menu:hover {
    background-color: var(--menu-bg-hover-color);
}
</style>