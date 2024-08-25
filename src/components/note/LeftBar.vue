<script setup lang="jsx">
import { refreshCursor } from "@/assets/js/cursor";
import { nextTick, onUpdated, ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";

// 必须手动引用，否则 JSX 会出问题
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Search from "./Search.vue";


const props = defineProps({ config: Object });
const router = useRouter();


const curr_cate = router.currentRoute.value.params.path[0];
const categories = ref(props.config.nav.map(cate => ({ name: cate.title, link: cate.link, opacity: 0 })));

// 根据当前路径确定默认激活的分类
const curr_id = categories.value.findIndex(cate => cate.link === "note/" + curr_cate);
const active_id = ref(curr_id === -1 ? 0 : curr_id);


const is_hover = ref(false);
const is_searching = ref(false);

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

const reveal_search = async () => {
    is_searching.value = true;
    await nextTick();
    document.querySelector(".search .input").focus();
};

const hide_search = () => {
    is_searching.value = false;
};

const mouseenter = async () => {
    is_hover.value = true;
    reveal_category();
};

const mouseleave = () => {
    is_hover.value = false;
    hide_category();
};

const render = (node, is_root = false) => {
    let { title, children, link } = node;
    link = "/" + link;

    const icon_comp = <FontAwesomeIcon class="icon" icon="fa-solid fa-caret-left" />;
    const title_comp = <RouterLink to={link} class="title cursor">{title}{icon_comp}</RouterLink>;

    if (children.length === 0) {
        title_comp.props.leaf = true;
        return title_comp;
    }

    let child_comps = children.map(child => <li class="child">{render(child)}</li>);
    let children_comp = <ul class="children">{child_comps}</ul>;

    if (is_root) {
        return children_comp;
    }

    return [title_comp, children_comp];
};

const VBody_fn = () => () => render(props.config.nav[active_id.value], true)
const VBody = ref(VBody_fn());

watch(active_id, async () => {
    VBody.value = VBody_fn();
});

onUpdated(() => {
    refreshCursor();
});
</script>

<template>
    <div @mouseenter="mouseenter" @mouseleave="mouseleave">
        <ul class="nav">
            <li class="btn cursor" id="search" @click="reveal_search">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </li>
        </ul>

        <ul class="category">
            <template v-for="item, idx in categories">
                <li class="item cursor" :class="idx == active_id && 'active'" :style="{ opacity: item.opacity }"
                    @click="router.push('/' + item.link)" @mouseover="active_id = idx">
                    {{ item.name }}
                </li>
            </template>
        </ul>

        <Transition name="content">
            <component class="content" :is="VBody" v-if="is_hover" />
        </Transition>

        <!-- https://cn.vuejs.org/guide/built-ins/teleport.html -->
        <Teleport to="body">
            <Transition name="search">
                <Search v-if="is_searching" @close="hide_search" />
            </Transition>
        </Teleport>
    </div>
</template>

<style>
.note-layout .content {
    position: absolute;
    left: var(--cate-offset-left);
    top: var(--cate-offset-top);
    width: var(--cate-width);
    display: block;
}

.note-layout .content .title {
    color: #787f83;
    font-size: 0.95rem;
    height: var(--cate-title-height);
    line-height: var(--cate-title-height);
    margin-bottom: 5px;
    display: block;
    transition: color .2s;
}

.note-layout .content .title.router-link-exact-active {
    color: var(--theme-color);
}

.note-layout .content .title .icon {
    color: var(--theme-color);
    opacity: 0;
    margin-left: 8px;
    transition: opacity .1s;
    float: right;
    height: var(--cate-title-height);
    transform: scale(.7);
}

.note-layout .content .title:hover {
    color: var(--theme-color);
}

.note-layout .content .title:hover .icon {
    opacity: 1;
}

.note-layout .content .children {
    margin-left: 1rem;
}

.note-layout .content>.children {
    margin: 0;
}
</style>

<style scoped>
* {
    --offset-top: 28px;
    --offset-left: 35px;

    --theme-color: #60a5fa;

    --nav-width: 42px;
    --nav-height: 40px;
    --nav-gap: 2px;
    --nav-color: #cecece;
    --nav-hover-color: #a9a9a9;
    --nav-bg-hover-color: #f2f2f2c4;

    --cate-translate-offset: -7px;
    --cate-offset-left: 63px;
    --cate-offset-top: calc(26px + var(--nav-height) + var(--offset-top));
    --cate-width: 250px;
    --cate-title-height: 1.45rem;

    --search-scale: .99;
}

.search-enter-active,
.search-leave-active {
    transition-property: opacity, transform;
    transition-duration: .12s;
}

.search-enter-active {
    transition-timing-function: cubic-bezier(.41, .16, .83, .74);
}

.search-leave-active {
    transition-timing-function: cubic-bezier(.08, .46, .76, .89);
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
    transition-duration: .23s;
    transition-timing-function: ease-out;
}

.content-leave-active {
    transition-duration: .15s;
    transition-timing-function: cubic-bezier(.15, .79, .69, .68);
}

.content-enter-from,
.content-leave-to {
    opacity: 0;
    transform: translateY(var(--cate-translate-offset));
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
    user-select: none;
}

.category .item {
    height: var(--nav-height);
    line-height: var(--nav-height);
    font-size: .9rem;
    padding: 0 12px;
    color: #888e8f;
    background-color: #fdfdfdf5;
    text-decoration-color: transparent;
    transition: background-color .15s, opacity .2s, text-decoration-color .2s;
}

.category .item.active {
    text-decoration-line: underline;
    text-underline-offset: 5px;
    text-decoration-style: wavy;
    text-decoration-color: #ced0d1;
}

.category .item:hover {
    background-color: #f5f5f5fc;
}

.nav .btn:hover {
    background-color: var(--nav-bg-hover-color);
    color: var(--nav-hover-color);
}
</style>