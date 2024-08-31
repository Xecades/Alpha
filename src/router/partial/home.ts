import type { RouteRecordRaw } from "vue-router";

const index = () => import("@/views/home/index.vue");
const about = () => import("@/views/home/about.vue");
const lab = () => import("@/views/home/lab.vue");
const friend = () => import("@/views/home/friend.vue");
const timeline = () => import("@/views/home/timeline.vue");
const sponsor = () => import("@/views/home/sponsor.vue");
const sponsorship = () => import("@/views/home/sponsorship.vue");
const error = () => import("@/views/home/404.vue");

const homeRoutes: RouteRecordRaw[] = [
    { path: "/", name: "home", component: index },
    { path: "/about", name: "about", component: about },
    { path: "/lab", name: "lab", component: lab },
    { path: "/friend", name: "friend", component: friend },
    { path: "/timeline", name: "timeline", component: timeline },
    { path: "/sponsor", name: "sponsor", component: sponsor },
    { path: "/sponsorship", name: "sponsorship", component: sponsorship },
    { path: "/:pathMatch(.*)", name: "error", component: error },
];

export default homeRoutes;
