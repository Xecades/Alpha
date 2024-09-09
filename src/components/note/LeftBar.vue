<script setup lang="tsx">
import { nextTick, onMounted, onUpdated, ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";
import { render_list } from "@/assets/js/note/leftbar";
import cursor from "@/assets/js/cursor";

// Components
import Search from "./Search.vue";

// Cache
import _config_untyped from "@cache/note/config";
const config = _config_untyped as Config;

// Types
import type { JSX } from "vue/jsx-runtime";
import { NOTE_L_STATUS, type Config, type RouteMeta } from "@script/types";

/** Attributes attached to a category */
type Category = {
    name: string;
    link: string;
    opacity: number;
    timeout?: NodeJS.Timeout;
};

const props = defineProps<{ status: NOTE_L_STATUS }>();
const route = useRoute();
const meta: RouteMeta = route.meta as unknown as RouteMeta;

/** Categories to be displayed as buttons. */
const categories: Ref<Category[]> = ref(
    config.nav.map((cate) => ({
        name: cate.title,
        link: cate.link,
        opacity: 0,
    }))
);

/** ID of category of current page, -1 iff current location is index page. */
const category_id: number = categories.value.findIndex(
    (c: Category) => c.link === "note/" + meta.category
);

/** ID of active category. */
const active_id: Ref<number> = ref(category_id === -1 ? 0 : category_id);

/** @note This variable may be true only when status == HOVER_TO_SHOW. */
const do_show_detail: Ref<boolean> = ref(false);
const is_searching: Ref<boolean> = ref(false);

const REVEAL_DELAY: number = 40;

const category_fn = {
    reveal: () => {
        let len = categories.value.length;

        for (let i = 0; i < len; i++) {
            clearTimeout(categories.value[i].timeout);

            let timeout: NodeJS.Timeout = setTimeout(() => {
                categories.value[i].opacity = 1;
            }, REVEAL_DELAY * i);

            categories.value[i].timeout = timeout;
        }
    },
    hide: () => {
        let len = categories.value.length;

        for (let i = len - 1; i >= 0; i--) {
            clearTimeout(categories.value[i].timeout);

            let timeout: NodeJS.Timeout = setTimeout(() => {
                categories.value[i].opacity = 0;
            }, REVEAL_DELAY * (len - 1 - i));

            categories.value[i].timeout = timeout;
        }
    },
};

const search_fn = {
    reveal: async () => {
        is_searching.value = true;
        await nextTick();

        const input = document.querySelector(".search .input") as any;
        input.focus();
    },
    hide: () => {
        is_searching.value = false;
    },
};

const mouse_fn = {
    // Handle mouse events only if current status is HOVER_TO_SHOW
    enter: () => {
        if (props.status === NOTE_L_STATUS.HOVER_TO_SHOW) {
            do_show_detail.value = true;
            category_fn.reveal();
        }
    },
    leave: () => {
        if (props.status === NOTE_L_STATUS.HOVER_TO_SHOW) {
            do_show_detail.value = false;
            category_fn.hide();
        }
    },
    /** Switch category to `index` */
    switch: (index: number) => {
        active_id.value = index;
    },
};

const VBody_fn = () => () => render_list(config.nav[active_id.value], true);
const VBody: Ref<() => JSX.Element> = ref(VBody_fn());

watch(active_id, async () => {
    VBody.value = VBody_fn();
});

onUpdated(() => {
    cursor.refresh();
});

onMounted(() => {
    if (props.status === NOTE_L_STATUS.ALWAYS_SHOW) {
        category_fn.reveal();
    }
});
</script>

<template>
    <div id="left" @mouseenter="mouse_fn.enter" @mouseleave="mouse_fn.leave">
        <ul class="nav">
            <li class="btn cursor" id="search" @click="search_fn.reveal">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </li>
        </ul>

        <div class="category">
            <template v-for="(item, idx) in categories">
                <a
                    class="item cursor"
                    :class="idx == active_id && 'active'"
                    :style="{ opacity: item.opacity }"
                    @click.prevent="$router.push('/' + item.link)"
                    @mouseover="mouse_fn.switch(idx)"
                    :href="'/' + item.link"
                >
                    {{ item.name }}
                </a>
            </template>
        </div>

        <Transition name="content">
            <component class="content" :is="VBody" v-if="do_show_detail" />
        </Transition>

        <!-- https://cn.vuejs.org/guide/built-ins/teleport.html -->
        <Teleport to="body">
            <Transition name="search">
                <KeepAlive>
                    <Search v-if="is_searching" @close="search_fn.hide" />
                </KeepAlive>
            </Transition>
        </Teleport>
    </div>
</template>

<style>
.note-layout #left .content {
    position: absolute;
    left: var(--cate-offset-left);
    top: var(--cate-offset-top);
    width: var(--cate-width);
    display: block;
    background-image: var(--background);
    border-radius: var(--background-radius);
    padding: 15px 0;
}

.note-layout #left .content .title {
    color: var(--content-color);
    font-size: 0.95rem;
    line-height: var(--cate-title-height);
    margin-bottom: 5px;
    padding-right: 10px;
    display: flex;
    gap: 8px;
    transition: color 0.2s;
}

