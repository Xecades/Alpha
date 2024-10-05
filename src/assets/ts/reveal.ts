import ScrollReveal from "scrollreveal";
import { onBeforeUnmount, onMounted } from "vue";

type Options = scrollReveal.ScrollRevealObjectOptions;

export const reveal_config: Options = {
    interval: 20,
    duration: 400,
    origin: "top",
    distance: "4px",
    scale: 0.99,
};

const mount = () => {
    ScrollReveal().reveal(".rv", reveal_config);
};

const destroy = () => {
    ScrollReveal().destroy();
};

export default function setupReveal() {
    onMounted(mount);
    onBeforeUnmount(destroy);
}
