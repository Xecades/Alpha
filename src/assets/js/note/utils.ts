import { isMobile, isWidthLessThan } from "@/assets/js/utils";
import { NOTE_L_STATUS, NOTE_R_STATUS } from "@script/types";

/** The minimum screen width required for rightbar to display. */
const RIGHTBAR_THRESHOLD: number = 880;

/** The threshold screen width required for leftbar to switch style. */
const LEFTBAR_THRESHOLD: number = 880;

/**
 * Determine rightbar status (i.e. whether to display or not).
 *
 * @note Only when the screen width is less than `RIGHTBAR_THRESHOLD`,
 *       will the rightbar be hidden.
 *
 * @returns The rightbar status.
 */
export const rightbar_status = (): NOTE_R_STATUS =>
    isWidthLessThan(RIGHTBAR_THRESHOLD)
        ? NOTE_R_STATUS.HIDE
        : NOTE_R_STATUS.SHOW;

/**
 * Determine leftbar status.
 *
 * @note When using mobile devices, the leftbar should always be shown.
 *       Otherwise, the leftbar will always show only when the screen width
 *       is less than `LEFTBAR_THRESHOLD`.
 *
 * @returns The leftbar status.
 */
export const leftbar_status = (): NOTE_L_STATUS => {
    if (isMobile()) {
        return NOTE_L_STATUS.ALWAYS_SHOW;
    } else {
        return isWidthLessThan(LEFTBAR_THRESHOLD)
            ? NOTE_L_STATUS.ALWAYS_SHOW
            : NOTE_L_STATUS.HOVER_TO_SHOW;
    }
};
