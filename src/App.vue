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
