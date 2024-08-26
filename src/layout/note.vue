<script setup>
/**
 * @todo index.md 页面应该写什么？只需要 abstract 即可，也可以省略不要
 * @todo index.md 添加 Vue 组件
 * 
 * @todo 处理 front matter
 */

import { ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

// Components
import LeftBar from "@/components/note/LeftBar.vue";
import RightBar from "@/components/note/RightBar.vue";
import Content from "@/components/note/Content.vue";

// Markdown
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import Anchor from "@/components/md/Anchor.vue";

// Setup's
import setupReveal from "@/assets/js/reveal";
import { setupCursor } from "@/assets/js/cursor";

// Cache
import meta_cache from "@cache/note/meta";
import comps_cache from "@cache/note/comps";
import config_cache from "@cache/note/config";


setupReveal();
setupCursor();

const route = useRoute();

const injectComps = { InlineMath, BlockMath, Anchor, ImageCaptioned };
const postBody = shallowRef();
const postAttrs = shallowRef({});
const postToc = shallowRef([]);
const titlePath = ref([]);

const to_local = (path) => {
    let tmp = Array.from(path);  // Deep copy

    if (tmp === "") tmp = ["note"];
    else tmp.unshift("note");

    let src = tmp.join("/");

    if (meta_cache[src + ".md"]) return src + ".md"; // Normal post
    else if (meta_cache[src + "/index.md"]) return src + "/index.md"; // Index page
    else return null; // 404
};

/**
 * 将 Path 转化为 title 数组
 * 
 * @param {Array} path 路径数组
 */
const resolvePath = async (path) => {
    let ret = [];

    for (let i = 0; i < path.length - 1; i++) {
        let partial_path = path.slice(0, i + 1);
        let partial_src = to_local(partial_path);

        let attr = meta_cache[partial_src].attr;

        ret.push({
            title: attr.title,
            link: "/note/" + partial_path.join("/")
        });
    }

    return ret;
};


watch(
    () => route.params.path,
    async (path) => {
        let src = to_local(path);

        if (src) {
            postBody.value = comps_cache[src](injectComps);
            postAttrs.value = meta_cache[src].attr;
            postToc.value = meta_cache[src].toc;
            titlePath.value = await resolvePath(path);
        } else {
            postBody.value = null;
            postAttrs.value = {};
            postToc.value = [];
            titlePath.value = [];
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="note-layout">
        <LeftBar id="left" :config="config_cache" />
        <Content id="content" :body="postBody" :attr="postAttrs" :path="titlePath" />
        <RightBar id="right" :toc_raw="postToc" />
    </div>
</template>

<style scoped>
* {
    --content-width: 740px;
}

.note-layout {
    width: 100vw;
    display: flex;
}

#content {
    width: var(--content-width);
    z-index: 10;
}

#left,
#right {
    position: sticky;
    top: 0;
    width: calc((100vw - var(--content-width)) / 2);
    height: 100vh;
    z-index: 100;
}
</style>