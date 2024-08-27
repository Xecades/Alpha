import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes";
import setupGuards from "./guards";

const scrollBehavior = (_, __, saved) =>
    saved ?? { left: 0, top: 0, behavior: "smooth" };

const router = createRouter({
    routes,
    scrollBehavior,
    history: createWebHistory(),
});

setupGuards(router);

export default router;
