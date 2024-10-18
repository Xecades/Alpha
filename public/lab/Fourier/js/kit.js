class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sync();
    }

    get str() {
        return `(${this.x}, ${this.y})`;
    }

    get r() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    sync() {
        this.real = this.x;
        this.imag = this.y;
    }

    apply(f) {
        return new point(f(this.x), f(this.y));
    }

    add(p) {
        return new point(this.x + p.x, this.y + p.y);
    }

    minus(p) {
        return this.add(p.apply((x) => -x));
    }

    multiply(p) {
        if (p instanceof complex || p instanceof point)
            return new complex(
                this.x * p.x - this.y * p.y,
                this.y * p.x + this.x * p.y
            );
        return this.apply((x) => p * x);
    }
}

class complex extends point {
    constructor(real, imag) {
        super(real, imag);
    }

    get theta() {
        return Math.atan(this.imag / this.real);
    }

    get str() {
        if (this.real == 0 && this.imag == 0) return `0`;
        else if (this.real == 0) return `${this.imag}i`;
        else if (this.imag == 0) return `${this.real}`;
        else if (this.imag > 0) return `${this.real} + ${this.imag}i`;
        else return `${this.real} - ${-this.imag}i`;
    }

    multiply(p) {
        if (p instanceof complex || p instanceof point)
            return new complex(
                this.real * p.real - this.imag * p.imag,
                this.imag * p.real + this.real * p.imag
            );
        return this.apply((x) => p * x);
    }
}

function dist(a, b) {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

function $var(key) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

const zero = new point(0, 0);
