import note_generic from "@/layout/note.vue";

import type { RouteRecordRaw } from "vue-router";

// https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#可重复的参数
const noteRoutes: RouteRecordRaw[] = [
    { path: "/note/:path*", component: note_generic },
];

export default noteRoutes;
