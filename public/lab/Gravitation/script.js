// ball green: (483, 230)
// ball red: (436, 288)
// ball blue: (525, 287)

// ball green: (668.000, 218.000)
// ball red: (540.000, 352.000)
// ball blue: (784.000, 355.000)

// ball green: (308.000, 131.000)
// ball red: (499.000, 268.000)
// ball blue: (753.000, 383.000)
// ball aqua: (358.000, 522.000)

var ctx, bctx, interval, g_col, g_row, PXpMM;
var play = false;
var ready = false;

const eps = 20000; // 每秒多少次计算
const refreshT = 1; // 绘制帧间隔毫秒数
const pxToM = 1e10; // 每像素对应多少米
const fixed = 3; // 保留几位小数
const G = 6.67e-11;
const massGlobal = 1.99e30;
const dotSize = 11;

var ITEM_NUM = 3; // max: 15
const EMPTY_PROMISE = new Promise(resolve => {
    resolve();
});
const COLORS = ["none", "green", "red", "blue", "aqua", "black", "pink", "brown", "gray", "lime", "coral", "navy", "olive", "purple", "silver", "teal", "yellow"];

class vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get str() {
        return `(${this.x.toFixed(fixed)}, ${this.y.toFixed(fixed)})`;
    }

    add(vec) {
        return new vector(this.x + vec.x, this.y + vec.y);
    }
    apply(f) {
        return new vector(f(this.x), f(this.y));
    }
    minus(vec) {
        return this.add(vec.apply(x => -x));
    }
    times(v) {
        if (v instanceof vector)
            return this.x * v.x + this.y * v.y;
        return this.apply(x => v * x);
    }
    cut(len) {
        return this.apply(x => x * len / this.norm);
    }
    standard() {
        return this.cut(1);
    }
};

const zero = new vector(0, 0);

class item {
    constructor(color, mass, pos, speed = zero) {
        this.color = color;
        this.mass = mass;
        this.speed = speed;
        this.pos = pos;
        this.forcesFunc = () => [];

        dot(this.pos, 10, this.color);
    }

    get resultant() {
        var ret = zero;
        var forces = this.forcesFunc(this.pos, this.mass);
        for (let i = 0; i < forces.length; i++)
            ret = ret.add(forces[i]);
        return ret;
    }

    setForceFunc(f) {
        this.forcesFunc = f;
    }
    calcNextFrame() {
        var addSpeed = this.resultant.apply(x => 1000 * x / (this.mass * eps * refreshT));
        var newSpeed = this.speed.add(addSpeed);
        this.pos = this.pos.add(this.speed.add(newSpeed).times(500 / (eps * refreshT)));
        this.speed = newSpeed;
    }
    generate() {
        dot(this.pos, dotSize, "clear");
        var pos1 = this.pos;
        for (let i = 0; i < eps * refreshT / 1000; i++)
            this.calcNextFrame();
        line(pos1, this.pos, this.color, bctx);
        dot(this.pos, 10, this.color);
    }
};

window.onload = () => {
    ctx = canvas.getContext("2d");
    bctx = bgcanvas.getContext("2d");
    PXpMM = getPXpMM();

    if (loadPageVar("n"))
        ITEM_NUM = loadPageVar("n") * 1;
    ITEM_NUM = Math.min(ITEM_NUM, 15);
    ITEM_NUM = Math.max(ITEM_NUM, 1);

    getSize();
    for (let i = 1; i <= ITEM_NUM; i++)
        eval(`a${i} = new item("clear", massGlobal, zero, zero);`);

    recursePromise(EMPTY_PROMISE, 1);
};

document.onkeydown = e => {
    if (e.keyCode == 32 && ready) {
        if (!play) {
            interval = setInterval(() => {
                for (let i = 1; i <= ITEM_NUM; i++) {
                    eval(`a${i}.generate();
                    priority${i}.innerHTML = "坐标: ${eval(`a${i}.pos.str`)}<br>速度: ${eval(`(a${i}.speed.norm * eps).toFixed(fixed)`)}"`);
                }
            }, refreshT);
        } else {
            clearInterval(interval);
        }
        play = !play;
    }
}

