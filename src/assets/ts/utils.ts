import is_mobile from "is-mobile";

/**
 * Check whether the current window width is less than the given width.
 *
 * @param width - The width to compare with
 * @returns Whether the current window width is less than the given width
 */
export const isWidthLessThan = (width: number): boolean => {
    return window.innerWidth < width;
};

/**
 * Check whether the current window width is *small*.
 *
 * @note *Small* means screen width less than 768px.\
 *       This **shouldn't** be used to check whether
 *       the current device is mobile or not.
 *
 * @returns Whether the current device is *small* or not
 */
export const isSmallScreen = (): boolean => isWidthLessThan(768);

/**
 * Check whether the current device is mobile or not.
 *
 * @note This function uses `is-mobile` package to detect,
 *       which is based on UA string and feature detection.
 *
 * @returns Whether the current device is mobile or not
 *
 * @see https://www.npmjs.com/package/is-mobile
 */
export const isMobile = (): boolean => is_mobile({ tablet: true });

/**
 * Load JS from the given URL.
 *
 * @param src - The source URL of the script to load
 * @returns A promise that resolves when the script is loaded
 */
export const loadJS = (src: string): Promise<unknown> =>
    new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        document.body.appendChild(script);

        script.onload = resolve;
        script.onerror = reject;
    });
