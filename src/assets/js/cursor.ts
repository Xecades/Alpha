/**
 * @todo 开关控制台偶尔会导致子光标卡住，当前 prod 环境也有这个问题
 */

import { onMounted, onUpdated } from "vue";

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

interface Coord {
    x: number;
    y: number;
}

interface Cursor {
    cursor: HTMLDivElement;
    pos: { curr: Coord | null; prev: Coord | null };
    els: NodeListOf<Element>;
}

class Cursor {
    constructor() {
        this.pos = { curr: null, prev: null };

        this.create();
        this.init();
        this.render();
    }

    refresh() {
        this.cursor.classList.remove("hover");
        this.els = document.querySelectorAll(".cursor");
        let that = this;

        for (let i = 0; i < this.els.length; i++) {
            this.els[i].addEventListener("mouseover", () => {
                that.cursor.classList.add("hover");
            });

            this.els[i].addEventListener("mouseout", () => {
                that.cursor.classList.remove("hover");
            });
        }
    }

    move(left: number, top: number) {
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    create() {
        this.cursor = document.createElement("div");
        this.cursor.id = "cursor";
        this.cursor.classList.add("hidden");
        document.body.append(this.cursor);
    }

    init() {
        document.onmousemove = (e) => {
            this.pos.curr == null && this.move(e.clientX - 8, e.clientY - 8);
            this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 };
            this.cursor.classList.remove("hidden");
        };
        document.onmouseenter = () => this.cursor.classList.remove("hidden");
        document.onmouseleave = () => this.cursor.classList.add("hidden");
        document.onmousedown = () => this.cursor.classList.add("active");
        document.onmouseup = () => this.cursor.classList.remove("active");
    }

    render() {
        if (this.pos.curr && this.pos.prev) {
            this.pos.prev.x = lerp(this.pos.prev.x, this.pos.curr.x, 0.1);
            this.pos.prev.y = lerp(this.pos.prev.y, this.pos.curr.y, 0.1);
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        requestAnimationFrame(() => this.render());
    }
}

const cursor = new Cursor();

function setupCursor() {
    onMounted(() => cursor.refresh());
    onUpdated(() => cursor.refresh());
}

function refreshCursor() {
    cursor.refresh();
}

export { refreshCursor, setupCursor };
