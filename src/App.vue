<script setup>
/**
 * @see https://github.com/mercs600/vue3-perfect-scrollbar
 */
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import logger from "./assets/js/logger";

const router = useRouter();
const scrollbarApi = ref(null);

const syncScroll = async () => {
    await nextTick();
    scrollbarApi.value?.ps.update();
    logger.nbsp("Scrollbar updated");
};

router.afterEach(syncScroll);
window.onresize = syncScroll;
</script>

<template>
    <PerfectScrollbar class="ps-main" ref="scrollbarApi">
        <RouterView />
    </PerfectScrollbar>
</template>

<style>
/* Fade out when route changes */
.fade-out {
    opacity: 0;
    scale: .99;
    transition: all .1s ease-in;
}
</style>

<style scoped>
/* Meet Perfect-Scrollbar requirements */
/* @see https://perfectscrollbar.com/how-to-use.html */
.ps-main {
    height: 100vh;
}
</style>