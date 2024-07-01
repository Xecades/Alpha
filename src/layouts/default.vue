<script setup>
import setupReveal from "@/assets/js/reveal";
import setupCursor from "@/assets/js/cursor";

setupReveal();
setupCursor();

console.debug("     Default layout loaded");
</script>

<template>
    <main>
        <!-- [Default Layout] -->
        <RouterView id="main" />
    </main>
</template>
