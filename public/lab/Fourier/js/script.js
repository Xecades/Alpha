var margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
};
var W = document.body.clientWidth - 1;
var H = document.body.clientHeight - 1;
var w = W - margin.left - margin.right;
var h = H - margin.top - margin.bottom;

var xScale, yScale;
var rate = 0;
var vectorN = +$var("num") || 400;

var svg, help;

var xAxis, yAxis, xRevAxis, yRevAxis;

var circles = [];
var timer;

function initScale() {
    xScale = 1.5;
    yScale = (xScale * h) / w;

    xAxis = d3.scale
        .linear()
        .range([margin.left, W - margin.right])
        .domain([-xScale, xScale]);
    yAxis = d3.scale
        .linear()
        .range([margin.top, H - margin.bottom])
        .domain([-yScale, yScale]);

    xRevAxis = d3.scale
        .linear()
        .domain([margin.left, W - margin.right])
        .range([-xScale, xScale]);
    yRevAxis = d3.scale
        .linear()
        .domain([margin.top, H - margin.bottom])
        .range([-yScale, yScale]);
}

function scale(pos) {
    return new complex(xAxis(pos.x), yAxis(pos.y));
}

function revScale(pos) {
    return new complex(xRevAxis(pos.x), yRevAxis(pos.y));
}

function play(f, gen) {
    timer && clearTimeout(timer);

    initSVG();
    initCn(f, gen);
    initCircle(gen);

    var t = 0;
    (function loop() {
        t += dt;

        frames = frame(t, gen);
        var sum = zero;

        for (let v = 0; v < frames.length; v++) {
            var temp = sum.add(frames[v][0]);

            moveCircle(frames[v][1], scale(sum), scale(temp));
            sum = temp;
        }

        t - dt == 0 &&
            svg.select(".trace").attr("d", `M${scale(sum).x},${scale(sum).y}`);
        t - dt == 0 &&
            help
                .select(".helperXPath")
                .attr("d", `M${scale(sum).x},${margin.top}`);
        t - dt == 0 &&
            help
                .select(".helperYPath")
                .attr("d", `M${margin.left},${scale(sum).y}`);
        t - dt != 0 && addTrace(scale(sum), t);
        timer = setTimeout(loop, rate);
    })();
}

function addTrace(pos, t) {
    help.select(".helperx")
        .attr("x1", pos.x)
        .attr("y1", pos.y)
        .attr("x2", pos.x)
        .attr("y2", margin.top);
    help.select(".helpery")
        .attr("x1", pos.x)
        .attr("y1", pos.y)
        .attr("x2", margin.left)
        .attr("y2", pos.y);

    help.select(".helperXDot").attr(
        "transform",
        "translate(" + pos.x + ", " + margin.top + ")"
    );
    help.select(".helperYDot").attr(
        "transform",
        "translate(" + margin.left + ", " + pos.y + ")"
    );

    if (t >= 1 + dt * 2) return;
    var oriTrace = svg.select(".trace").attr("d");
    var oriXPath = help.select(".helperXPath").attr("d");
    var oriYPath = help.select(".helperYPath").attr("d");

    svg.select(".trace").attr("d", oriTrace + `L${pos.x},${pos.y}`);
    help.select(".helperXPath").attr("d", oriXPath + `L${pos.x},${margin.top}`);
    help.select(".helperYPath").attr("d", oriYPath + `L${margin.left},${pos.y}`);
}

function moveCircle(n, bef, aft) {
    circles[n].attr("transform", "translate(" + bef.x + ", " + bef.y + ")");
    circles[n].select("circle").attr("r", dist(bef, aft));
    circles[n]
        .select("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", aft.x - bef.x)
        .attr("y2", aft.y - bef.y);
}

function initCircle(gen) {
    circles = [];
    for (var n = -gen; n <= gen; n++) circles[n] = circle();
}

function circle() {
    var g = svg.append("g").attr("class", "circleGroup");

    g.append("circle").attr("class", "circle").attr("r", 3);
    g.append("circle").attr("class", "dot").attr("r", 3);
    g.append("line").attr("class", "line");

    g.attr("transform", "translate(" + W / 2 + ", " + H / 2 + ")");
    return g;
}

function initSVG() {
    svg && svg.remove();
    help && help.remove();

    svg = d3.select("body").append("svg").attr("width", W).attr("height", H);
    help = svg
        .append("g")
        .attr("class", "help")
        .attr("width", W)
        .attr("height", H);

    svg.append("path").attr("class", "trace");

    help.append("line")
        .attr("class", "axis")
        .attr("y1", H / 2)
        .attr("x1", margin.left)
        .attr("y2", H / 2)
        .attr("x2", W - margin.right);
    help.append("line")
        .attr("class", "axis")
        .attr("x1", W / 2)
        .attr("y1", margin.top)
        .attr("x2", W / 2)
        .attr("y2", H - margin.bottom);

    help.append("line").attr("class", "helperx");
    help.append("line").attr("class", "helpery");

    help.append("path").attr("class", "helperXPath");
    help.append("path").attr("class", "helperYPath");

    help.append("circle").attr("class", "helperXDot").attr("r", 3);
    help.append("circle").attr("class", "helperYDot").attr("r", 3);
}

function func(t) {
    return revScale(Ft[Math.round(t / dt)]);
    // if (t < 0.5) return new complex(-0.5, 0);
    // return new complex(0.5, 0);
}