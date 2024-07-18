<script setup>
import setupReveal from "@/assets/js/reveal";
import setupCursor from "@/assets/js/cursor";
import { parsePath } from "@/assets/js/noteUtils";
import { useRoute } from "vue-router";
import { computed } from "vue";

setupReveal();
setupCursor();

const route = useRoute();
const path = computed(() => parsePath(route.path));

console.debug("     Note layout loaded");
</script>

<template>
    <NoteHeader />
    <main>
        <NoteSidebar v-if="path" id="sidebar" />
        <NoteContent id="content">
            <RouterView id="main" />
        </NoteContent>
    </main>
    <NoteFooter />
</template>

<style scoped>
* {
    --sidebar-width: 250px;
}

main {
    padding-top: calc(48px + 30px);
    width: 1100px;
    margin: 0 auto;
    display: flex;
}

#sidebar {
    width: var(--sidebar-width);
}

#content {
    flex: 1;
}
</style>