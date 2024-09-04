import index from "@/views/home/index.vue";
import about from "@/views/home/about.vue";
import lab from "@/views/home/lab.vue";
import friend from "@/views/home/friend.vue";
import timeline from "@/views/home/timeline.vue";
import sponsor from "@/views/home/sponsor.vue";
import sponsorship from "@/views/home/sponsorship.vue";
import error from "@/views/home/404.vue";

import type { RouteRecordRaw } from "vue-router";

const homeRoutes: RouteRecordRaw[] = [
    { path: "/", name: "home", component: index, meta: { title: "" } },
    { path: "/lab", name: "lab", component: lab, meta: { title: "实验室" } },
    {
        path: "/about",
        name: "about",
        component: about,
        meta: { title: "关于" },
    },
    {
        path: "/friend",
        name: "friend",
        component: friend,
        meta: { title: "友人帐" },
    },
    {
        path: "/timeline",
        name: "timeline",
        component: timeline,
        meta: { title: "时光" },
    },
    {
        path: "/sponsor",
        name: "sponsor",
        component: sponsor,
        meta: { title: "赞助" },
    },
    {
        path: "/sponsorship",
        name: "sponsorship",
        component: sponsorship,
        meta: { title: "赞助者" },
    },
    {
        path: "/:pathMatch(.*)",
        name: "error",
        component: error,
        meta: { title: "404" },
    },
];

export default homeRoutes;
