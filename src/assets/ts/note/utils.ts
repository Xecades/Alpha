import { isMobile, isWidthLessThan } from "@/assets/ts/utils";
import { NOTE_L_STATUS, NOTE_R_STATUS } from "@script/types";

/** The screen width of a small screen. */
const SMALL_SCREEN_WIDTH: number = 768;

/** The minimum screen width required for rightbar to display. */
const RIGHTBAR_THRESHOLD: number = 1280;

/** The threshold screen width required for leftbar to switch style. */
const LEFTBAR_THRESHOLD: number = 1260;

/**
 * Determine rightbar status (i.e. whether to display or not).
 *
 * @note Only when the screen width is less than `RIGHTBAR_THRESHOLD`,
 *       will the rightbar be hidden.
 */
export const rightbar_status = (): NOTE_R_STATUS =>
    isWidthLessThan(RIGHTBAR_THRESHOLD)
        ? NOTE_R_STATUS.HIDE
        : NOTE_R_STATUS.SHOW;

/**
 * Determine leftbar status.
 */
export const leftbar_status = (): NOTE_L_STATUS => {
    if (isMobile()) {
        return isWidthLessThan(SMALL_SCREEN_WIDTH)
            ? NOTE_L_STATUS.SHOW_SEARCH_AND_CATEGORY
            : NOTE_L_STATUS.ONLY_SEARCH_BUTTON;
    } else {
        return isWidthLessThan(LEFTBAR_THRESHOLD)
            ? NOTE_L_STATUS.ONLY_SEARCH_BUTTON
            : NOTE_L_STATUS.HOVER_TO_SHOW;
    }
};
