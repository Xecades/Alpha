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
import "katex/dist/katex.min.css";
import "overlayscrollbars/overlayscrollbars.css";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faAngleDown,
    faAngleRight,
    faArrowUpRightFromSquare,
    faAsterisk,
    faBars,
    faCaretLeft,
    faCaretRight,
    faChevronLeft,
    faCube,
    faExclamationCircle,
    faExclamationTriangle,
    faFaceFrown,
    faFile,
    faFolder,
    faInfoCircle,
    faLightbulb,
    faLink,
    faMagnifyingGlass,
    faSpinner,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
// @ts-ignore
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Wait for document ready
const documentReady = () => {
    return new Promise<void>((res) => {
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
        faAngleDown,
        faBars,
        faMagnifyingGlass,
        faCaretRight,
        faCaretLeft,
        faXmark,
        faFile,
        faFolder,
        faFaceFrown,
        faAsterisk,
        faCube,
        faLightbulb,
        faInfoCircle,
        faExclamationCircle,
        faExclamationTriangle,
        faLink,
        faArrowUpRightFromSquare,
        faStar,
        faGithub,
        faSpinner,
        faChevronLeft
    );

    const app = createApp(App);
    app.use(router);
    app.component("font-awesome-icon", FontAwesomeIcon);

    app.mount("#app");

    logger.plus("Vue mounted");
}

main();