.note-layout #left .content .title.router-link-exact-active .text {
    color: var(--theme-color);
}

.note-layout #left .content .title .sign {
    color: var(--theme-color);
    opacity: 0;
    transition: opacity 0.1s;
    font-size: 0.7rem;
    display: block;
    animation: shake-x 1s infinite ease-in-out;
}

.note-layout #left .content .title .text {
    text-indent: calc(0px - var(--cate-title-indent));
    padding-left: var(--cate-title-indent);
}

.note-layout #left .content .title:hover .text {
    color: var(--theme-color);
}

.note-layout #left .content .title:hover .sign {
    opacity: 1;
}

.note-layout #left .content .children {
    margin-left: 1rem;
}

.note-layout #left .content > .children {
    margin: 0;
}
</style>

<style scoped>
* {
    --offset-top: 28px;
    --offset-left: 35px;

    --theme-color: #60a5fa;
    --background: linear-gradient(90deg, #fdfdfdf5, #fdfdfd80);
    --background-radius: 4px;

    --nav-width: 42px;
    --nav-height: 40px;
    --nav-gap: 2px;
    --nav-color: #cecece;
    --nav-hover-color: #a9a9a9;
    --nav-hover-background-color: #f2f2f2c4;

    --item-color: #888e8f;
    --item-underline-color: #ced0d1;
    --item-hover-background-color: #f5f5f5fc;

    --cate-translate-offset: -7px;
    --cate-offset-left: 28px;
    --cate-offset-top: calc(11px + var(--nav-height));
    --cate-width: 270px;
    --cate-title-height: 1.45rem;
    --cate-title-indent: 0.5rem;

    --search-scale: 0.99;

    --content-color: #787f83;

    --width: calc(var(--cate-offset-left) + var(--cate-width));
    --height: calc(100vh - var(--offset-top) * 2);
}

@media (prefers-color-scheme: dark) {
    * {
        --theme-color: #87b3ea;
        --background: linear-gradient(90deg, #131313f5, #13131380);
        --nav-color: #676767;
        --nav-hover-color: #a9a9a9;
        --nav-hover-background-color: #212121c4;
        --item-color: #cbcfd2;
        --item-underline-color: #5d5f61;
        --item-hover-background-color: #212121c4;
        --content-color: #c5ccd0;
    }
}

#left {
    position: fixed;
    left: var(--offset-left);
    top: var(--offset-top);
    width: var(--width);
    height: var(--height);
    z-index: 100;
}

.search-enter-active,
.search-leave-active {
    transition-property: opacity, transform;
    transition-duration: 0.12s;
}

.search-enter-active {
    transition-timing-function: cubic-bezier(0.41, 0.16, 0.83, 0.74);
}

.search-leave-active {
    transition-timing-function: cubic-bezier(0.08, 0.46, 0.76, 0.89);
}

.search-enter-from,
.search-leave-to {
    opacity: 0;
    transform: scale(var(--search-scale));
}

.content-enter-active,
.content-leave-active {
    transition-property: opacity, transform;
}

.content-enter-active {
    transition-duration: 0.23s;
    transition-timing-function: ease-out;
}

.content-leave-active {
    transition-duration: 0.15s;
    transition-timing-function: cubic-bezier(0.15, 0.79, 0.69, 0.68);
}

.content-enter-from,
.content-leave-to {
    opacity: 0;
    transform: translateY(var(--cate-translate-offset));
}

.nav {
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
    transition: background-color 0.15s, color 0.15s;
    color: var(--nav-color);
    display: block;
}

.category {
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 0;
    left: calc(var(--nav-width) + var(--nav-gap));
    height: var(--nav-height);
    text-wrap: nowrap;
    overflow: hidden;
    border-radius: var(--background-radius);
    background-image: var(--background);
    user-select: none;
}

.category .item {
    height: var(--nav-height);
    line-height: var(--nav-height);
    font-size: 0.9rem;
    padding: 0 12px;
    color: var(--item-color);
    text-decoration-color: transparent;
    transition: background-color 0.15s, opacity 0.2s, text-decoration-color 0.2s;
}

.category .item.active {
    text-decoration-line: underline;
    text-underline-offset: 5px;
    text-decoration-style: wavy;
    text-decoration-color: var(--item-underline-color);
}

.category .item:hover {
    background-color: var(--item-hover-background-color);
}

.nav .btn:hover {
    background-color: var(--nav-hover-background-color);
    color: var(--nav-hover-color);
}

@media (max-width: 768px) {
    * {
        --offset-top: 28px;
        --offset-left: 35px;

        --background: unset;
        --item-hover-background-color: unset;
        --nav-hover-background-color: unset;

        --width: unset;
        --height: unset;

        --nav-width: 35px;
        --nav-gap: 0px;
    }

    #left {
        position: absolute;
    }

    .nav .btn {
        font-size: 1rem;
    }

    .category .item {
        font-size: 0.85rem;
        padding: 0 9px;
    }
}
</style>
