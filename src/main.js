// Modules
import { createApp } from "vue";

// Vue
import App from "./App.vue";

// JS
import router from "./router";
import logger from "./assets/js/logger";

// CSS
import "./assets/css/reset.css";
import "./assets/css/cursor.css";
import "./assets/css/global.css";
import "katex/dist/katex.min.css";
import "overlayscrollbars/overlayscrollbars.css";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faAngleRight,
    faBars,
    faCaretLeft,
    faCaretRight,
    faFaceFrown,
    faFile,
    faFolder,
    faMagnifyingGlass,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

// Wait for document ready
const documentReady = () => {
    return new Promise((res) => {
        document.onreadystatechange = () => {
            if (document.readyState === "complete") {
                logger.plus("Document ready");
                res();
            }
        };
    });
};

// Console
const consoleMessage = () => {
    const year = new Date().getFullYear();
    console.log(`
┌─Xecades Alpha──────────────────────────────────────┐
│                                                    │
│            Yet another concise homepage            │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│ Github           https://github.com/Xecades/Alpha/ │
│ Website                       https://xecades.xyz/ │
│ QQ               [DNS TXT] https://qq.xecades.xyz/ │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│ Built with Vue.js and... and my laptop.            │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│ MIT LICENSE                                        │
│ Copyright © 2019 - ${year} Xecades                    │
│                                                    │
└────────────────────────────────────────────────────┘
    `);
};

// Main
async function main() {
    consoleMessage();
    await documentReady();

    library.add(
        faAngleRight,
        faBars,
        faMagnifyingGlass,
        faCaretRight,
        faCaretLeft,
        faXmark,
        faFile,
        faFolder,
        faFaceFrown
    );

    const app = createApp(App);
    app.use(router);
    app.component("font-awesome-icon", FontAwesomeIcon);
    app.mount("#app");

    logger.plus("Vue mounted");
}

main();
