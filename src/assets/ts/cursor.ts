import { onMounted, onUpdated } from "vue";

interface Coord {
    x: number;
    y: number;
}

/**
 * Linear interpolation function.
 *
 * @param a - Start value
 * @param b - End value
 * @param n - Interpolation coefficient
 * @returns Interpolated value
 */
const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

/**
 * Linear interpolation function for coordinates.
 *
 * @param a - Start coordinate
 * @param b - End coordinate
 * @param n - Interpolation coefficient
 * @returns Interpolated coordinate
 */
const lerp_coords = (a: Coord, b: Coord, n: number): Coord => ({
    x: lerp(a.x, b.x, n),
    y: lerp(a.y, b.y, n),
});

enum State {
    HIDDEN = "hidden",
    HOVER = "hover",
    ACTIVE = "active",
}

/** Cursor configurations. */
export interface CursorConfig {
    /** Coefficient for lerp functions. */
    lerp_coeff: number;

    /** ID for the new cursor element. */
    id: string;

    /** CSS selector for elements to attach. */
    target: string;
}

const DefaultConfig: CursorConfig = {
    lerp_coeff: 0.1,
    id: "cursor",
    target: ".cursor, .markdown table tbody tr, .os-scrollbar-handle",
};

interface Cursor {
    /** The cursor element. */
    cursor: HTMLDivElement;

    /** Current and previous cursor position. */
    coords: {
        /** Current cursor coordinate. */
        curr: Coord | null;

        /** Cursor coordinate in the previous frame. */
        prev: Coord | null;
    };

    /** HTML elements that retrives hover effects. */
    targets: Element[];

    /** HTML element that is currently hovering. */
    hovering: Element | null;

    /** Configurations. */
    config: CursorConfig;
}

/**
 * Cursor class that handles cursor movement and state.
 */
class Cursor {
    /**
     * Create a cursor instance.
     *
     * @param target - CSS selector for elements to attach
     * @param id - ID for the cursor element
     * @param lerp_coeff - The coefficient for lerp functions
     */
    constructor(config: CursorConfig = DefaultConfig) {
        this.config = config;

        this.coords = { curr: null, prev: null };
        this.hovering = null;
        this.cursor = this.create_cursor();

        this.init();
        this.render();
    }

    /**
     * Add state to cursor element.
     *
     * @param state - Cursor state
     */
    private append_state(state: State) {
        this.cursor.classList.add(state);
    }

    /**
     * Remove state from cursor element.
     *
     * @param state - Cursor state
     */
    private remove_state(state: State) {
        this.cursor.classList.remove(state);
    }

    /**
     * Refresh cursor instance, rebind event listeners.
     */
    refresh() {
        const that = this;

        this.targets = Array.from(
            document.querySelectorAll(this.config.target)
        );

        // Remove hover state unless the hovering target is still in the targets list
        if (this.hovering !== null && !this.targets.includes(this.hovering)) {
            this.remove_state(State.HOVER);
            this.hovering = null;
        }

        for (const target of this.targets) {
            target.addEventListener("mouseover", () => {
                that.append_state(State.HOVER);
                that.hovering = target;
            });

            target.addEventListener("mouseout", () => {
                that.remove_state(State.HOVER);
                that.hovering = null;
            });
        }
    }

    /**
     * Move cursor to the specified coordinates.
     *
     * @param coord - Target coordinate
     */
    private move(coord: Coord) {
        this.cursor.style["left"] = `${coord.x}px`;
        this.cursor.style["top"] = `${coord.y}px`;
    }

    /**
     * Create a cursor element that is hidden by default.
     *
     * @returns Cursor element
     */
    private create_cursor(): HTMLDivElement {
        let cursor = document.createElement("div");
        cursor.id = this.config.id;
        cursor.classList.add(State.HIDDEN);
        document.body.append(cursor);

        return cursor;
    }

    /**
     * Initialize cursor event listeners.
     */
    private init() {
        document.onmousemove = (event) => {
            const OFFSET = 8;

            const current: Coord = {
                x: event.clientX - OFFSET,
                y: event.clientY - OFFSET,
            };

            // If the cursor is not moved yet,
            // move it to the current position instantly
            if (this.coords.curr === null) {
                this.move(current);
            }

            this.coords.curr = current;
            this.remove_state(State.HIDDEN);
        };

        document.onmouseenter = () => this.remove_state(State.HIDDEN);
        document.onmouseleave = () => this.append_state(State.HIDDEN);

        document.onmousedown = () => this.append_state(State.ACTIVE);
        document.onmouseup = () => this.remove_state(State.ACTIVE);
    }

    /**
     * Render cursor movement.
     */
    private render() {
        if (this.coords.curr && this.coords.prev) {
            this.coords.prev = lerp_coords(
                this.coords.prev,
                this.coords.curr,
                this.config.lerp_coeff
            );
            this.move(this.coords.prev);
        } else {
            this.coords.prev = this.coords.curr;
        }

        requestAnimationFrame(() => this.render());
    }

    /**
     * Setup cursor instance for Vue.
     */
    setup() {
        onMounted(() => this.refresh());
        onUpdated(() => this.refresh());
    }
}

const cursor = new Cursor();
export default cursor;
