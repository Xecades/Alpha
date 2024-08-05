<script setup>
import HomeLayout from "@/layout/home.vue";
import { ruby, link } from "@/assets/js/home/utils";

const data = {
    "title": "404 Not Found",
    "subtitle": "抱歉，",
    "body": [
        ["请检查你访问的网址是否正确，"],
        ["或者点击", link(ruby("这里", "/index"), "/"), "返回主页。"]
    ]
};
</script>

<template>
    <HomeLayout :data="data" />
</template>