document.onclick = () => {
    document.onkeydown({
        keyCode: 32
    });
}

function recursePromise(promised, depth) {
    if (depth == ITEM_NUM + 1) {
        window.onclick = () => {};
        console.log("Ready!");
        ready = true;
        clear(bgcanvas);
        return;
    }
    promised.then(() => {
        return selectPos(depth);
    }).then(() => {
        return requestMass();
    }).then(mass => {
        promised = setupItem(depth, mass);
        recursePromise(promised, depth + 1);
    });
}

function requestMass() {
    return new Promise(resolve => {
        input.value = 1;
        panel.setAttribute("class", "visible");
        input.focus();
        input.select();
        input.onblur = () => input.focus();
        panel.onkeydown = e => {
            if (e.keyCode == 13 || e.keyCode == 32) {
                panel.setAttribute("class", "invisible");
                panel.onkeydown = () => {};
                resolve(input.value ? input.value : 1);
            }
        };
    });
}

function setupItem(mark, mass) {
    return new Promise(resolve => {
        eval(`a${mark} = new item("${COLORS[mark]}", ${mass * massGlobal}, StartA${mark}, zero);
            a${mark}.setForceFunc((pos, mass) => {
                var ret = [];
                for (let i = 1; i <= ITEM_NUM; i++) {
                    if (i == mark) continue;
                    eval(\`var distance = dist(pos, a\${i}.pos);
                    var F = G * (mass * a\${i}.mass) / (distance * distance);
                    var VF = a\${i}.pos.minus(pos).cut(F);\`);
                    ret.push(VF);
                }
                return ret;
            });
            property.innerHTML += \`<div class="title" style="color: ${COLORS[mark]}">星体 #\${mark} \${COLORS[mark]}</div>
            <div>初始坐标: \${StartA${mark}.str}<br>质量: ${mass * massGlobal}kg (${mass} 倍太阳)</div>
            <div id="priority${mark}">坐标: (0, 0)<br>速度: 0</div>\`;
            resolve();`);
    });
}

function selectPos(mark) {
    return new Promise(resolve => {
        var pos = zero;
        window.onmousemove = e => {
            dot(pos, 8, "clear", bctx);
            pos = new vector(e.clientX, e.clientY);
            dot(pos, 7, COLORS[mark], bctx);
            window.onclick = () => {
                eval(`StartA${mark} = pos;`);
                console.log(`ball ${COLORS[mark]}: ${pos.str}`);
                window.onmousemove = () => {};
                resolve();
            };
        };
    });
}

function getSize() {
    g_col = document.body.clientWidth - 1;
    g_row = document.body.clientHeight - 1;
    canvas.setAttribute("width", g_col);
    canvas.setAttribute("height", g_row);
    bgcanvas.setAttribute("width", g_col);
    bgcanvas.setAttribute("height", g_row);
}

function dist(pos1, pos2) {
    return pos1.minus(pos2).norm * pxToM;
}

function dot(pos, size, color, pen = ctx) {
    if (isOut(pos))
        return;
    if (color == "clear")
        pen.globalCompositeOperation = "destination-out";
    pen.fillStyle = color;
    pen.beginPath();
    pen.arc(pos.x, pos.y, size, 0, 2 * Math.PI);
    pen.fill();
    if (color == "clear")
        pen.globalCompositeOperation = "source-over";
}

function line(pos1, pos2, color, pen = ctx) {
    if (isOut(pos1) && isOut(pos2))
        return;
    pen.strokeStyle = color;
    pen.beginPath();
    pen.moveTo(pos1.x, pos1.y);
    pen.lineTo(pos2.x, pos2.y);
    pen.stroke();
}

function isOut(pos) {
    return pos.x < -dotSize || pos.x > g_col + dotSize || pos.y < -dotSize || pos.y > g_row + dotSize;
}

function clear(item) {
    item.height = item.height;
}

function getPXpMM() {
    var t = document.createElement("div");
    t.style.width = "1mm";
    document.body.appendChild(t);
    var ret = t.getBoundingClientRect().width;
    t.remove();
    return ret;
}

function loadPageVar(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}