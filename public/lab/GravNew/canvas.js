let canvas, ctx;
let isDragging = false;
let isAdding = false;
let isPausing = true;
let showInfo = true;
let showAxis = true;

// constant values
const NOW = new Date;
const DAY2SEC = 24 * 60 * 60;
const COLOR_SHIFT = 90;
const WHELL_SCALE = 1.2;
const MIN_SCALE = 0.0045;
const MAX_SCALE = 100;
const MAX_PATH_FRAMES = 1500;
const FONT_SIZE = 19;
const G = 6.67259e-11; // G = 6.67259e-11m^3/(kg·s^2)
const AU2PX = 200; // 1au = 200px
const SUN2KG = 1.989e30; // 1sun = 1.989e30kg
const AU2M = 1.496e11; // 1au = 1.496e11m

// _ is for screen
let _width = 0, _height = 0, _ratio = 1;
let _centerX, _centerY;
let _scale = 1;
let _lastX = 0, _lastY = 0;

// $ is for canvas
let $gridWidth = 100;

// none is for manipulation
let pls = [];
let timeScale = 365 * DAY2SEC;
let RealTime = +new Date;
let time = 0;

const __f = a => a < 10 ? '0' + a : a;
const sigmoid = a => 1 / (1 + Math.exp(-a));
const updateData = (type, value) => document.querySelector("#data ." + type).innerHTML = value;
const formatDate = a => `${a.getFullYear()}/${__f(a.getMonth())}/${__f(a.getDay())} ${__f(a.getHours())}:${__f(a.getMinutes())}`;

window.onload = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    drawFrame();

    updateData("scale", _scale + "x");
    updateData("isPausing", isPausing ? "Pausing" : "Playing");
    updateData("planetNum", pls.length + " planets");
    updateData("timeScale", timeScale / DAY2SEC + " days/sec");
    updateData("time", formatDate(NOW));

    canvas.addEventListener("wheel", wheelEvent);
    canvas.addEventListener("mousedown", mousedownEvent);
    canvas.addEventListener("mousemove", mousemoveEvent);
    canvas.addEventListener("mouseup", mouseupEvent);
    document.addEventListener("keydown", keydownEvent);
};

