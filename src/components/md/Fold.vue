<script setup lang="ts">
import { ref, type Ref } from "vue";
import AnimateHeight from "vue-animate-height";
import type { JSX } from "vue/jsx-runtime";

enum TYPE {
    DEFAULT = "default",
    PRIMARY = "primary",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    DANGER = "danger",
}

const icon: Record<TYPE, string> = {
    default: "asterisk",
    primary: "cube",
    success: "lightbulb",
    info: "info-circle",
    warning: "exclamation-circle",
    danger: "exclamation-triangle",
};

const props = defineProps<{
    expand?: boolean;
    title?: JSX.Element;
    type?: TYPE;
}>();

const type: TYPE = props.type || TYPE.DEFAULT;
const expanded: Ref<boolean> = ref(props.expand || false);
</script>

<template>
    <div class="fold colors" :class="type">
        <div class="header cursor" @click="expanded = !expanded">
            <div class="icon">
                <font-awesome-icon :icon="icon[type]" />
            </div>
            <div class="title">
                <component :is="title" v-if="title" />
            </div>
            <div
                class="expand"
                :style="{ transform: `rotate(${expanded ? 90 : 0}deg)` }"
            >
                <font-awesome-icon :icon="['fas', 'angle-right']" />
            </div>
        </div>

        <div class="content">
            <!-- @see https://www.npmjs.com/package/vue-animate-height -->
            <AnimateHeight
                :height="expanded ? 'auto' : 0"
                contentClass="wrapper"
            >
                <slot />
            </AnimateHeight>
        </div>
    </div>
</template>

<style scoped>
* {
    --header-color: #6d6e75;
}

@media (prefers-color-scheme: dark) {
    * {
        --header-color: #b9bcc0;
    }
}

.fold {
    margin: 2rem var(--block-extend);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    overflow: hidden;
}

.header {
    display: flex;
    padding: 7px 9px;
    background-color: var(--background-color);
    user-select: none;
}

.title {
    --inline-code-background: var(--content-code-color);

    flex: 1;
    font-size: 0.9em;
    color: var(--header-color);
}

.icon,
.expand {
    font-size: 1.1em;
    text-align: center;
    width: 36px;
    color: var(--icon-color);
}

.icon {
    margin-right: 7px;
}

.expand {
    margin-left: 7px;
    transition: transform 0.2s ease;
}

.content :global(.wrapper) {
    --block-extend: 0;

    padding: 0.8rem 1.4rem;
}
</style>
