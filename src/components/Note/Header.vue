<script setup>
import { config } from "@/assets/js/noteUtils";

console.debug("[*] Note config:", config);
const search = () => {
    console.log("search");
};
</script>

<template>
    <div class="header">
        <div class="wrapper">
            <div class="title cursor">
                <RouterLink to="/note">{{ config.site_name }}</RouterLink>
            </div>
            <ul class="nav">
                <li class="cursor" v-for="{ title, link } in config.root.child">
                    <RouterLink :to="'/note/' + link">{{ title }}</RouterLink>
                </li>
                <li class="cursor">
                    <a @click="search">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
* {
    --height: 52px;
}

a {
    text-decoration: none;
    line-height: var(--height);
    display: block;
}

.header {
    backdrop-filter: blur(12px);
    background-color: rgb(249, 250, 251, .6);
    position: fixed;
    width: 100vw;
    height: var(--height);
}

.wrapper {
    /* border: 1px solid cyan; */
    width: 1100px;
    /* max-width: calc(100vw - 100px); */
    height: 100%;
    display: block;
    margin: 0 auto;
}

.nav {
    float: right;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1rem;
    margin-right: -12px;
}

.nav a {
    color: #6a6a6a;
    padding: 0 17px;
}

.title {
    float: left;
    line-height: var(--height);
    display: block;
    font-size: 20px;
    margin-left: -8px;
    /* font-weight: bold; */
}

.title a {
    color: #5a5a5a;
    padding: 0 13px;
}

.title,
.nav li {
    transition: background-color .2s;
}

.title:hover,
.nav li:hover {
    background-color: #e5e5e57e;
}
</style>
