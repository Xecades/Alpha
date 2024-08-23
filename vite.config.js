import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";

import ViteYaml from "@modyfi/vite-plugin-yaml";

import "./script/preprocess";

const customElement = ["rb"];

export default defineConfig({
    plugins: [
        // [@vitejs/plugin-vue]
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => customElement.includes(tag),
                },
            },
            include: [/\.vue$/],
        }),

        // [@vitejs/plugin-vue-jsx]
        vueJsx(),

        // [vite-plugin-vue-devtools]
        vueDevTools(),

        // [@modyfi/vite-plugin-yaml]
        // @ https://github.com/Modyfi/vite-plugin-yaml
        ViteYaml(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@note": fileURLToPath(new URL("./note", import.meta.url)),
            "@cache": fileURLToPath(new URL("./cache", import.meta.url)),
        },
    },
});
