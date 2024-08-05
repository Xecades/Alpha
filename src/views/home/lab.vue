<script setup>
import HomeLayout from "@/layout/home.vue";
import { ruby, link, table } from "@/assets/js/home/partials";

const data = {
    "title": "实验室",
    "subtitle": "有一些好玩的东西。",
    "body": [
        table([
            {
                name: "Artificial Intelligence",
                desc: "BP 神经网络数字识别可视化",
                url: "https://ai.xecades.xyz/"
            },
            {
                name: "TIY",
                desc: "在线运行 HTML 代码",
                url: "https://tiy.xecades.xyz/"
            },
            {
                name: "Postcard API",
                desc: "个人身份卡片 API 及生成器",
                url: "https://api.xecades.xyz/"
            },
            {
                name: "hexo-tag-tiy",
                desc: "Hexo 内嵌 TIY",
                url: "https://github.com/Xecades/hexo-tag-tiy"
            },
            {
                name: "Fourier Transform",
                desc: "傅里叶级数绘图可视化",
                url: "/lab/Fourier/"
            },
            {
                name: "Cube Simulator",
                desc: "魔方模拟器",
                url: "/lab/Cube/"
            },
            {
                name: "Gravitation Simulator",
                desc: "二维星体运动模拟器",
                url: "/lab/Gravitation/"
            },
            {
                name: "Sort",
                desc: "排序算法可视化",
                url: "/lab/Sort/"
            },
        ]),
        ["对了，你可以点", link(ruby("这里", "/index"), "/"), "回到主页。"],
    ]
};
</script>

<template>
    <HomeLayout :data="data" />
</template>
