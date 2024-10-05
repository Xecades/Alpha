<script setup lang="ts">
import HomeLayout from "@/layout/home.vue";
import { ruby, link, table } from "@/assets/ts/home/partials";

const data = {
    "title": "友人帐",
    "subtitle": "有故事的人们。",
    "body": [
        table([
            {
                name: "Mivik",
                desc: "兴趣使然のProgrammer",
                url: "https://mivik.gitee.io/",
            },
            {
                name: "甘小蔗",
                desc: "“一株情感延迟的全栈工程蔗”",
                url: "https://gxzv.com/",
            },
            {
                name: "GZTime",
                desc: "Walking on the Time Axis",
                url: "https://blog.gzti.me/",
            },
            {
                name: "FFox",
                desc: "“不知道在学什么的老学长”",
                url: "https://frightenedfoxcn.github.io/notes/",
            },
            {
                name: "fufu酱",
                desc: "“爱折腾的大学生”",
                url: "https://csfufu.life/",
            },
            {
                name: "memset0",
                desc: "在海月的虚空中，纵身飞过秋凉的时鸟。",
                url: "https://mem.ac/",
            }
        ]),
        ["除此之外，你可以点", link(ruby("这里", "/index"), "/"), "回到主页。"],
    ]
};
</script>

<template>
    <HomeLayout :data="data" />
</template>
