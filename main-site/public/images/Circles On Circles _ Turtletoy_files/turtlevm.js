function turtlevm(strCode, errorcb) {
    function work() {
        delete Function.prototype.constructor;
        delete Object.getOwnPropertyNames;
        delete XMLHttpRequest;
        delete Worker;
        delete setTimeout;
        delete setInterval;
        delete importScripts;
        delete WebSocket;
        delete MessageChannel;
        delete IDBDatabase;
        delete EventSource;
        delete OffscreenCanvas;
        delete eval;
        delete fetch;

        x/0/x

        x/1/x

        _vmPathManager.postNewData(true);

        Canvas.define();

        // precalculate new data
        let _vmActive = true;
        self.onmessage = function (e) {
            const t = e.data.t;
            if (_vmPathManager.time != t) {
                _vmPathManager.time = t;
                _vmPathManager.clear();
                _vmActive = true;
            }
            if (typeof walk !== "undefined" && typeof walk === "function" && _vmActive) {
                _vmPathManager.postNewData(_vmActive);
                let _s = performance.now();
                do {
                    _vmActive = walk(_vmPathManager.frame++, t);
                } while (performance.now() - _s < 10 && _vmActive);
            } else {
                _vmPathManager.postNewData(false);
            }
        }
    }

    "use strict"

    const code = String(work).trim().split("{").slice(1).join("{").slice(0, -1).trim().replace("x/0/x", _turtlevmapi).replace("x/1/x", strCode);
    const worker = new Worker(URL.createObjectURL(new Blob([code])));

    worker.onerror = function (e) { // error while compiling code
        const m = e.message;
        e = {
            toString: function () {
                return m + "\n" + Object.keys(e.e).map(
                    function (a) {
                        if (this[a] == null || typeof this[a] === "object") return;
                        return a + ": \t" + this[a]
                    }, e.e).filter(Boolean).join("\n");
            },
            e: e,
        };
        errorcb(e, null, code, worker); // invoke callback with result, null as the event object to indicate errror, and some extra arguments for routing
        worker.terminate();
    }

    return worker;
}


