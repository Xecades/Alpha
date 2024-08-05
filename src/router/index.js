import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes.js";
import setupGuards from "./guards.js";

const scrollBehavior = (_, __, saved_position) =>
    saved_position ?? { left: 0, top: 0, behavior: "smooth" };

const router = createRouter({
    routes,
    scrollBehavior,
    history: createWebHistory(),
});

setupGuards(router);

export default router;
