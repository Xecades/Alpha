<script setup lang="ts">
type TYPE = "default" | "primary" | "success" | "info" | "warning" | "danger";

const icon: Record<TYPE, string> = {
    default: "asterisk",
    primary: "cube",
    success: "lightbulb",
    info: "info-circle",
    warning: "exclamation-circle",
    danger: "exclamation-triangle",
};

const props = defineProps<{ type?: TYPE }>();
const type: TYPE = props.type || "default";
</script>

<template>
    <div class="note colors" :class="type">
        <div class="icon">
            <font-awesome-icon :icon="icon[type]" />
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.note {
    padding: 2rem 2.5rem;
    margin: 2rem var(--block-extend);
    display: flex;
    gap: 1.25rem;
    border-radius: 2px;
    background: var(--background-color);
}

.icon {
    font-size: 1.2em;
    color: var(--icon-color);
}

.content {
    --inline-code-background: var(--content-code-color);

    flex: 1;
    font-size: 0.95em;
}
</style>
