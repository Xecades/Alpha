import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import LabView from "@/views/LabView.vue";
import FriendView from "@/views/FriendView.vue";
import TimelineView from "@/views/TimelineView.vue";
import SponsorView from "@/views/SponsorView.vue";
import SponsorshipView from "@/views/SponsorshipView.vue";
import ErrorView from "@/views/ErrorView.vue";

const routes = [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/lab", name: "lab", component: LabView },
    { path: "/friend", name: "friend", component: FriendView },
    { path: "/timeline", name: "timeline", component: TimelineView },
    { path: "/sponsor", name: "sponsor", component: SponsorView },
    { path: "/sponsorship", name: "sponsorship", component: SponsorshipView },
    { path: "/:pathMatch(.*)", name: "error", component: ErrorView },
];

export default routes;
