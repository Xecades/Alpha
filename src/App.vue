<script setup>
import { RouterView } from "vue-router";
import cursorSync from "./assets/js/cursor";

cursorSync();
</script>

<template>
    <RouterView />
</template>

<style>
/* Fade out when route changes */
.fade-out {
    opacity: 0;
    scale: .99;
    transition: all .1s ease-in;
}
</style>