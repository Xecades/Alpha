<script setup>
import setupReveal from "@/assets/js/reveal";
import setupCursor from "@/assets/js/cursor";

setupReveal();
setupCursor();

console.debug("     Note layout loaded");
</script>

<template>
    <div class="wrapper">
        <NoteLeft id="left" />
        <NoteContent id="content">
            <RouterView />
        </NoteContent>
        <NoteRight id="right" />
    </div>
</template>

<style scoped>
:global(:root) {
    --content-width: 740px;
    --content-margin-lr: 3rem;
}

.wrapper {
    width: 100vw;
    display: flex;
}

#content {
    width: var(--content-width);
}

#left,
#right {
    position: sticky;
    top: 0;
    width: calc((100vw - var(--content-width)) / 2);
    height: 100vh;
}
</style>
