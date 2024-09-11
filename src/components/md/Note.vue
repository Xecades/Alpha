<script setup lang="ts">
const props = defineProps<{
    default?: string;
    primary?: string;
    success?: string;
    info?: string;
    warning?: string;
    danger?: string;
}>();

const icon: Record<string, string> = {
    default: "asterisk",
    primary: "cube",
    success: "lightbulb",
    info: "info-circle",
    warning: "exclamation-circle",
    danger: "exclamation-triangle",
};

const type: string =
    Object.keys(props).find((key) => (props as any)[key]) || "default";
</script>

<template>
    <div class="note" :class="type">
        <div class="icon">
            <font-awesome-icon :icon="icon[type]" />
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.note.default {
    --background-color: #7777771a;
    --icon-color: #77777799;
    --content-code-color: #7777771c;
}

.note.primary {
    --background-color: #d400ff1a;
    --icon-color: #d400ff99;
    --content-code-color: #d400ff1c;
}

.note.info {
    --background-color: #0070f31a;
    --icon-color: #0070f399;
    --content-code-color: #0070f31c;
}

.note.success {
    --background-color: #19cc961a;
    --icon-color: #19cc9699;
    --content-code-color: #19cc961c;
}

.note.warning {
    --background-color: #f5a6231a;
    --icon-color: #f5a62399;
    --content-code-color: #f5a6231c;
}

.note.danger {
    --background-color: #ee00001a;
    --icon-color: #ee000099;
    --content-code-color: #ee00001c;
}

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
    flex: 1;
    font-size: .95em;
}

.content code.inline-code {
    background-color: var(--content-code-color);
}
</style>
