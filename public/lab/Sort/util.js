const COLORS = {
    DEF: "white",
    SWAP: "lime",
    CMP: "red",
    MV_SRC: "orange",
    MV_DEST: "yellow"
};

function wait() {
    return new Promise((res) => {
        let interval = setInterval(() => {
            if (!paused) {
                clearInterval(interval);
                res();
            }
        }, 1);
    });
}

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function shuffle() {
    let a = Array.from(Array(N).keys()).map((x) => x + 1);
    a.sort(() => Math.random() - 0.5);
    return a;
}

async function compare(ta, i, tb, j) {
    setColor(ta, i, COLORS.CMP);
    setColor(tb, j, COLORS.CMP);

    await sleep(ms_delay);
    await wait();

    setColor(ta, i, COLORS.DEF);
    setColor(tb, j, COLORS.DEF);
}

async function swap(ta, i, tb, j, callback = async () => {}) {
    setColor(ta, i, COLORS.SWAP);
    setColor(tb, j, COLORS.SWAP);

    await sleep(ms_delay / 2);
    await wait();

    let arr1 = $arr(ta), arr2 = $arr(tb);
    let t = arr1[i]; arr1[i] = arr2[j]; arr2[j] = t;
    refreshValue(ta, i);
    refreshValue(tb, j);
    await callback();

    await sleep(ms_delay / 2);
    await wait();

    setColor(ta, i, COLORS.DEF);
    setColor(tb, j, COLORS.DEF);
}

async function empty(type) {
    await wait();

    let arr = $arr(type);
    for (let i = 0; i < N; i++) arr[i] = 0;
    refreshChart(type);
}

async function copy(tsrc, i, tdest, j, callback = async () => {}) {
    setColor(tsrc, i, COLORS.MV_SRC);
    setColor(tdest, j, COLORS.MV_DEST);

    await sleep(ms_delay / 2);
    await wait();

    let src = $arr(tsrc), dest = $arr(tdest);
    dest[j] = src[i];
    refreshValue(tdest, j);
    await callback();

    await sleep(ms_delay / 2);
    await wait();

    setColor(tsrc, i, COLORS.DEF);
    setColor(tdest, j, COLORS.DEF);
}

async function mark(type, i) {
    setMark(type, i);
    await wait();
}

async function clearMark(type) {
    for (let i = 0; i < N; i++)
        unsetMark(type, i);
    await wait();
}

async function range(type, begin, end) {
    for (let i = begin; i <= end; i++)
        setSelect(type, i);
    await wait();
}

async function clearRange(type) {
    for (let i = 0; i < N; i++)
        unsetSelect(type, i);
    await wait();
}

function togglePause() {
    paused = !paused;
    $id("pause").innerText = paused ? "运行" : "暂停";
}

function limit(x, lo, hi) {
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}

function delay_mul(x) {
    ms_delay = limit(ms_delay * x, 1, 2000)
    $id("delay").value = ms_delay;
}

function n_add(x) {
    params.set("N", limit(N + x, 4, 500));
    location.search = params.toString();
}

const ALGO_MAP = {
    "bubble": bubbleSort,
    "selection": selectionSort,
    "insertion": insertionSort,
    "merge": mergeSort,
    "lomuto": quickSortLomuto,
    "hoare": quickSortHoare
};

let params = new URLSearchParams(location.search);

let f = ALGO_MAP[params.get("algorithm") || "bubble"];
let N = +params.get("N") || 30;
let ms_delay = +params.get("delay") || 300;
let paused = true;

let main = shuffle();
let aux = Array(N).fill(0);

initChart(MAIN);
initChart(AUX);

refreshChart(MAIN);
refreshChart(AUX);

f({ swap, compare, empty, copy, mark, range, clearRange, mark, clearMark });

document.onkeydown = (e) => {
    if (e.code == "Space") togglePause();
    if (e.code == "ArrowUp") delay_mul(0.5);
    if (e.code == "ArrowDown") delay_mul(2);
}

$id("algorithm").value = params.get("algorithm") || "bubble";
$id("N").value = +params.get("N") || 30;
$id("delay").value = +params.get("delay") || 300;

$id("N-plus-10").onclick = () => n_add(10);
$id("N-minus-10").onclick = () => n_add(-10);
$id("shuffle").onclick = () => { location.reload(); }
$id("pause").onclick = togglePause;
$id("delay-times-2").onclick = () => delay_mul(2);
$id("delay-div-2").onclick = () => delay_mul(0.5);
$id("algorithm").onchange = () => {
    params.set("algorithm", $id("algorithm").value);
    location.search = params.toString();
}
$id("N").onchange = () => {
    params.set("N", $id("N").value);
    location.search = params.toString();
}
$id("delay").onchange = () => {
    ms_delay = +$id("delay").value;
}