function turtlevmapi() {
    "use strict";

    function VMCanvas() {
        let opacity = 1;
        let defined = false;
        this.setpenopacity = function (o) {
            if (defined) {
                const err = new Error('You can set pen opacity only once (in the global scope)');
                const s = err.stack.split(':');
                let i = 0;
                for (const k in s) {
                    if (parseInt(s[k]) == s[k]) {
                        if (++i == 2) {
                            err.message += "#" + s[k];
                        }
                    }
                }
                throw(err);
            } else {
                defined = true;
                opacity = isNaN(o) ? 1 : o;
            }
        }
        this.getopacity = function () {
            return opacity;
        }
        this.define = function () {
            defined = true;
        }
    }

    class VMPath {
        constructor(id, c, manager) {
            this._id = id;
            this._coords = [c];
            this._manager = manager;
        }
        lineTo(c) {
            this._coords.push(c);
            this._manager.setActive(this);
        }
        getNewData() {
            const ret = [...this._coords];

            this._coords = [ret[ret.length-1]];

            return ret;
        }
        id() {
            return this._id;
        }
    }

    class VMPathManager {
        constructor() {
            this._pathid = 0;
            this._paths = [];
            this._activePaths = [];
            this.frame = 0;
            this.time = 1;
        }
        newPath(c) {
            const p = new VMPath(this._pathid, c, this);
            this._paths.push(p);
            this._pathid++;
            return p;
        }
        postNewData(active) {
            const data = {};
            this._activePaths.map( p => {
                const d = p.getNewData();
                if (d.length) {
                    data[p.id()] = d;
                }
            });
            this._activePaths = [];
            self.postMessage({paths: data, active: active, frame: this.frame, opacity: Canvas.getopacity()});
        }
        clear() {
            this.frame = 0;
        }
        setActive(p) {
            this._activePaths[p.id()] = p;
        }
    }

    const Canvas = new VMCanvas();
    const _vmPathManager = new VMPathManager();

    class Turtle {
        constructor(x, y) {
            this._x = 0;
            this._y = 0;
            this._h = 0;
            this._pen = false;
            this._fullCircle = 360;
            this.goto(x || 0, y || 0);
            this.pendown();
        }
        forward(e) {
            const x = this.x() + e * Math.cos(this._h);
            const y = this.y() + e * Math.sin(this._h);
            this.goto(x, y);
        }
        backward(e) {
            this.forward(-e);
        }
        right(e) {
            this._h += this.toradians(e);
        }
        left(e) {
            this.right(-e);
        }
        pendown() {
            if (!this._pen) {
                this._path = _vmPathManager.newPath([this._x, this._y]);
            }
            this._pen = true;
        }
        penup () {
            this._pen = false;
        }
        degrees (e) {
            this._fullCircle = e ? e : 360;
        }
        radians () {
            this.degrees(Math.PI * 2);
        }
        goto (x, y) {
            if (Array.isArray(x)) {
                this._x = x[0];
                this._y = x[1];
            } else {
                this._x = x || 0;
                this._y = y || 0;
            }
            if(this._pen) {
                this._path.lineTo([this._x, this._y]);
            }
        }
        jump(x, y) {
            if (this.x() === x && this.y() === y) {
                return;
            }
            const pen = this.isdown();
            this.penup();
            this.goto(x, y);
            if (pen) {
                this.pendown();
            }

        }
        setx (e) {
            this.goto(e, this.y());
        }
        sety (e) {
            this.goto(this.x(), e);
        }
        toradians (e) {
            return e *(Math.PI * 2 / this._fullCircle);
        }
        setheading (e) {
            this._h = this.toradians(e);
        }
        circle(radius, extent, steps) {
            if (!extent) {
                extent = this._fullCircle;
            }
            extent = this.toradians(extent);
            if (!steps) {
                steps = Math.round(Math.abs(radius * extent * 8)) | 0;
                steps = Math.max(steps, 4);
            }
            const cx = this.x() + radius * Math.cos(this._h + Math.PI / 2);
            const cy = this.y() + radius * Math.sin(this._h + Math.PI / 2);
            const a1 = Math.atan2(this.y() - cy, this.x() - cx);
            const a2 = radius >= 0 ? a1 + extent : a1 - extent;
            for (let i = 0; i < steps; i++) {
                const p = i /(steps - 1);
                const a = a1 +(a2 - a1) * p;
                const x = cx + Math.abs(radius) * Math.cos(a);
                const y = cy + Math.abs(radius) * Math.sin(a);
                this.goto(x, y);
            }
            if (radius >= 0) {
                this._h += extent;
            } else {
                this._h -= extent;
            }
        }
        home () {
            this.penup();
            this.goto(0, 0);
            this.seth(0);
            this.pendown();
        }
        position () {
            return [this._x, this._y];
        }
        xcor() {
            return this.position()[0];
        }
        ycor() {
            return this.position()[1];
        }
        heading () {
            return this._h /(Math.PI * 2) * this._fullCircle;
        }
        isdown() {
            return this._pen;
        }
        clone() {
            const t = new Turtle(this.x(), this.y());
            t.degrees(this._fullCircle);
            t.seth(this.heading());
            return t;
        }
        distance(x, y = 0) {
            [x, y] = Array.isArray(x) ? x : [x, y];
            return Math.hypot(x - this.x(), y - this.y());
        }
        towards(x, y = 0) {
            [x, y] = x instanceof Turtle ? [x.x(), x.y()] : Array.isArray(x) ? x : [x, y];
            return (((Math.atan2(y - this.y(), x - this.x()) - this._h) /(Math.PI * 2) % 1 + 1) % 1) * this._fullCircle;
        }
        fullCircle() { return this._fullCircle; }
        fd(e) { this.forward(e); }
        bk(e) { this.backward(e); }
        back(e) { this.backward(e); }
        lt(e) { this.left(e); }
        rt(e) { this.right(e); }
        pd() { this.pendown(); }
        down () { this.pendown(); }
        pu() { this.penup(); }
        up() { this.penup(); }
        setposition(x, y) { this.goto(x, y); }
        setpos(x, y) { this.goto(x, y); }
        jmp(x, y) { this.jump(x, y); }
        seth(e) { this.setheading(e); }
        pos() { return this.position(); }
        x() { return this.xcor(); }
        y() { return this.ycor(); }
        h() { return this.heading(); }
    }
}

const _turtlevmapi = String(turtlevmapi).trim().split("{").slice(1).join("{").slice(0, -1).trim();