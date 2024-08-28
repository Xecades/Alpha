import index from "@/views/home/index.vue";
import about from "@/views/home/about.vue";
import lab from "@/views/home/lab.vue";
import friend from "@/views/home/friend.vue";
import timeline from "@/views/home/timeline.vue";
import sponsor from "@/views/home/sponsor.vue";
import sponsorship from "@/views/home/sponsorship.vue";
import error from "@/views/home/404.vue";

const homeRoutes = [
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
