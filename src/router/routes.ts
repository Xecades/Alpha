import homeRoutes from "./partial/home";
import noteRoutes from "@cache/note/routes";

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [...homeRoutes, ...noteRoutes];

export default routes;
