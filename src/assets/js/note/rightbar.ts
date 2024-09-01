import type { Ref } from "vue";
import type { MarkdownHeader } from "script/preprocess/types";

/** Header type used for ref rendering */
export type HeaderRef = MarkdownHeader & {
    readonly width: string;
    readonly indent: string;
};

const width_preset: string[] = ["50px", "40px", "30px", "20px", "13px"];
const indent_preset: string[] = ["0rem", "1rem", "1.7rem", "2.3rem", "2.8rem"];

/**
 * Append width and indent properties to TOC data.
 *
 * @param toc - Raw TOC data imported from json
 * @returns Normalized TOC data
 */
export const normalize_toc = (toc: MarkdownHeader[]): HeaderRef[] => {
    const levels: number[] = toc.map((item) => item.level);

    const maxLevel: number = Math.max(...levels);
    const minLevel: number = Math.min(...levels);

    return toc.map((item) => ({
        ...item,
        width: width_preset[4 + item.level - maxLevel],
        indent: indent_preset[item.level - minLevel],
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
 * Setup scroll listener for rightbar.
 *
 * @param in_view - Ref for current in-view heading
 */
export const setup_scroll_listener = (in_view: Ref<number | null>) => {
    const in_viewport = (el: Element): boolean => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const vw = window.innerWidth || document.documentElement.clientWidth;

        const rect: DOMRect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= vh &&
            rect.right <= vw
        );
    };

    const headings = document.querySelectorAll(".markdown .heading");

    window.onscroll = () => {
        for (let i = 0; i < headings.length; i++) {
            if (in_viewport(headings[i])) {
                in_view.value = i;
                break;
            }
        }
    };
};
