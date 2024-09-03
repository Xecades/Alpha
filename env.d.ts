/// <reference types="vite/client" />

declare module "*.vue" {
    import { ComponentOptions } from "vue";

    const componentOptions: ComponentOptions;
    export default componentOptions;
}

declare module "@cache/*/routes" {
    import { RouteRecordRaw } from "vue-router";

    const routes: RouteRecordRaw[];
    export default routes;
}

declare module "@cache/*/search" {
    import { FuseResult } from "fuse.js";
    import { SearchTarget } from "./script/preprocess/types";

    const search: (
        query: string
    ) => SearchTarget[] | FuseResult<SearchTarget>[];

    export default search;
}

declare module "@cache/*/config" {
    import { Config } from "./script/preprocess/types";

    const config: Config;
    export default config;
}
