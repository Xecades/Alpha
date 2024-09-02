import homeRoutes from "./partial/home";
import noteRoutes from "@cache/note/routes";

const routes = [...homeRoutes, ...noteRoutes];

export default routes;
