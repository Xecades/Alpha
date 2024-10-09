<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

import type { Ref } from "vue";
import type { JSX } from "vue/jsx-runtime";

const props = defineProps<{
    /** JSX element to be lazy-loaded */
    data: () => JSX.Element;
}>();

const emit = defineEmits<{
    /** Emitted when all elements are rendered */
    finish: [];

    /** Emitted when one more element is rendered */
    update: [index: number];
}>();

const children: JSX.Element[] = (props.data().children as JSX.Element[]) || [];
const queue: Ref<JSX.Element[]> = ref([]);

onMounted(() => {
    let render_cnt: number = 0;

    const render = () => {
        if (render_cnt < children.length) {
            queue.value.push(children[render_cnt]);
            nextTick(() => emit("update", render_cnt));

            render_cnt++;
            window.requestAnimationFrame(render);
        } else {
            emit("finish");
        }
    };

    window.requestAnimationFrame(render);
});
</script>

<template>
    <template v-for="(item, index) in queue" :key="index">
        <component :is="item" class="item" />
    </template>
</template>
