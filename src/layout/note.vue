<script setup lang="ts">
/**
 * @todo index.md 页面应该写什么？只需要 abstract 即可，也可以省略不要
 * @todo index.md 添加 Vue 组件
 */

import { ref, watch, type Ref } from "vue";
import { ScrollListener } from "@/assets/js/note/rightbar";
import { useRoute } from "vue-router";

import LeftBar from "@/components/note/LeftBar.vue";
import RightBar from "@/components/note/RightBar.vue";
import Content from "@/components/note/Content.vue";

import setupReveal from "@/assets/js/reveal";
import cursor from "@/assets/js/cursor";

setupReveal();
cursor.setup();

const route = useRoute();
const in_view: Ref<number | null> = ref(null);
const sl: ScrollListener = new ScrollListener(in_view);

/**
 * Triggers when markdown content rendered.
 *
 * @param target - The target element to update
 */
const content_update = (target: HTMLElement) => {
    // Only listen to headings
    if (target.classList.contains("heading")) {
        sl.listen(target);
    }
};

// Reset the scroll listener when route changes
watch(() => route.path, sl.reset.bind(sl));
</script>

<template>
    <div class="note-layout" id="main">
        <LeftBar />
        <Content @update="content_update" />
        <RightBar :in_view="in_view" />
    </div>
</template>

<style scoped>
.note-layout {
    width: 100vw;
    display: flex;
}
</style>
