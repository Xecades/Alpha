<script setup lang="ts">
/**
 * @todo index.md 页面应该写什么？只需要 abstract 即可，也可以省略不要
 * @todo index.md 添加 Vue 组件
 *
 * @todo 处理 front matter
 */

// Components
import LeftBar from "@/components/note/LeftBar.vue";
import RightBar from "@/components/note/RightBar.vue";
import Content from "@/components/note/Content.vue";

// Setup's
import setupReveal from "@/assets/js/reveal";
import cursor from "@/assets/js/cursor";

setupReveal();
cursor.setup();
</script>

<template>
    <div class="note-layout" id="main">
        <LeftBar />
        <Content />
        <RightBar />
    </div>
</template>

<style scoped>
.note-layout {
    width: 100vw;
    display: flex;
}
</style>