function rgbToHex(color) {
    function $(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    let r = Math.round(color.r);
    let g = Math.round(color.g);
    let b = Math.round(color.b);

    let hex = "#" + $(r) + $(g) + $(b);
    return hex.toUpperCase();
}

function addPlanet() {
    isAdding = true;
    document.body.style.cursor = "crosshair";
}

function faster() {
    timeScale *= 20;
    updateData("timeScale", timeScale / DAY2SEC + " days/sec");
}

function slower() {
    timeScale /= 20;
    updateData("timeScale", timeScale / DAY2SEC + " days/sec");
}

function toggleInfo() {
    showInfo = !showInfo;
}

function calcPlanets() {
    if (isPausing) return;
    let dt = (+new Date - RealTime) / 1000;
    RealTime = +new Date;
    for (let i = 0; i < pls.length; i++) {
        let acc = { x: 0, y: 0 };
        for (let j = 0; j < pls.length; j++) {
            if (i == j) continue;

            let p1 = pls[i];
            let p2 = pls[j];
            let dx = (p2.x - p1.x) * AU2M;
            let dy = (p2.y - p1.y) * AU2M;

            let a = G * p2.mass * (dx ** 2 + dy ** 2) ** (-3 / 2);

            acc.x += a * dx;
            acc.y += a * dy;
        }

        let rdt = timeScale * dt;

        pls[i].x += (pls[i].vx * rdt + 0.5 * acc.x * rdt ** 2) / AU2M;
        pls[i].y += (pls[i].vy * rdt + 0.5 * acc.y * rdt ** 2) / AU2M;

        pls[i].vx += acc.x * rdt;
        pls[i].vy += acc.y * rdt;

        pls[i].path.push({ x: pls[i].x, y: pls[i].y });
        if (pls[i].path.length > MAX_PATH_FRAMES) pls[i].path.shift();
    }
    time += timeScale * dt * 1000;
    updateData("time", formatDate(new Date(+NOW + time)));
}

function keydownEvent(e) {
    switch (e.key) {
        case "=": case "+":
            faster();
            break;
        case "-": case "_":
            slower();
            break;
        case " ": case "Enter":
            isPausing = !isPausing;
            RealTime = +new Date;
            updateData("isPausing", isPausing ? "Pausing" : "Playing");
            break;
    }
}

function mousedownEvent(e) {
    if (isAdding) {
        isAdding = false;
        document.body.style.cursor = "";

        let _cursorX = e.clientX * _ratio - _centerX;
        let _cursorY = e.clientY * _ratio - _centerY;

        let x = _cursorX / _scale / AU2PX; // au
        let y = _cursorY / _scale / AU2PX; // au
        let r = Math.floor(COLOR_SHIFT + Math.random() * (256 - COLOR_SHIFT));
        let g = Math.floor(COLOR_SHIFT + Math.random() * (256 - COLOR_SHIFT));
        let b = Math.floor(COLOR_SHIFT + Math.random() * (256 - COLOR_SHIFT));
        let fill = { r, g, b };
        let mass = prompt("该星体质量是太阳的几倍？", 1) * SUN2KG; // kg
        let size = sigmoid(mass / SUN2KG) * 50 - 25;
        let path = [];

        pls.push({ x, y, vx: 0, vy: 0, size, fill, mass, path });
        updateData("planetNum", pls.length + " planets");
    } else {
        isDragging = true;
        _lastX = e.clientX * _ratio;
        _lastY = e.clientY * _ratio;
    }
}

function mousemoveEvent(e) {
    if (isDragging) {
        _centerX += e.clientX * _ratio - _lastX;
        _centerY += e.clientY * _ratio - _lastY;
        _lastX = e.clientX * _ratio;
        _lastY = e.clientY * _ratio;
    }
}

function mouseupEvent(e) {
    isDragging = false;
}

function wheelEvent(e) {
    let _x = e.clientX * _ratio;
    let _y = e.clientY * _ratio;

    let _deltaS = e.deltaY > 0 ? 1 / WHELL_SCALE : WHELL_SCALE;

    if (_scale < MIN_SCALE && e.deltaY > 0) return;
    if (_scale > MAX_SCALE && e.deltaY < 0) return;

    _scale *= _deltaS;

    _centerX -= (_x - _centerX) * (_deltaS - 1);
    _centerY -= (_y - _centerY) * (_deltaS - 1);

    updateData("scale", _scale + "x");
}

function loadAxis() {
    if (!showAxis) return;
    // if (1 / _scale > 10) return;

    let $l = -_centerX / _scale;
    let $r = (_width - _centerX) / _scale;
    let $t = -_centerY / _scale;
    let $b = (_height - _centerY) / _scale;

    ctx.beginPath();

    for (let $d = 0; $d <= $b; $d += $gridWidth) {
        ctx.moveTo($l, $d);
        ctx.lineTo($r, $d);
    }

    for (let $d = -$gridWidth; $d >= $t; $d -= $gridWidth) {
        ctx.moveTo($l, $d);
        ctx.lineTo($r, $d);
    }

    for (let $d = 0; $d <= $r; $d += $gridWidth) {
        ctx.moveTo($d, $t);
        ctx.lineTo($d, $b);
    }

    for (let $d = -$gridWidth; $d >= $l; $d -= $gridWidth) {
        ctx.moveTo($d, $t);
        ctx.lineTo($d, $b);
    }

    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 0.4 / _scale;
    ctx.stroke();
}

function drawFrame() {
    ctx.clearRect(0, 0, _width, _height);

    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = ctx.backingStorePixelRatio || 1;
    _ratio = devicePixelRatio / backingStoreRatio;

    canvas.width = window.innerWidth * _ratio;
    canvas.height = window.innerHeight * _ratio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    _width = canvas.width;
    _height = canvas.height;

    _centerX = _centerX ?? _width / 2;
    _centerY = _centerY ?? _height / 2;

    ctx.translate(_centerX, _centerY);
    ctx.scale(_scale, _scale);

    loadAxis();
    calcPlanets();

    for (let i = 0; i < pls.length; i++) {
        let fill = `rgb(${pls[i].fill.r}, ${pls[i].fill.g}, ${pls[i].fill.b})`;

        // draw path
        if (pls[i].path.length > 1) {
            let $startX = pls[i].path[0].x * AU2PX;
            let $startY = pls[i].path[0].y * AU2PX;
            let $endX = pls[i].path.at(-1).x * AU2PX;
            let $endY = pls[i].path.at(-1).y * AU2PX;

            let gnt = ctx.createLinearGradient($startX, $startY, $endX, $endY);
            gnt.addColorStop(0, "transparent");
            gnt.addColorStop(1, fill);

            ctx.beginPath();
            ctx.moveTo($startX, $startY);
            for (let j = 1; j < pls[i].path.length; j++) {
                ctx.lineTo(pls[i].path[j].x * AU2PX, pls[i].path[j].y * AU2PX);
            }
            ctx.strokeStyle = gnt;
            ctx.lineWidth = 1 / _scale;
            ctx.stroke();
        }

        // draw planet
        let r = pls[i].size / _scale;
        ctx.beginPath();
        ctx.arc(pls[i].x * AU2PX, pls[i].y * AU2PX, r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();

        // draw info
        if (showInfo) {
            let x = pls[i].x * AU2PX;
            let y = pls[i].y * AU2PX + r + 20 / _scale;
            let velocity = Math.sqrt(pls[i].vx ** 2 + pls[i].vy ** 2);

            ctx.fillStyle = fill;
            ctx.textAlign = "center";
            ctx.font = `${FONT_SIZE / _scale}px Arial`;

            ctx.fillText(rgbToHex(pls[i].fill), x, y);
            ctx.fillText(velocity.toFixed(2) + "m/s", x, y + FONT_SIZE / _scale);
            ctx.fillText(pls[i].mass + "kg", x, y + 2 * FONT_SIZE / _scale);
        }
    }

    requestAnimationFrame(drawFrame);
}