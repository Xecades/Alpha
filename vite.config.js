import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";

import { plugin as markdown, Mode } from "vite-plugin-markdown";
import liveReload from "vite-plugin-live-reload";
import ViteYaml from "@modyfi/vite-plugin-yaml";

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

        // [vite-plugin-markdown]
        // @ https://github.com/hmsk/vite-plugin-markdown
        markdown({
            mode: [Mode.TOC, Mode.VUE, Mode.MARKDOWN],
        }),

        // [vite-plugin-live-reload]
        // @ https://github.com/arnoson/vite-plugin-live-reload
        liveReload("(note|blog)/**/*.(md|yml)"),

        // [@modyfi/vite-plugin-yaml]
        // @ https://github.com/Modyfi/vite-plugin-yaml
        ViteYaml(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@note": fileURLToPath(new URL("./note", import.meta.url)),
        },
    },
});
