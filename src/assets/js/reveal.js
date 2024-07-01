import ScrollReveal from "scrollreveal";
import { onBeforeUnmount, onMounted } from "vue";

export default function reveal() {
    onMounted(() => {
        console.debug("     Reveal module mounted");
        ScrollReveal().reveal(".rv", {
            // reset: true,
            interval: 20,
            duration: 400,
            origin: "top",
            distance: "4px",
            scale: 0.99,
        });
    });
    onBeforeUnmount(() => {
        ScrollReveal().destroy();
    });
}
