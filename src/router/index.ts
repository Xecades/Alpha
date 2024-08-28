import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes";
import setupGuards from "./guards";

import type { RouterScrollBehavior } from "vue-router";

const scrollBehavior: RouterScrollBehavior = (_, __, saved) =>
    saved ?? { left: 0, top: 0 };

const router = createRouter({
    routes,
    scrollBehavior,
    history: createWebHistory(),
});

setupGuards(router);

export default router;
