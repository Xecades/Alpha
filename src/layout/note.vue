<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ScrollListener } from "@/assets/js/note/rightbar";
import { NOTE_L_STATUS, NOTE_R_STATUS } from "@script/types";

import LeftBar from "@/components/note/LeftBar.vue";
import RightBar from "@/components/note/RightBar.vue";
import Content from "@/components/note/Content.vue";

import { leftbar_status, rightbar_status } from "@/assets/js/note/utils";
import setupReveal from "@/assets/js/reveal";
import cursor from "@/assets/js/cursor";

import type { Ref } from "vue";

setupReveal();
cursor.setup();

const route = useRoute();
const in_view: Ref<number | null> = ref(null);
const sl: ScrollListener = new ScrollListener(in_view);

const r_status: Ref<NOTE_R_STATUS> = ref(rightbar_status());
const l_status: Ref<NOTE_L_STATUS> = ref(leftbar_status());

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

window.onresize = () => {
    r_status.value = rightbar_status();
    l_status.value = leftbar_status();
};
</script>

<template>
    <div class="note-layout" id="main">
        <LeftBar :status="l_status" />
        <Content @update="content_update" />
        <RightBar :in_view="in_view" v-if="r_status === NOTE_R_STATUS.SHOW" />
    </div>
</template>

<style scoped>
.note-layout {
    width: 100vw;
    display: flex;
}
</style>
