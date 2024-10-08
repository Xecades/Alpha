<script setup lang="ts">
import dayjs from "@/assets/ts/dayjs";
import ScrollReveal from "scrollreveal";

import { reveal_config } from "@/assets/ts/reveal";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

import { assertType, type RouteMeta } from "@script/types";
import type { Dayjs } from "dayjs";

const route = useRoute();
const format_string: string = "YYYY-MM-DD HH:mm:ss";

const meta: RouteMeta = assertType<RouteMeta>(route.meta);
const creation: Dayjs = dayjs(meta.created);
const modify: Dayjs = dayjs(meta.updated);

const title: string =
    `创建于 ${creation.format(format_string)}\n` +
    `更新于 ${modify.format(format_string)}`;

onMounted(async () => {
    ScrollReveal().reveal(".timestamp > *", reveal_config);
});
</script>

<template>
    <div class="timestamp" :title="title">
        <div class="line" />
        <p class="modify">最后更新：{{ modify.fromNow() }}</p>
        <p class="creation">文章创建：{{ creation.fromNow() }}</p>
    </div>
</template>

<style scoped>
* {
    --color: #95989a;

    --line-width: 146px;
    --line-extend: 6px;
    --line-color: #e3e3e3;
    --line-gap: 15px;
}

@media (prefers-color-scheme: dark) {
    * {
        --color: #878787;
        --line-color: #393a3b;
    }
}

.timestamp {
    margin: 0 var(--margin-lr) 6rem;
    font-size: 0.8rem;
    color: var(--color);
    line-height: 1.3rem;
    width: max-content;
}

.line {
    height: 1px;
    width: var(--line-width);
    margin-left: calc(var(--line-extend) * -1);
    margin-bottom: var(--line-gap);
    background-color: var(--line-color);
}

@media (max-width: 768px) {
    .timestamp {
        font-size: 0.75rem;
    }
}
</style>
