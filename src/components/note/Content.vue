<script setup lang="tsx">
/**
 * @todo 图片缓存，不能每次都重新加载一遍
 */

import { computed, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import { reveal_config } from "@/assets/ts/reveal";
import { assertType } from "@script/types";
import ScrollReveal from "scrollreveal";

import Timestamp from "./Timestamp.vue";
import Comment from "./Comment.vue";
import Metadata from "./Metadata.vue";
import JSXLazyLoad from "../JSXLazyLoad.vue";

import "@/assets/css/markdown.css";

// Types
import type { Ref } from "vue";
import type { RouteMeta } from "@script/types";
import type { JSX } from "vue/jsx-runtime";

const emit = defineEmits(["update"]);
const route = useRoute();

const meta: Ref<RouteMeta> = computed(() => assertType<RouteMeta>(route.meta));
const jsx: Ref<() => Promise<{ default: () => JSX.Element }>> = computed(
    () => meta.value.body
);

const body: Ref<() => JSX.Element> = shallowRef(() => <></>);
const lazyload_key: Ref<string> = ref("");
const rendering: Ref<boolean> = ref(true);
const navigation: Ref<boolean> = ref(false);

/**
 * Whether to show timestamp.
 *
 * @note - If is rendering, return false.
 *       - If not specified in front-matter, return true if it is a post.
 *       - Otherwise, return the value in front-matter.
 */
const show_timestamp: Ref<boolean> = computed(() => {
    if (rendering.value) return false;
    if (meta.value.attr.timestamp === undefined)
        return meta.value.type === "post";
    return meta.value.attr.timestamp;
});

/**
 * Whether to show comments.
 *
 * @note - If is rendering, return false.
 *       - If not specified in front-matter, return true if it is a post.
 *       - Otherwise, return the value in front-matter.
 */
const show_comment: Ref<boolean> = computed(() => {
    if (rendering.value) return false;
    if (meta.value.attr.comment === undefined)
        return meta.value.type === "post";
    return meta.value.attr.comment;
});

/**
 * Iterate through headings and register anchor click event.
 */
const register_anchor = () => {
    const headings = document.querySelectorAll(".heading");

    headings.forEach((heading) => {
        const anchor = heading.querySelector(".header-anchor");
        if (anchor) {
            anchor.addEventListener("click", (e: Event) => {
                e.preventDefault();

                const offset: number = -4 * 16;
                const y: number =
                    heading.getBoundingClientRect().top +
                    window.scrollY +
                    offset;

                window.scrollTo({ top: y, behavior: "smooth" });
            });
        }
    });
};

/**
 * Callback function when JSX lazyload finishes.
 */
const lazyload_finish = () => {
    register_anchor();
    rendering.value = false;
};

/**
 * Callback function when JSX lazyload updates.
 */
const lazyload_update = (index: number) => {
    const selector: string = ".markdown > *";
    const els: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
    const target: HTMLElement = els[index - 1];

    emit("update", target);

    setTimeout(() => {
        ScrollReveal().reveal(target, reveal_config);
    }, 0);
};

watch(
    () => route.path,
    async () => {
        rendering.value = true;
        navigation.value = true;
        body.value = (await jsx.value()).default;

        lazyload_key.value = route.path;
        navigation.value = false;
    },
    { immediate: true }
);
</script>

<template>
    <div id="content">
        <!-- 通过 key 强制组件刷新，从而正常触发动画 -->
        <header :key="meta.attr.title">
            <h1>{{ meta.attr.title }}</h1>
        </header>
        <Metadata :key="meta.attr.title" />

        <main class="markdown">
            <JSXLazyLoad
                :data="body"
                :key="lazyload_key"
                v-if="!navigation"
                @finish="lazyload_finish"
                @update="lazyload_update"
            />
        </main>

        <Timestamp v-if="show_timestamp" />
        <Comment v-if="show_comment" />
    </div>
</template>

<style scoped>
* {
    --width: 740px;

    --margin-lr: 3rem;
    --margin-top: 4rem;
    --margin-bottom: 4rem;

    --header-main-spacing: 2.3rem;

    --header-color: #535353;
    --header-size: 2.2rem;
    --header-line-height: 3.5rem;
}

@media (prefers-color-scheme: dark) {
    * {
        --header-color: #f3f4f6;
    }
}

#content {
    width: var(--width);
    margin: 0 auto;
    z-index: 10;
}

#content.fade {
    transition: opacity 0.1s ease-in;
    opacity: 0;
}

main {
    margin: 0 var(--margin-lr) var(--margin-bottom);
}

header {
    margin: var(--margin-top) var(--margin-lr) 0.6rem;
}

h1 {
    font-size: var(--header-size);
    color: var(--header-color);
    letter-spacing: 0.12rem;
    line-height: var(--header-line-height);
    font-weight: 500;
}

@media (max-width: 768px) {
    * {
        --width: 100%;
        --margin-lr: 2.5rem;
        --margin-top: 5.5rem;
        --margin-bottom: 5rem;
        --header-size: 2rem;
        --header-line-height: 3rem;
    }
}
</style>
