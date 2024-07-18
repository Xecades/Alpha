// Modules
import { createApp } from "vue";
import { createHead } from "@unhead/vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Vue
import App from "./App.vue";

// JS
import router from "./router";

// CSS
import "./assets/css/reset.css";
import "./assets/css/cursor.css";
import "./assets/css/global.css";

// Wait for document ready
const documentReady = () => {
    return new Promise((res) => {
        document.onreadystatechange = () => {
            if (document.readyState === "complete") {
                console.debug("[+] Document ready");
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

    library.add(faMagnifyingGlass);

    const app = createApp(App);
    app.use(router);
    app.use(createHead()); // ref: unplugin-vue-markdown
    app.component("font-awesome-icon", FontAwesomeIcon);
    app.mount("#app");

    console.debug("[+] Vue mounted");
}

main();
