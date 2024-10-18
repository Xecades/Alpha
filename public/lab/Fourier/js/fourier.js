const dt = .001;

var CnSheet = [];
var Ft = [];

function expi(x) { // e ^ (ix)
    return new complex(Math.cos(x), Math.sin(x));
}

function Cn(n, f) {
    var sum = zero;
    for (var t = 0; t <= 1; t += dt)
        sum = sum.add(expi(-2 * Math.PI * n * t).multiply(f(t)));
    return sum.multiply(dt);
}

function nthVector(n, t) {
    return CnSheet[n].multiply(expi(2 * Math.PI * n * t));
}

function initCn(f, gen) {
    CnSheet = [];
    for (var n = -gen; n <= gen; n++)
        CnSheet[n] = Cn(n, f);
}

function frame(t, gen) {
    var movements = [];

    for (var n = 1; n <= gen; n++) {
        movements.push([nthVector(n, t), n]);
        movements.push([nthVector(-n, t), -n]);
    }
    
    return movements.sort((a, b) => b[0].r - a[0].r);
}