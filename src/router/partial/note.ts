import note_generic from "@/layout/note.vue";
import note_routes from "@cache/note/routes";

import type { RouteRecordRaw } from "vue-router";

/**
 * @see https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#可重复的参数
 * @see https://router.vuejs.org/zh/guide/essentials/nested-routes.html
 */
const noteRoutes: RouteRecordRaw[] = [
    { path: "/note", component: note_generic, children: note_routes },
];

export default noteRoutes;
