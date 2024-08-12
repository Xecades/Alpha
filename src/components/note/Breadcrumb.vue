<script setup>
const props = defineProps({ path: Array });
</script>

<template>
    <ul>
        <li v-for="(item, idx) in path" :key="idx">
            <router-link class="cursor link" :to='item.link'>
                {{ item.title }}
            </router-link>
            <font-awesome-icon v-if="idx != path.length - 1" class="icon" :icon="['fas', 'angle-right']" />
        </li>
    </ul>
</template>

<style scoped>
* {
    --text-color: #bbb;
    --text-hover-color: #777;
    --icon-color: #ddd;
}

ul {
    display: block;
    user-select: none;
    font-size: .92rem;
}

li {
    display: inline-block;
    height: 1.6rem;
    line-height: 1.6rem;
}

.link {
    color: var(--text-color);
    font-family: initial;
    transition: color .3s;
}

.link:hover {
    color: var(--text-hover-color);
}

.icon {
    color: var(--icon-color);
    padding: 0 .4rem;
}
</style>
