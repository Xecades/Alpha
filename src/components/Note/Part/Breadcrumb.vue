<script setup>
const $ = defineProps({
    data: Array
});
</script>

<template>
    <ul>
        <li v-for="(item, idx) in data" :key="idx">
            <router-link class="cursor lk" :to='"/note/" + data.slice(0, idx + 1).map((item) => item.link).join("/")'>
                {{ item.title }}
            </router-link>
            <font-awesome-icon v-if="idx != data.length - 1" class="icon" :icon="['fas', 'angle-right']" />
        </li>
    </ul>
</template>

<style scoped>
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

.lk {
    color: #bbb;
    font-family: initial;
    transition: color .3s;
}

.lk:hover {
    color: #777;
}

.icon {
    color: #ddd;
    padding: 0 .4rem;
}
</style>
