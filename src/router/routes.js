import home_index from "@/views/home/index.vue";
import home_about from "@/views/home/about.vue";
import home_lab from "@/views/home/lab.vue";
import home_friend from "@/views/home/friend.vue";
import home_timeline from "@/views/home/timeline.vue";
import home_sponsor from "@/views/home/sponsor.vue";
import home_sponsorship from "@/views/home/sponsorship.vue";
import home_404 from "@/views/home/404.vue";

const homeRoutes = [
    { path: "/", name: "home", component: home_index },
    { path: "/about", name: "about", component: home_about },
    { path: "/lab", name: "lab", component: home_lab },
    { path: "/friend", name: "friend", component: home_friend },
    { path: "/timeline", name: "timeline", component: home_timeline },
    { path: "/sponsor", name: "sponsor", component: home_sponsor },
    { path: "/sponsorship", name: "sponsorship", component: home_sponsorship },
    { path: "/:pathMatch(.*)", name: "error", component: home_404 },
];

const routes = [...homeRoutes];

export default routes;
