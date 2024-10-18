var fileInput = document.getElementById("svg-file");

function getFile(file, call) {
    return Ajax(`svg/${file}.svg`, call);
}

function Ajax(url, call) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) call(this.response);
        else call(null);
    };

    request.send();
}

function load(SVG) {
    transferFunc(SVG);
    initScale();
    play(func, vectorN);
}

function transferFunc(SVG) {
    Ft = [];

    var dot = document.createElement("div"); dot.id = "dot";
    document.body.appendChild(dot);

    dot.setAttribute("style", `offset-path: path("${SVG.d}"); top: calc(50% - ${SVG.width / 2}px); left: calc(50% - ${SVG.height / 2}px)`);

    var tot = 1 / dt;
    for (var i = 0; i <= tot; i++) {
        dot.style["offset-distance"] = `${(100 * i) / tot}%`;
        var rect = dot.getBoundingClientRect();
        var frame = new complex(rect.left - W / 2, rect.top - H / 2);
        Ft.push(frame);
    }
    dot.remove();
}

function transferSVG(svgData) {
    var SVGHolder = document.createElement("span");
    SVGHolder.id = "SVGHolder";
    SVGHolder.innerHTML = svgData;
    document.body.appendChild(SVGHolder);

    var SVG = svgToPath(document.querySelector("#SVGHolder svg"));

    SVGHolder.remove();
    return SVG;
}

getFile($var("file") || "note", (data) => {
    load(transferSVG(data));
});