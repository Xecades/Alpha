import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import VueRouter from "unplugin-vue-router/vite";
import Markdown from "unplugin-vue-markdown/vite";
import Components from "unplugin-vue-components/vite";
import Layouts from "vite-plugin-vue-layouts";
import ViteYaml from "@modyfi/vite-plugin-yaml";

import { slugify } from "transliteration";
import MarkdownItAnchor from "markdown-it-anchor";
import markdownItPrism from "markdown-it-prism";
import markdownItTocDoneRight from "markdown-it-toc-done-right";

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
            wrapperClasses: "markdown",

            // Default options passed to markdown-it
            // @ https://markdown-it.github.io/markdown-it/
            markdownItOptions: {
                html: true,
                linkify: true,
                typographer: true,
            },

            // A function providing the Markdown It instance
            // gets the ability to apply custom settings/plugins
            markdownItSetup(md) {
                // [markdown-it-anchor]
                // @ https://github.com/valeriangalliat/markdown-it-anchor
                md.use(MarkdownItAnchor, {
                    permalink: MarkdownItAnchor.permalink.linkInsideHeader({
                        class: "cursor header-anchor",
                        symbol: "¶",
                        placement: "after",
                    }),
                    slugify: slugify,
                });

                // [markdown-it-prism]
                // @ https://github.com/jGleitz/markdown-it-prism
                md.use(markdownItPrism, {
                    highlightInlineCode: true,
                    plugins: ["match-braces"], // TODO: does it work?
                });

                // [markdown-it-toc-done-right]
                // @ https://github.com/nagaozen/markdown-it-toc-done-right
                // - To extract TOC ast from markdown
                let prm = new Promise((res) => {
                    md.use(markdownItTocDoneRight, {
                        callback: (html, ast) => {
                            res(ast);
                            // console.log(JSON.stringify(ast, null, 2)); // TODO
                        },
                    });
                });

                prm.then((ast) => {
                    console.log(JSON.stringify(ast, null, 2)); // TODO
                });
            },
        }),

        // [unplugin-vue-components]
        //  @ https://github.com/unplugin/unplugin-vue-components
        //  - Auto import components
        Components({
            directoryAsNamespace: true,
        }),

        // [vite-plugin-vue-layouts]
        //  @ https://github.com/JohnCampionJr/vite-plugin-vue-layouts
        //  - Add layouts for routes
        //  + I use it to add layout for markdown files
        Layouts(),

        // [@modyfi/vite-plugin-yaml]
        //  @ https://github.com/Modyfi/vite-plugin-yaml
        ViteYaml(),

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
