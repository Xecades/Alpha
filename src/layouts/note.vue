<script setup>
import setupReveal from "@/assets/js/reveal";
import setupCursor from "@/assets/js/cursor";

setupReveal();
setupCursor();

const theme = {
    side_width: "300px",
}

console.debug("     Note layout loaded");
</script>

<template>
    <div class="wrapper">
        <NoteLeft id="left" />
        <NoteContent id="content">
            <RouterView id="main" />
        </NoteContent>
        <NoteRight id="right" />
    </div>
</template>

<style scoped>
.wrapper {
    width: 100vw;
    display: flex;
}

#content {
    flex-grow: 1;
}

#left,
#right {
    flex-shrink: 0;
    position: sticky;
    top: 0;
    width: v-bind("theme.side_width");
    height: 100vh;
}
</style>
