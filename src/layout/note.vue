<script setup>
/**
 * @todo ToC 需要支持 Components，考虑从 markdown 文件中直接解析
 * @todo 用 Config Nav 中的标题作为页面标题（？）
 * @todo Config Nav 真的需要设置标题吗？还是说直接用 Front Matter 的 title？
 */

import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

// @ https://github.com/Modyfi/vite-plugin-yaml
import config from "@note/config.yml";

// @ https://github.com/mathiasbynens/he
// + To decode HTML entities, e.g. &#x5915; -> 夕
import { decode as dingbatDecode } from "he";


const route = useRoute();

// https://cn.vitejs.dev/guide/features.html#glob-import
// https://github.com/hmsk/vite-plugin-markdown/blob/main/examples/vue/src/App.vue#L22
const posts = {
    md: import.meta.glob("@note/**/*.md", { import: "markdown" }),
    vue: import.meta.glob("@note/**/*.md", { import: "VueComponentWith" }),
    attr: import.meta.glob("@note/**/*.md", { import: "attributes" }),
    toc: import.meta.glob("@note/**/*.md", { import: "toc" }),
};


const injectComps = {};
const postBody = shallowRef();
const postAttrs = shallowRef({});
const postToc = shallowRef({});

const to_local = (path) => {
    if (path === "") path = ["note"];
    else path.unshift("note");

    let src = "/" + path.join("/");

    if (posts.md[src + ".md"]) return src + ".md"; // Normal post
    else if (posts.md[src + "/index.md"]) return src + "/index.md"; // Index page
    else return null; // 404
};

const toc_decode = (toc) => toc.map((item) => {
    item.content = dingbatDecode(item.content);
    return item;
});


watch(
    () => route.params.path,
    async (path) => {
        let src = to_local(path);
        console.log(src);

        if (src) {
            postBody.value = (await posts.vue[src]())(injectComps);
            postAttrs.value = await posts.attr[src]();
            postToc.value = toc_decode(await posts.toc[src]());

            console.log(postAttrs.value);
            console.log(postToc.value);
        } else {
            postBody.value = null;
            postAttrs.value = {};
            postToc.value = {};
        }
    },
    { immediate: true }
);
</script>

<template>
    <div>
        <div>
            {{ postAttrs }}
        </div>
        <div>
            {{ postToc }}
        </div>
        <div>
            {{ config }}
        </div>
        <!-- https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components -->
        <component :is="postBody" />
    </div>
</template>
