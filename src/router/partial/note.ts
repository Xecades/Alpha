import type { RouteRecordRaw } from "vue-router";

const note_generic = () => import("@/layout/note.vue");

// https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#可重复的参数
const noteRoutes: RouteRecordRaw[] = [
    { path: "/note/:path*", component: note_generic },
];

export default noteRoutes;
