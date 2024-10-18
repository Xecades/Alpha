const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

function _canvas(aspect) {
    return document.getElementById(`canvas${aspect}`);
}

function _ctx(aspect) {
    return _canvas(aspect).getContext("2d");
}

function related(asp) {
    let a1, a2, a3, a4, s1, s2, s3, s4;

    switch (asp) {
        case 0:
            a1 = stat[5], s1 = DOWN;
            a2 = stat[3], s2 = UP;
            a3 = stat[2], s3 = UP;
            a4 = stat[1], s4 = UP;
            break;
        case 1:
            a1 = stat[0], s1 = LEFT;
            a2 = stat[2], s2 = LEFT;
            a3 = stat[4], s3 = LEFT;
            a4 = stat[5], s4 = LEFT;
            break;
        case 2:
            a1 = stat[0], s1 = DOWN;
            a2 = stat[3], s2 = LEFT;
            a3 = stat[4], s3 = UP;
            a4 = stat[1], s4 = RIGHT;
            break;
        case 3:
            a1 = stat[0], s1 = RIGHT;
            a2 = stat[5], s2 = RIGHT;
            a3 = stat[4], s3 = RIGHT;
            a4 = stat[2], s4 = RIGHT;
            break;
        case 4:
            a1 = stat[2], s1 = DOWN;
            a2 = stat[3], s2 = DOWN;
            a3 = stat[5], s3 = UP;
            a4 = stat[1], s4 = DOWN;
            break;
        case 5:
            a1 = stat[4], s1 = DOWN;
            a2 = stat[3], s2 = RIGHT;
            a3 = stat[0], s3 = UP;
            a4 = stat[1], s4 = LEFT;
            break;
    }
    return [a1, s1, a2, s2, a3, s3, a4, s4];
    //      0,  1,  2,  3,  4,  5,  6,  7
}

function rotateFour(a) {
    let rel = related(a);
    let queue = [];
    for (let i = 1; i <= 4; i++) {
        let s = rel[i * 2 - 1];
        for (let j = 0; j < 3; j++) {
            switch (s) {
                case LEFT:  queue.push(`[0][${j}]`); break;
                case RIGHT: queue.push(`[2][${j}]`); break;
                case UP:    queue.push(`[${j}][0]`); break;
                case DOWN:  queue.push(`[${j}][2]`); break;
            }
        }
    }

    let a1, a2, a3;

    let lis = [];
    lis[0] = [11, 10, 9, 6, 7, 8, 3, 4, 5, 2, 1, 0];
    lis[1] = [9, 10, 11, 6, 7, 8, 3, 4, 5, 0, 1, 2];
    lis[2] = [11, 10, 9, 6, 7, 8, 5, 4, 3, 0, 1, 2];
    lis[3] = [9, 10, 11, 6, 7, 8, 3, 4, 5, 0, 1, 2];
    lis[4] = [9, 10, 11, 8, 7, 6, 5, 4, 3, 0, 1, 2];
    lis[5] = [9, 10, 11, 8, 7, 6, 3, 4, 5, 2, 1, 0];

    eval(`a1 = rel[0]${queue[lis[a][9]]}`);
    eval(`a2 = rel[0]${queue[lis[a][10]]}`);
    eval(`a3 = rel[0]${queue[lis[a][11]]}`);

    eval(`rel[0]${queue[0]} = rel[6]${queue[lis[a][0]]}`);
    eval(`rel[0]${queue[1]} = rel[6]${queue[lis[a][1]]}`);
    eval(`rel[0]${queue[2]} = rel[6]${queue[lis[a][2]]}`);

    eval(`rel[6]${queue[9]} = rel[4]${queue[lis[a][3]]}`);
    eval(`rel[6]${queue[10]} = rel[4]${queue[lis[a][4]]}`);
    eval(`rel[6]${queue[11]} = rel[4]${queue[lis[a][5]]}`);

    eval(`rel[4]${queue[6]} = rel[2]${queue[lis[a][6]]}`);
    eval(`rel[4]${queue[7]} = rel[2]${queue[lis[a][7]]}`);
    eval(`rel[4]${queue[8]} = rel[2]${queue[lis[a][8]]}`);

    eval(`rel[2]${queue[3]} = a1`);
    eval(`rel[2]${queue[4]} = a2`);
    eval(`rel[2]${queue[5]} = a3`);
}

function drawSquare(aspect, x, y, mark) {
    let ctx = _ctx(aspect);
    ctx.fillStyle = "#fefefe";
    ctx.fillRect(33 * x, 33 * y, 34, 34);
    ctx.fillStyle = COLOR[colorMark][ref(mark)];
    roundRect(ctx, 33 * x + 1, 33 * y + 1, 32, 32, 4);

    if (DisplayNumber) {
        ctx.font = "light 14px consolas";
        ctx.fillStyle = "#381924";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(mark, 33 * x + 17, 33 * y + 19);
    }
}

function drawAspect(aspect) {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            drawSquare(aspect, x, y, stat[aspect][x][y]);
        }
    }
}

function drawCube() {
    for (let asp = 0; asp < 6; asp++) {
        drawAspect(asp);
    }
}

function runCommand(cmd) {
    if (cmd > 0) {
        rotateAspect(cmd - 1);
        rotateFour(cmd - 1);
    } else if (cmd < 0) {
        rotateAspectT(-cmd - 1);
        rotateFour(-cmd - 1);
        rotateFour(-cmd - 1);
        rotateFour(-cmd - 1);
    }
}

function checkCommand(str) {
    for (let i = 0; i < str.length; i++) {
        let exist = false;
        for (let j = 0; j < CMDS.length; j++) {
            if (str[i] == CMDS[j]) {
                exist = true;
                break;
            }
        }
        if (!exist)
            return false;
    }
    return true;
}

function rotateAspect(a) {
    let asp = stat[a];
    let t;

    t = asp[0][0];
    asp[0][0] = asp[0][2];
    asp[0][2] = asp[2][2];
    asp[2][2] = asp[2][0];
    asp[2][0] = t;

    t = asp[1][0];
    asp[1][0] = asp[0][1];
    asp[0][1] = asp[1][2];
    asp[1][2] = asp[2][1];
    asp[2][1] = t;
}

function rotateAspectT(a) {
    let asp = stat[a];
    let t;

    t = asp[0][0];
    asp[0][0] = asp[2][0];
    asp[2][0] = asp[2][2];
    asp[2][2] = asp[0][2];
    asp[0][2] = t;

    t = asp[1][0];
    asp[1][0] = asp[2][1];
    asp[2][1] = asp[1][2];
    asp[1][2] = asp[0][1];
    asp[0][1] = t;
}

function checkInit() {
    for (let i = 0; i < 6; i++)
        for (let j = 0; j < 3; j++)
            for (let k = 0; k < 3; k++)
                if (ref(stat[i][j][k]) != i)
                    return false;
    return true;
}

function ref(mark) {
    return Math.floor((mark - 1) / 9);
}

function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;

    ctx.beginPath();

    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);

    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);

    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);

    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);

    ctx.fill();
    ctx.closePath();
}

document.onkeydown = e => {
    if (typeof e.key == "string" && checkCommand(e.key)) {
        launch(e.key);
    }
};