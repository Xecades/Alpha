<script setup>
/**
 * @todo ToC 需要支持 Components，考虑从 markdown 文件中直接解析
 * @todo 真的需要吗？还是直接对其中的 LaTeX 部分进行处理？
 * 
 * @todo 是先在 note.vue 处理完需要的数据，还是直接把 posts 传给 Components？
 * @reply 先在本文件处理完
 * 
 * @todo vite-plugin-markdown 无论如何都会渲染一遍 html，如果多次获取会不会很慢？
 *       vite 对此是否有优化？
 *       @ https://github.com/hmsk/vite-plugin-markdown/blob/main/src/index.ts#L60
 * 
 * @todo 是否需要 index.md 页面？
 * @todo index.md 页面应该写什么？只需要 abstract 即可，也可以省略不要
 * @todo 分类直接用 index.md 的 title 是否合适？合适
 * @todo index.md 添加 Vue 组件
 * 
 * @todo 添加点击跳转顶部的功能
 */

import { ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

// Components
import LeftBar from "@/components/note/LeftBar.vue";
import RightBar from "@/components/note/RightBar.vue";
import Content from "@/components/note/Content.vue";

// Markdown
import InlineMath from "@/components/md/InlineMath.vue";
import BlockMath from "@/components/md/BlockMath.vue";


// @ https://github.com/Modyfi/vite-plugin-yaml
import config from "@note/config.yml";


// setup's
import setupReveal from "@/assets/js/reveal";
import { setupCursor } from "@/assets/js/cursor";
import toc from "@/assets/js/note/toc";

setupReveal();
setupCursor();

const route = useRoute();

// https://cn.vitejs.dev/guide/features.html#glob-import
// https://github.com/hmsk/vite-plugin-markdown/blob/main/examples/vue/src/App.vue#L22
const posts = {
    md: import.meta.glob("@note/**/*.md", { import: "markdown" }),
    vue: import.meta.glob("@note/**/*.md", { import: "VueComponentWith" }),
    attr: import.meta.glob("@note/**/*.md", { import: "attributes" }),
    toc: import.meta.glob("@note/**/*.md", { import: "toc" }),
};


const injectComps = { InlineMath, BlockMath };
const postBody = shallowRef();
const postAttrs = shallowRef({});
const postToc = shallowRef([]);
const titlePath = ref([]);

const to_local = (path) => {
    let tmp = Array.from(path);  // Deep copy

    if (tmp === "") tmp = ["note"];
    else tmp.unshift("note");

    let src = "/" + tmp.join("/");

    if (posts.md[src + ".md"]) return src + ".md"; // Normal post
    else if (posts.md[src + "/index.md"]) return src + "/index.md"; // Index page
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

        let attr = await posts.attr[partial_src]();

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
            postBody.value = (await posts.vue[src]())(injectComps);
            postAttrs.value = await posts.attr[src]();
            postToc.value = toc(await posts.md[src]());
            titlePath.value = await resolvePath(path);

            console.log("postAttrs:", postAttrs.value);
            console.log("postToc:", postToc.value);
        } else {
            postBody.value = null;
            postAttrs.value = {};
            postToc.value = {};
            titlePath.value = [];
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="container">
        <LeftBar id="left" :posts="posts" />
        <Content id="content" :body="postBody" :attr="postAttrs" :path="titlePath" />
        <RightBar id="right" :toc_raw="postToc" />
    </div>
</template>

<style scoped>
* {
    --content-width: 740px;
}

.container {
    width: 100vw;
    display: flex;
}

#content {
    width: var(--content-width);
}

#left,
#right {
    position: sticky;
    top: 0;
    width: calc((100vw - var(--content-width)) / 2);
    height: 100vh;
}
</style>