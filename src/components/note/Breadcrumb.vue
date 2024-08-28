<script setup>
/**
 * @example /note/                  =>  Nothing
 * @example /note/cs/               =>  Nothing (?)
 * @example /note/cs/c/             =>  计算机科学
 * @example /note/cs/c/snippets/    =>  计算机科学 > C 语言
 * 
 * @todo 处理标题过长的情况
 */

const props = defineProps({ path: Array });
</script>

<template>
    <ul>
        <li v-for="(item, idx) in path" :key="idx">
            <router-link class="cursor link" :to="item.link">
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

    --height: 1.6rem;
}

ul {
    display: block;
    user-select: none;
    font-size: .92rem;
    height: var(--height);
}

li {
    display: inline-block;
    height: var(--height);
    line-height: var(--height);
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
