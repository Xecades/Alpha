import note_generic from "@/layout/note.vue";

// https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#可重复的参数
const noteRoutes = [{ path: "/note/:path*", component: note_generic }];

export default noteRoutes;
