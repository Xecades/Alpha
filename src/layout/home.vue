<script setup lang="ts">
// @ts-ignore
import { render } from "@/assets/js/home/partials";
import { isProxy, ref, watch } from "vue";

import logger from "@/assets/js/logger";
import setupReveal from "@/assets/js/reveal";
import cursor from "@/assets/js/cursor";
import type { JSX } from "vue/jsx-runtime";

interface HomeLayoutData {
    title: string;
    subtitle: string;
    body: any[];
}

const props = defineProps<{ data: HomeLayoutData }>();
const VBody = ref<JSX.Element>(render(props.data));

setupReveal();
cursor.setup();

if (isProxy(props.data)) {
    watch(props.data, () => {
        VBody.value = render(props.data);
    });
}

logger.nbsp("Home layout loaded");
</script>

<template>
    <div class="home-layout" id="main">
        <h1 class="title rv">{{ data.title }}</h1>
        <div class="subtitle rv indent">{{ data.subtitle }}</div>
        <div class="body">
            <VBody />
        </div>
    </div>
</template>

<style>
.home-layout {
    --hover-color: #f3f4f6;

    width: 40rem;
    margin: 0 auto;
    padding-top: 10rem;
    padding-bottom: 10rem;
    text-align: justify;
}

.home-layout .title {
    font-size: 3rem;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
    height: 3.5rem;
}

.home-layout .subtitle {
    font-weight: bold;
}

.home-layout .subtitle,
.home-layout p {
    font-size: 1.125rem;
    line-height: 2.2rem;
    margin-bottom: 0.5rem;
}

/* hr */

.home-layout hr {
    height: 0px;
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 0.5rem;
}

/* small */

.home-layout p.small {
    font-size: 0.9rem;
    opacity: 0.8;
}

/* table */

.home-layout .table ul {
    margin: 0 8px;
    padding: 0 40px;
}

.home-layout .table li {
    font-size: 1.125rem;
    line-height: 1.75rem;
    padding: 2px 16px;
    margin: 4px 0;
    border-radius: 8px;
    transition: background-color 0.2s;
}

.home-layout .table li:hover {
    background-color: var(--hover-color);
}

.home-layout .table li a {
    display: inline-block;
    min-width: 13rem;
    padding: 6px 0;
}

.home-layout .table li span {
    font-size: 1rem;
    line-height: 1.5rem;
}

/* timeline */

.home-layout .timeline ul.tl {
    margin: 0 8px;
    padding: 28px 40px;
}

.home-layout .timeline li.tl {
    display: block;
    margin-bottom: 56px;
    padding: 8px 0;
}

.home-layout .timeline li.tl:last-child {
    margin-bottom: 0;
}

.home-layout .timeline .year {
    display: block;
    font-weight: 700;
    font-size: 6rem;
    user-select: none;
    color: #f5f5f4;
    transform: translate(-8rem, 3.5rem) rotate(-90deg);
    position: absolute;
}

.home-layout .timeline li.yr {
    font-size: 1rem;
    line-height: 2.25rem;
    margin-left: 2rem;
    margin-bottom: 8px;
    padding: 0 16px;
    border-radius: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: background-color 0.3s;
}

.home-layout .timeline li.yr:hover {
    background-color: var(--hover-color);
}

.home-layout .timeline .date {
    display: inline-block;
    min-width: 10rem;
}

.home-layout .timeline hr:first-child {
    margin-bottom: 0;
}

.home-layout .timeline hr:last-child {
    margin-top: 0;
    margin-bottom: 1.3rem;
}

/* sponsor */

.home-layout .sponsor {
    margin: 12px 0px 12px 22px;
}

.home-layout .sponsor img {
    margin: 0 13px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    box-sizing: border-box;
    width: 220px;
    aspect-ratio: 621 / 843;
    max-width: 50%;
    display: inline-block;
}

@media (prefers-color-scheme: dark) {
    .home-layout {
        --hover-color: #2a2a2a;
    }

    .home-layout .sponsor img {
        border-color: #4a525a;
    }

    .home-layout .timeline .year {
        color: #2a2a2a;
    }
}

@media (max-width: 768px) {
    .home-layout {
        width: unset;
        margin: 0 2rem;
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    .home-layout .title {
        font-size: 2.5rem;
        height: 3rem;
        margin-bottom: 30px;
    }

    .home-layout .subtitle,
    .home-layout p {
        font-size: 1rem;
        line-height: 2.5rem;
    }

    /* hr */

    .home-layout hr {
        margin: 1.5rem 0.5rem;
    }

    /* table */

    .home-layout .table ul {
        padding: 0 10px;
    }

    .home-layout .table li {
        font-size: 1rem;
        margin: 10px 0;
    }

    .home-layout .table li a {
        width: 100%;
    }

    .home-layout .table li span {
        font-size: 0.9rem;
    }

    .home-layout .table li:hover {
        background-color: unset;
    }

    /* timeline */

    .home-layout .timeline ul.tl {
        padding: 28px 15px;
    }

    .home-layout .timeline li.tl {
        display: block;
        margin-bottom: 56px;
        padding: 8px 0;
    }

    .home-layout .timeline .year {
        transform: translate(-6rem, 2.5rem) rotate(-90deg);
    }

    .home-layout .timeline li.yr {
        font-size: 0.9rem;
        line-height: 2.1rem;
        padding: 0 0 0 16px;
    }

    .home-layout .timeline li.yr:hover {
        background-color: unset;
    }

    .home-layout .timeline .date {
        display: none;
    }

    /* sponsor */

    .home-layout .sponsor {
        margin: 12px 0;
        display: flex;
        gap: 10px;
    }

    .home-layout .sponsor img {
        margin: 0;
        max-width: calc((100% - 10px) / 2);
    }
}
</style>
