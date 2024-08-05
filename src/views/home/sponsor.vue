<script setup>
import HomeLayout from "@/layout/home.vue";
import { ruby, link, small, sponsor } from "@/assets/js/home/partials";

import WechatQR from "@/assets/img/wechat.jpg";
import AlipayQR from "@/assets/img/alipay.jpg";

const data = {
    "title": "赞助",
    "subtitle": "谢谢你，陌生人。",
    "body": [
        sponsor(WechatQR, AlipayQR),
        small("注：建议在支付备注栏填写你的昵称和寄语，请尽量简短。"),
        ["十分感谢为我提供了赞助的伙伴们！你可以", link(ruby("点击这里", "/sponsorship"), "/sponsorship"), "查看明细。"],
        ["你也可以点击", link(ruby("这里", "/index"), "/"), "返回主页。"]
    ]
};
</script>

<template>
    <HomeLayout :data="data" />
</template>
