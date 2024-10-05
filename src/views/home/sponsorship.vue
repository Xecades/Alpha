<script setup lang="tsx">
import HomeLayout from "@/layout/home.vue";
import { ruby, link, table, small } from "@/assets/ts/home/partials";
import { ref, watch } from "vue";

import type { Element } from "@/assets/ts/home/partials";
import type { Ref } from "vue";

const raw = [
    {
        nick: "m*i",
        money: 100.0,
        desc: "加油鸭",
    },
    {
        nick: "Timmy",
        money: 10.0,
        desc: "—",
    },
    {
        nick: "alpacabro",
        money: 6.66,
        desc: "高考加油！",
    },
    {
        nick: "匿名者",
        money: 16.67,
        desc: "同为高三，望大学相见",
    },
    {
        nick: "L*s",
        money: 99.0,
        desc: "莫反的文章不错，加油",
    },
    {
        nick: "s*r",
        money: 28.88,
        desc: "望不忘初心，继续努力",
    },
    {
        nick: "G*e",
        money: 20.0,
        desc: "请你的下午茶~",
    },
    {
        nick: "*师",
        money: 32.3,
        desc: "网站很有趣，人应当也很有趣吧",
    },
    {
        nick: "**烨",
        money: 11.45,
        desc: "加油鸭",
    },
].reverse();

const show: Ref<boolean> = ref(false);
const toggle = () => (show.value = !show.value);

const to_table = (x: (typeof raw)[0]) => ({
    name: (
        <>
            {x.nick}
            <span class="money hide">（{x.money.toFixed(2)} 元）</span>
        </>
    ),
    desc: x.desc,
    url: () => {},
});

const no_select = (x: Element) => <span class="no-select">{x}</span>;
const here = () =>
    no_select(link(ruby("这里", show.value ? "ON" : "OFF"), toggle));

const data = ref({
    title: "赞助者",
    subtitle: "谢谢你，",
    body: [
        ["你的每一分善意都将被他记在心中。"],
        table(raw.map(to_table)),
        small("注：手动更新，排名不分先后。所有赞助将用于网站维护。"),
        [
            "你可以点击",
            here(),
            "切换赞助金额显示，或者点击回到",
            link(ruby("主页", "/index"), "/"),
            "或",
            link(ruby("赞助", "/sponsor"), "/sponsor"),
            "页面。",
        ],
    ],
});

watch(show, () => {
    // @ts-ignore
    data.value.body[3][1] = here();
    document.querySelectorAll(".home-layout .money").forEach((x) => {
        x.classList.toggle("hide");
    });
});
</script>

<template>
    <HomeLayout :data="data" />
</template>

<style>
.home-layout .money {
    transition: opacity 0.2s ease-in-out;
}

.home-layout .money.hide {
    opacity: 0;
}
</style>
