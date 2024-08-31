<script setup lang="ts">
/**
 * @todo index.md 页面应该写什么？只需要 abstract 即可，也可以省略不要
 * @todo index.md 添加 Vue 组件
 * 
 * @todo 处理 front matter
 */

import { nextTick, ref, shallowRef, watch, type Component, type Ref } from "vue";
import { useRoute } from "vue-router";

// Components
import LeftBar from "@/components/note/LeftBar.vue";
import RightBar from "@/components/note/RightBar.vue";
import Content from "@/components/note/Content.vue";

// Setup's
import setupReveal from "@/assets/js/reveal";
import cursor from "@/assets/js/cursor";

// Cache
// @ts-ignore
import meta_cache from "@cache/note/meta";
// @ts-ignore
import comps_cache from "@cache/note/comps";
// @ts-ignore
import config_cache from "@cache/note/config";

// Types
import type { FMAttr } from "script/preprocess/parse-md";
import type { Header } from "script/toc";

type TitleLink = { title: string, link: string };
type MetaItem = { attr: FMAttr, toc: Header[] };


setupReveal();
cursor.setup();

const route = useRoute();

const postBodyFn: Ref<any> = shallowRef();
const postAttrs: Ref<FMAttr | {}> = shallowRef({});
const postToc: Ref<Header[]> = shallowRef([]);
const titlePath: Ref<TitleLink[]> = ref([]);

const in_view: Ref<null | number> = ref(null);


const setup_scroll = async () => {
    const in_viewport = (el: Element): boolean => {
        let rect: DOMRect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    in_view.value = null;

    await nextTick();
    const headings = document.querySelectorAll(".markdown .heading");

    window.onscroll = () => {
        for (let i = 0; i < headings.length; i++) {
            if (in_viewport(headings[i])) {
                in_view.value = i;
                break;
            }
        }
    };
};

const to_local = (path: string[]) => {
    let tmp: string[] = Array.from(path);  // Deep copy

    tmp.unshift("note");

    let src: string = tmp.join("/");

    if (meta_cache[src + ".md"]) return src + ".md"; // Normal post
    else if (meta_cache[src + "/index.md"]) return src + "/index.md"; // Index page
    else return null; // 404
};

// 将 Path 转化为 title 数组
const resolvePath = async (path: string[]) => {
    let ret: TitleLink[] = [];

    for (let i = 0; i < path.length - 1; i++) {
        let partial_path: string[] = path.slice(0, i + 1);
        let partial_src: string = to_local(partial_path) as string;

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
    async (path_raw: string | string[]) => {
        let path: string[];

        if (typeof path_raw === "string") path = [];
        else path = path_raw;

        let src: string | null = to_local(path);

        if (src) {
            postBodyFn.value = comps_cache[src];
            postAttrs.value = meta_cache[src].attr;
            postToc.value = meta_cache[src].toc;
            titlePath.value = await resolvePath(path);
            console.log("debug 1");
        } else {
            postBodyFn.value = null;
            postAttrs.value = {};
            postToc.value = [];
            titlePath.value = [];
        }
    },
    { immediate: true }
);

watch(postToc, setup_scroll, { immediate: true });
</script>

<template>
    <div class="note-layout" id="main">
        <LeftBar id="left" :config="config_cache" />
        <Content id="content" :renderer="postBodyFn" :attr="(postAttrs as FMAttr)" :path="titlePath" />
        <RightBar id="right" :toc_raw="postToc" :in_view="in_view" />
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

#content.hide {
    transition: opacity .1s ease-out;
    opacity: 0;
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