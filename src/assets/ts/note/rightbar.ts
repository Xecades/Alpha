import type { Ref } from "vue";
import type { MarkdownHeaderJsx } from "@script/types";

/** Header type used for ref rendering */
export type HeaderRef = MarkdownHeaderJsx & {
    readonly width: string;
    readonly indent: string;
    readonly opacity: string;
};

const width_preset: string[] = ["50px", "40px", "30px", "20px", "13px"];
const indent_preset: string[] = ["0rem", "1rem", "1.7rem", "2.3rem", "2.8rem"];
const opacity_preset: string[] = ["1", "0.6", "0.6", "0.6", "0.6"];

/**
 * Append width and indent properties to TOC data.
 *
 * @param toc - Raw TOC data imported from json
 * @returns Normalized TOC data
 */
export const normalize_toc = (toc: MarkdownHeaderJsx[]): HeaderRef[] => {
    const levels: number[] = toc.map((item) => item.level);

    const maxLevel: number = Math.max(...levels);
    const minLevel: number = Math.min(...levels);

    return toc.map((item) => ({
        ...item,
        width: width_preset[4 + item.level - maxLevel],
        indent: indent_preset[item.level - minLevel],
        opacity: opacity_preset[item.level - minLevel],
    }));
};

/**
 * Navigate to the element with the given ID.
 *
 * @param id - ID of the element to navigate to
 * @param offset - Offset from the top of the element, default to -4rem
 */
export const navigate = (id: string, offset: number = -4 * 16) => {
    let el = document.getElementById(id);
    if (el) {
        // 不能用 scrollIntoView，因为 ScrollReveal 动画会打断滚动

        const y: number =
            el.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top: y, behavior: "smooth" });
    }
};

/**
 * Scroll listener class for rightbar.
 */
export class ScrollListener {
    targets: HTMLElement[];
    store: Ref<number | null>;

    /**
     * Constructor.
     *
     * @param in_view - Ref to store the index of the element in view
     */
    constructor(in_view: Ref<number | null>) {
        this.targets = [];
        this.store = in_view;

        window.onscroll = () => {
            for (let i = 0; i < this.targets.length; i++) {
                if (this._in_viewport(this.targets[i])) {
                    this.store.value = i;
                    break;
                }
            }
        };
    }

    /**
     * Add an element to the listener.
     *
     * @param target - The element to add to the listener
     */
    listen(target: HTMLElement): void {
        this.targets.push(target);
    }

    /**
     * Clear the listener.
     */
    reset(): void {
        this.targets = [];
        this.store.value = null;
    }

    /**
     * Check whether an element is in viewport.
     *
     * @param el - The element to check
     * @returns Whether the element is in the viewport
     */
    _in_viewport(el: Element): boolean {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const vw = window.innerWidth || document.documentElement.clientWidth;

        const rect: DOMRect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= vh &&
            rect.right <= vw
        );
    }
}
