<script setup>
import setupReveal from "@/assets/js/reveal";
import setupCursor from "@/assets/js/cursor";

setupReveal();
setupCursor();

console.debug("     Note layout loaded");
</script>

<template>
    <!-- <css-doodle click-to-update>
        @grid: 7 / 100vmax / #0a0c27;
        @shape: clover 5;
        background: hsla(-@i(*4), 70%, 68%, @r.8);
        transform:
            scale(@r(.2, 1.5))
            translate(@m2.@r(±50%));
    </css-doodle> -->
    <div class="pattern"></div>
    <div class="wrapper">
        <NoteLeft id="left" />
        <NoteContent id="content">
            <RouterView id="main" />
        </NoteContent>
        <NoteRight id="right" />
    </div>
</template>

<style scoped>
:global(:root) {
    --content-width: 740px;
    --content-margin-lr: 3rem;
}

.pattern {
    width: 100vw;
    height: 13rem;
    --s: 84px;
    --c1: #f2f2f2;
    --c2: #dbdbdb;
    --c3: #cccccc;

    --_g: 0 120deg, #0000 0;
    background: conic-gradient(from 0deg at calc(500% / 6) calc(100% / 3),
            var(--c3) var(--_g)),
        conic-gradient(from -120deg at calc(100% / 6) calc(100% / 3),
            var(--c2) var(--_g)),
        conic-gradient(from 120deg at calc(100% / 3) calc(500% / 6),
            var(--c1) var(--_g)),
        conic-gradient(from 120deg at calc(200% / 3) calc(500% / 6),
            var(--c1) var(--_g)),
        conic-gradient(from -180deg at calc(100% / 3) 50%,
            var(--c2) 60deg,
            var(--c1) var(--_g)),
        conic-gradient(from 60deg at calc(200% / 3) 50%,
            var(--c1) 60deg,
            var(--c3) var(--_g)),
        conic-gradient(from -60deg at 50% calc(100% / 3),
            var(--c1) 120deg,
            var(--c2) 0 240deg,
            var(--c3) 0);
    background-size: calc(var(--s) * 1.732) var(--s);
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
