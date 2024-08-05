<script setup>
import HomeLayout from "@/layout/home.vue";
import { ruby, link } from "@/assets/js/home/utils";

const data = {
    "title": "关于我，",
    "subtitle": "那个自称为 Xecades 的人。",
    "body": [
        ["他出生于 00 后的第一个", ruby("鸡年", "2005"), "，居住在中国南方的一个小县城。"],
        [
            "他初中就读于", link("绵阳东辰", "http://mydcis.net/"),
            "，高中在", link("成都七中", "http://www.cdqz.net/"),
            "。从初中二年级到高中一年级，他曾是一名", ruby("信竞选手", "OIer"),
            "，只不过那些知识他已经忘得差不多了。"
        ],
        ["兴趣让他沉浸于有趣的知识不能自拔，他渴望知道更多、学习更多。他乐于创造，勤于思考，希望有一双能发现美的眼睛。"],
        ["他不喜欢娱乐圈的歪风邪气，所以尽量不要和他聊这些东西。但这并不表明他是一个极为严肃的人，他只是不喜欢人云亦云、哗众取宠。"],
        ["他也追星，只不过追的是先秦诸子和中华豪杰：孔丘、李白、鲁迅，先生们是他一生的榜样。"],
        [
            "他的邮箱是 i[at]xecades.xyz，",
            "这里是他的 ", link("Telegram 账号", "https://t.me/Xecades"), "和 ",
            link("Github 账号", "https://github.com/Xecades"), 
            "。如果感兴趣，你可以通过这些渠道找到他。另外，你可以在网页控制台找到他的一些私人联系方式。"
        ],
        ["网站运营需要持续的开销，如果本站内容有幸能给您带来启发，欢迎", link(ruby("赞助", "/sponsor"), "/sponsor"), "。"],
        ["回主页的传送门在", link(ruby("这里", "/index"), "/"), "。"]
    ]
};
</script>

<template>
    <HomeLayout :data="data" />
</template>
