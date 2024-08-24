<script setup>
import { ref } from "vue";

/**
 * @note 即使只载入 front matter 也会完整地渲染一遍 markdown，是否改成提前渲染？
 *       改成直接读取文件的形式是否会更快？
 * 
 * @note 需要显示的东西：
 *        - 搜索功能：全部文章的 markdown 源码
 *            以什么形式出现？点击出现 popup 窗口？
 *            是否需要提前生成索引文件？搜索的高亮如何处理？
 *            特殊 snippet 如何处理？（是否需要先用 markdown-it 渲染一遍？）
 *             * 采用 xdino 的设计方案
 *        - 文章目录：文章层级关系、全部文章的 title
 *            以什么样的形式展开？如果全部展开会不会太长？
 *            是 hover 触发还是和 ToC 一样处理？
 *             * 只要 hover 左侧 bar 即触发，范围大一点，只要鼠标停留在左侧就不消失（✓）
 */
const props = defineProps({
    config: Object,
});

const categories = ref([
    { name: "数学", opacity: 0 },
    { name: "计算机", opacity: 0 },
    { name: "CTF", opacity: 0 },
    { name: "其他", opacity: 0 },
]);

const ishover = ref(false);

const REVEAL_DELAY = 40;

const reveal_category = () => {
    let len = categories.value.length;

    for (let i = 0; i < len; i++) {
        clearTimeout(categories.value[i].timeout);

        let curr = setTimeout(() => {
            categories.value[i].opacity = 1;
        }, REVEAL_DELAY * i);

        categories.value[i].timeout = curr;
    }
};

const hide_category = () => {
    let len = categories.value.length;

    for (let i = len - 1; i >= 0; i--) {
        clearTimeout(categories.value[i].timeout);

        let curr = setTimeout(() => {
            categories.value[i].opacity = 0;
        }, REVEAL_DELAY * (len - 1 - i));

        categories.value[i].timeout = curr;
    }
};
</script>

<template>
    <div @mouseenter="ishover = true; reveal_category()" @mouseleave="ishover = false; hide_category()">
        <ul class="nav">
            <li class="btn cursor" id="search">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </li>
        </ul>
        <ul class="category">
            <template v-for="item in categories">
                <li class="item cursor" :style="{ opacity: item.opacity }">
                    {{ item.name }}
                </li>
            </template>
        </ul>
        <div class="content" v-show="ishover">
            {{ config }}
        </div>
    </div>
</template>

<style scoped>
* {
    --offset-top: 28px;
    --offset-left: 35px;

    --nav-width: 42px;
    --nav-height: 40px;
    --nav-gap: 2px;
    --nav-color: #cecece;
    --nav-hover-color: #a9a9a9;
    --nav-bg-hover-color: #f2f2f2c4;
}

.nav {
    margin-top: var(--offset-top);
    margin-left: var(--offset-left);
    display: flex;
    flex-direction: row;
    gap: var(--nav-gap);
}

.nav .btn {
    height: var(--nav-height);
    width: var(--nav-width);
    text-align: center;
    line-height: var(--nav-height);
    font-size: 1.2rem;
    border-radius: 3px;
    transition: background-color .15s, color .15s;
    color: var(--nav-color);
    display: block;
}

.category {
    position: absolute;
    display: flex;
    flex-direction: row;
    top: var(--offset-top);
    left: calc(var(--offset-left) + var(--nav-width) + var(--nav-gap));
    height: var(--nav-height);
    text-wrap: nowrap;
    overflow: hidden;
    border-radius: 4px;
}

.category .item {
    height: var(--nav-height);
    line-height: var(--nav-height);
    font-size: .9rem;
    padding: 0 12px;
    color: #888e8f;
    background-color: #fdfdfdf5;
    transition: background-color .15s, opacity .2s;
}

.category .item:hover {
    background-color: #f5f5f5fc;
}

.nav .btn:hover {
    background-color: var(--nav-bg-hover-color);
    color: var(--nav-hover-color);
}
</style>