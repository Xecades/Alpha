import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const scrollBehavior = (_, __, saved_position) =>
    saved_position ?? { left: 0, top: 0, behavior: "smooth" };

const router = createRouter({
    routes,
    scrollBehavior,
    history: createWebHistory(),
});

// Fade out when navigating
router.beforeEach((to, from, next) => {
    console.debug(`[+] Navigating: ${from.fullPath} -> ${to.fullPath}`);
    if (!from.name) {
        next();
    } else {
        document.querySelector("#main").classList.add("fade-out");
        setTimeout(next, 100);
    }
});

export default router;
