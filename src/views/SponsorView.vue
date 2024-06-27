<script setup>
import HomeLayout from "@/layouts/HomeLayout.vue";
import { ruby, link } from "@/assets/js/homeUtils";

const data = {
    "title": "赞助",
    "subtitle": "谢谢你，陌生人。",
    "body": [
        // TODO
        ["注：建议在支付备注栏填写你的昵称和寄语，请尽量简短，感谢。"],
        ["十分感谢为我提供了赞助的伙伴们！你可以", link(ruby("点击这里", "/sponsorship"), "/sponsorship"), "查看明细。"],
        ["你也可以点击", link(ruby("这里", "/index"), "/"), "返回主页。"]
    ]
};
</script>

<template>
    <HomeLayout :data="data" />
</template>
