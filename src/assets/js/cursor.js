import { onMounted, onUpdated } from "vue";

const lerp = (a, b, n) => (1 - n) * a + n * b;

class Cursor {
    constructor() {
        this.pos = { curr: null, prev: null };
        this.els = [];
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

    move(left, top) {
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    create() {
        if (!this.cursor) {
            this.cursor = document.createElement("div");
            this.cursor.id = "cursor";
            this.cursor.classList.add("hidden");
            document.body.append(this.cursor);
        }
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
        if (this.pos.prev) {
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
export default function setupCursor() {
    onMounted(() => cursor.refresh());
    onUpdated(() => cursor.refresh());
}
