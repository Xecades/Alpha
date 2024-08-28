<script setup>
import { nextTick, ref, watch } from "vue";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

import { refreshCursor } from "@/assets/js/cursor";

import search from "@cache/note/search";

const props = defineProps({ visible: Boolean });

const query = ref("");
const results = ref([]);

const osOptions = {
    scrollbars: { autoHide: "move" },
    overflow: { x: "hidden" },
};

const BEFORE_CNT = 10;

const sync = async (q) => {
    const len = (i) => i[1] - i[0];
    const longest = (is) => is.reduce((acc, cur) => len(cur) > len(acc) ? cur : acc);

    let res = search(q);
    let val = [];

    if (q) {
        for (let r of res) {
            let match = r.matches[0];

            // Always highlights the longest match
            let [s, e] = longest(match.indices);

            let type = match.key;
            let text = match.value;

            let before, mark, after;

            if (type === "content") {
                if (s - BEFORE_CNT > 0)
                    before = "..." + text.slice(s - BEFORE_CNT, s).trimLeft();
                else
                    before = text.slice(0, s);
                mark = text.slice(s, e + 1);
                after = text.slice(e + 1);
            } else if (type === "title") {
                before = text.slice(0, s);
                mark = text.slice(s, e + 1);
                after = text.slice(e + 1);
            }

            val.push({
                ...r.item,
                type,
                before,
                mark,
                after,
            });
        }
    } else {
        // if query is empty, show all posts
        val = res;
    }

    results.value = val;
    await nextTick();
    refreshCursor();
};

watch(query, sync, { immediate: true });
watch(() => props.visible, (v) => {
    if (v) return;

    setTimeout(async () => {
        query.value = "";
        await nextTick();
        const el = document.querySelector(".results .post");
        el.scrollIntoView({ block: "start" });
    }, 120); // Same as .search-leave-active transition duration in LeftBar.vue
});
</script>

<template>
    <div class="wrapper" @click.self="$emit('close')">
        <div class="panel">
            <div class="search">
                <div class="icon glass">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </div>

                <input class="input cursor" v-model="query" type="text" placeholder="Search in the void." />

                <div class="icon cursor xmark" @click="$emit('close')">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </div>
            </div>

            <OverlayScrollbarsComponent element="ul" class="results" :options="osOptions" defer>
                <li class="empty" v-if="results.length === 0">
                    <font-awesome-icon class="icon" :icon="['fas', 'face-frown']" />
                </li>
                <li v-for="res in results">
                    <router-link :to="res.link" class="post cursor" @click="$emit('close')">
                        <div class="meta">
                            <span class="icon" :data-type="res.is_index ? 'index' : 'post'">
                                <font-awesome-icon :icon="['fas', res.is_index ? 'folder' : 'file']" />
                            </span>
                            <span class="title">
                                <template v-if="res.type === 'title'">
                                    <span>{{ res.before }}</span>
                                    <mark>{{ res.mark }}</mark>
                                    <span>{{ res.after }}</span>
                                </template>
                                <template v-else>
                                    <span>{{ res.title || "[无标题]" }}</span>
                                </template>
                            </span>
                        </div>
                        <div class="content">
                            <template v-if="res.type === 'content'">
                                <span>{{ res.before }}</span>
                                <mark>{{ res.mark }}</mark>
                                <span>{{ res.after }}</span>
                            </template>
                            <template v-else>
                                <span>{{ res.content || "[空]" }}</span>
                            </template>
                        </div>
                    </router-link>
                </li>
            </OverlayScrollbarsComponent>
        </div>
    </div>
</template>

<style scoped>
* {
    --margin-lr: 1rem;
    --line-color: #e1e1e1;

    --panel-width: 720px;
    --panel-height: 430px;
    --panel-radius: 15px;

    --search-gap: 5px;
    --search-height: 50px;
    --search-margin-top: 5px;
    --search-icon-width: 27px;

    --results-bottom: 16px;
}

.results {
    height: calc(100% - var(--search-height) - var(--search-margin-top) - var(--results-bottom));
    overflow-y: hidden;
    margin: 0 var(--margin-lr) var(--results-bottom) var(--margin-lr);
    user-select: none;
}

.results .empty {
    width: calc(100% - var(--margin-lr) * 2);
    height: 100%;
    position: relative;
}

.results .empty .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(6.7);
    color: #f6f6f6;
}

.results .post {
    display: block;
    padding: 12px 16px;
    transition: background-color .15s;
}

.results .post:hover {
    background-color: #f3f3f382;
}

.results .post .meta .title {
    color: #56585d;
}

.results .post .meta .icon {
    color: #737477;
    padding: 0 7px 0 4px;
    width: 17px;
    text-align: center;
    display: inline-block;
}

.results .post .meta .icon[data-type="index"] {
    font-size: 0.93rem;
}

.results .post .content {
    color: #969797;
    margin: 6px 13px 0;
    font-size: .94rem;
    height: 1.6rem;
    line-height: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
}

.results .post mark {
    background-color: #fef08a;
    color: unset;
}

.search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: var(--search-margin-top) var(--margin-lr) 0;
    border-bottom: 1px solid var(--line-color);
    height: var(--search-height);
    gap: var(--search-gap);
}

.search .icon {
    flex: none;
    color: #d1d5db;
    width: var(--search-icon-width);
    display: block;
    height: 100%;
    line-height: var(--search-height);
    text-align: center;
    padding: 0 4px;
}

.search .icon.glass {
    font-size: 1.2rem;
}

.search .icon.xmark {
    font-size: 1.4rem;
    transition: color .15s, transform .15s ease-in-out;
}

.search .icon.xmark:hover {
    color: #9a9ca0;
    transform: scale(1.05);
}

.search .input {
    appearance: none;
    flex: 1;
    height: 100%;
    outline: none;
    padding: 0 5px;
    color: #3b3c3e;
    background-color: transparent;
    opacity: .9;
}

.wrapper {
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(12px);
}

.panel {
    width: var(--panel-width);
    height: var(--panel-height);
    background-color: #ffffffe6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid var(--line-color);
    border-radius: var(--panel-radius);
}
</style>