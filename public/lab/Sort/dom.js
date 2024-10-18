const $id = id => document.getElementById(id);
const $arr = type => type == MAIN ? main : aux;

const MAIN = "main";
const AUX = "aux";

function initChart(type) {
    for (let i = 0; i < N; i++) {
        let node = document.createElement("div");
        node.appendChild(document.createElement("span"));
        node.id = type + "-" + i;
        $id(type).appendChild(node);
    }
}

function setColor(type, i, color) {
    let item = $id(type + "-" + i).firstChild;
    item.style.backgroundColor = color;
}

function setSelect(type, i) {
    let item = $id(type + "-" + i);
    item.classList.add("sel");
}

function unsetSelect(type, i) {
    let item = $id(type + "-" + i);
    item.classList.remove("sel");
}

function setMark(type, i) {
    let item = $id(type + "-" + i);
    item.classList.add("mark");
}

function unsetMark(type, i) {
    let item = $id(type + "-" + i);
    item.classList.remove("mark");
}

function refreshValue(type, i) {
    let item = $id(type + "-" + i).firstChild;
    item.style.height = 100 * $arr(type)[i] / (N + 1) + "%"
}

function refreshChart(type) {
    for (let i = 0; i < N; i++) {
        refreshValue(type, i);
        setColor(type, i, COLORS.DEF);
    }
}
