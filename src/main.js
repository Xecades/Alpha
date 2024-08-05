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

    const app = createApp(App);
    app.use(router);
    app.mount("#app");

    logger.plus("Vue mounted");
}

main();
