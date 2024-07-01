import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import VueRouter from "unplugin-vue-router/vite";
import Markdown from "unplugin-vue-markdown/vite";
import Components from "unplugin-vue-components/vite";
import Layouts from "vite-plugin-vue-layouts";

const customElement = ["rb"];

export default defineConfig({
    plugins: [
        // [unplugin-vue-router]
        //  @ https://uvr.esm.is/
        //  - File-based routing
        VueRouter({
            routesFolder: [
                "src/pages",
                {
                    src: "src/note",
                    path: "note/",
                    extensions: [".md"],
                },
            ],
            async extendRoute(route) {
                // Add layout property
                if (route.component?.includes("note")) {
                    route.addToMeta({ layout: "note" });
                }
            },
        }),

        // [@vitejs/plugin-vue]
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => customElement.includes(tag),
                },
            },
            include: [/\.vue$/, /\.md$/],
        }),

        // [unplugin-vue-markdown]
        //  @ https://github.com/unplugin/unplugin-vue-markdown/
        //  - Markdown loader
        Markdown({
            headEnabled: true,
        }),

        // [unplugin-vue-components]
        //  @ https://github.com/unplugin/unplugin-vue-components
        //  - Auto import components
        Components(),

        // [vite-plugin-vue-layouts]
        //  @ https://github.com/JohnCampionJr/vite-plugin-vue-layouts
        //  - Add layouts for routes
        //  + I use it to add layout for markdown files
        Layouts(),

        // [@vitejs/plugin-vue-jsx]
        vueJsx(),

        // [vite-plugin-vue-devtools]
        vueDevTools(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
