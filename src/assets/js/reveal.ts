import ScrollReveal from "scrollreveal";
import logger from "./logger";
import { onBeforeUnmount, onMounted } from "vue";

function mount() {
    logger.nbsp("Reveal module mounted");
    ScrollReveal().reveal(".rv", {
        // reset: true,
        interval: 20,
        duration: 400,
        origin: "top",
        distance: "4px",
        scale: 0.99,
    });
}

function destroy() {
    ScrollReveal().destroy();
}

export default function setupReveal() {
    onMounted(mount);
    onBeforeUnmount(destroy);
}
