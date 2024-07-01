<script setup>
import setupReveal from "@/assets/js/reveal";
import setupCursor from "@/assets/js/cursor";
import { useRoute } from "vue-router";

setupReveal();
setupCursor();

// console.log(useRoute().meta);
console.debug("     Note layout loaded");
</script>

<template>
    <main>
        [Note layout]
        <RouterView id="main" />
    </main>
</template>
