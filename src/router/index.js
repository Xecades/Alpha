import { createRouter, createWebHistory } from "vue-router";
import { routes, handleHotUpdate } from "vue-router/auto-routes";
import { setupLayouts } from "virtual:generated-layouts";
import setupGuards from "./guards";

const scrollBehavior = (_, __, saved_position) =>
    saved_position ?? { left: 0, top: 0, behavior: "smooth" };

const router = createRouter({
    routes: setupLayouts(routes),
    scrollBehavior,
    history: createWebHistory(),
});

if (import.meta.hot) handleHotUpdate(router);
setupGuards(router);

export default router;
