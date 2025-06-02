"use strict";

"use strict";

const EPSILON = 0.0001;

// 2D vector operations
const vec = {
    normalize: a => {
        const l = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
        return l > 0 ? [a[0] / l, a[1] / l] : [...a];
    },
    add: (a, b) => [a[0] + b[0], a[1] + b[1]],
    mul: (a, b) => [a[0] * b, a[1] * b],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    dot: (a, b) => a[0] * b[0] + a[1] * b[1],
    equal: (a, b) => Math.abs(a[0] - b[0]) < EPSILON && Math.abs(a[1] - b[1]) < EPSILON,
    dist_sqr: (a, b) => (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]),
    dist: (a, b) => Math.sqrt(vec.dist_sqr(a, b)),
    inside_sqr: (a, size) => Math.abs(a[0]) <= size && Math.abs(a[1]) <= size,
    find_segment_intersect: (l1p1, l1p2, l2p1, l2p2) => {
        const d = (l2p2[1] - l2p1[1]) * (l1p2[0] - l1p1[0]) - (l2p2[0] - l2p1[0]) * (l1p2[1] - l1p1[1]);
        const n_a = (l2p2[0] - l2p1[0]) * (l1p1[1] - l2p1[1]) - (l2p2[1] - l2p1[1]) * (l1p1[0] - l2p1[0]);
        const n_b = (l1p2[0] - l1p1[0]) * (l1p1[1] - l2p1[1]) - (l1p2[1] - l1p1[1]) * (l1p1[0] - l2p1[0]);
        if (d === 0) {
            return false;
        }
        const ua = n_a / d;
        const ub = n_b / d;
        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            return [l1p1[0] + (ua * (l1p2[0] - l1p1[0])), l1p1[1] + (ua * (l1p2[1] - l1p1[1]))];
        }
        return false;
    },
    find_segment_intersect_x(pointA, pointB, xBoundary) {
        let slope = (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]);
        let yIntercept = pointA[1] - slope * pointA[0];
        let yAtBoundary = slope * xBoundary + yIntercept;
        if ((yAtBoundary >= Math.min(pointA[1], pointB[1]) && yAtBoundary <= Math.max(pointA[1], pointB[1])) &&
            (xBoundary >= Math.min(pointA[0], pointB[0]) && xBoundary <= Math.max(pointA[0], pointB[0]))) {
            return [xBoundary, yAtBoundary];
        }
        return false;
    }
}

function clipPaths(paths, size = 100) {
    let clippedPaths = [];
    let rectCorners = [[-size, -size], [size, -size], [size, size], [-size, size], [-size, -size]];

    for (let path of paths) {
        if (!path || path.length === 0) continue;

        let clippedPath = [];
        let prevInside = false;
        for (let i = 0; i < path.length - 1; i++) {
            let pointA = path[i];
            let pointB = path[i + 1];
            let insideA = vec.inside_sqr(pointA, size);
            let insideB = vec.inside_sqr(pointB, size);

            if (insideA) {
                if (!prevInside || i === 0) {
                    clippedPaths.push(clippedPath);
                    clippedPath = [];
                    // The start point is inside the rectangle and it is the first point or the previous point was outside the rectangle.
                    clippedPath.push(pointA);
                }
                if (insideB) {
                    // Both points are inside the rectangle.
                    clippedPath.push(pointB);
                    prevInside = true;
                    continue;
                }
            }

            let intersected = false;

            // At least one point is outside the rectangle.
            for (let j = 0; j < rectCorners.length - 1; j++) {
                let cornerA = rectCorners[j];
                let cornerB = rectCorners[j + 1];
                let intersection = vec.find_segment_intersect(pointA, pointB, cornerA, cornerB);
                if (intersection) {
                    intersected = true;
                    clippedPath.push(intersection);
                }
            }

            if (!insideA && insideB) {
                // The end point is inside the rectangle and the start point is outside the rectangle.
                clippedPath.push(pointB);
            } else (!intersected && !insideA && !insideB); {
                // Both points are outside the rectangle.
                if (clippedPath.length > 0) {
                    clippedPaths.push(clippedPath);
                }
                clippedPath = [];
            }

            prevInside = insideB;
        }
        clippedPaths.push(clippedPath);
    }
    return clippedPaths.filter(p => p.length > 1);
}

"use strict";

class EventDispatcher {
    constructor() {
        this.events = {};
    }

    addListener(event, callback) {
        this.events[event]?.push(callback) || (this.events[event] = [callback]);
    }

    removeListener(event, callback) {
        this.events[event] = this.events[event]?.filter(listener => listener !== callback) || false;
    }

    dispatch(event, data) {
        this.events[event]?.forEach((listener) => listener(data));
    }
}


"use strict";

class TurtleSVG {
    constructor(editor) {
        this._editor = editor;

        this._filename = '';
        this._canvasSize = 100;
        this._opacity = 1;
        this._progressBar = $('#svgExportProgress');
        this._timeout = 500;

        $('#svgExportButton').click(() => {
            $('#svgExportButton').prop('disabled', true);
            setTimeout(() => {
                this.export_0();
            }, 32);
        });
    }

    setProgress(progress) {
        this._progressBar.css('width', progress + '%');
    }

    export_0() {
        this._progressBar.removeClass('progress-bar-animated');
        this.setProgress(0);

        let optimisedPaths = this._editor.paths;

        let size = $('#svgSize').val();
        if (isNaN(size)) {
            size = 180;
            $('#svgSize').val(size);
        }

        let text = '';
        if ($('#svgTitle').prop('checked')) {
            text += this._title;
        }
        if ($('#svgAuthor').prop('checked')) {
            if (text !== '') text += ', ';
            text += this._author;
        }
        if ($('#svgDate').prop('checked')) {
            if (text !== '') text += ', ';
            text += this._date;
        }

        this.setProgress(10);
        setTimeout(() => {
            this.export_1(optimisedPaths, text, size);
        }, this._timeout);
    }

    export_1(optimisedPaths, text, size) {
        if ($('#svgClip').prop('checked')) {
            optimisedPaths = clipPaths(optimisedPaths, this._canvasSize);
        }

        this.setProgress(20);
        setTimeout(() => {
            this.export_2(optimisedPaths, text, size);
        }, this._timeout);
    }

    export_2(optimisedPaths, text, size) {
        if ($('#svgSplit').prop('checked')) {
            optimisedPaths = this.splitPaths(optimisedPaths, text, size);
        }

        this._progressBar.addClass('progress-bar-animated');
        this.setProgress(30);
        setTimeout(() => {
            this.export_3(optimisedPaths, text, size, 0);
        }, this._timeout);
    }

    export_3(optimisedPaths, text, size, i) {
        if ($('#svgOptimise').prop('checked')) {
            if (optimisedPaths.length > 0) {
                this.setProgress(Math.min(90, 40 + i * 20));

                let l = optimisedPaths.length;
                optimisedPaths = this.optimisePathOrder(optimisedPaths);

                if (l > optimisedPaths.length && i < 4) {
                    this.setProgress(100);
                    setTimeout(() => {
                        this.export_3(optimisedPaths, text, size, i + 1);
                    }, this._timeout);
                } else {
                    this.setProgress(100);
                    setTimeout(() => {
                        this.export_4(optimisedPaths, text, size);
                    }, this._timeout);
                }
            }
        } else {
            this.setProgress(100);
            setTimeout(() => {
                this.export_4(optimisedPaths, text, size);
            }, this._timeout);
        }
    }

    export_4(optimisedPaths, text, size) {
        if (optimisedPaths.length > 0) {
            this.downloadSVG(optimisedPaths, size, text, $('#svgCrop').prop('checked'), $('#svgTextBelow').prop('checked'));
        }
        $("#svgModal").modal('hide');

        setTimeout(() => {
            this._progressBar.css('width', '0%');
            $('#svgExportButton').prop('disabled', false);
        }, 100);
    }

    splitPaths(paths) {
        const opt = [];

        for (const k in paths) {
            const p = paths[k];
            for (let j = 0; j < p.length - 1; j++) {
                opt.push([p[j], p[j + 1]]);
            }
        }
        return opt;
    }

    optimisePathOrder(paths) {
        const optimisedOrder = [paths.pop()];

        while (paths.length > 0) {
            let minDist = 1000000000;
            let optI = -1;
            let reverse = false;
            const lastP = optimisedOrder[optimisedOrder.length - 1];
            const lastC = lastP[lastP.length - 1];

            for (let i = 0; i < paths.length; i++) {
                const p = paths[i];
                let dist = vec.dist_sqr(p[0], lastC);
                if (dist < minDist) {
                    minDist = dist;
                    optI = i;
                    reverse = false;
                }
                dist = vec.dist_sqr(p[p.length - 1], lastC);
                if (dist < minDist) {
                    minDist = dist;
                    optI = i;
                    reverse = true;
                }
                if (minDist < 0.001) {
                    break;
                }
            }

            const elem = paths.splice(optI, 1)[0];

            if (reverse) {
                elem.reverse();
            }

            if (minDist < 0.001) {
                optimisedOrder[optimisedOrder.length - 1].pop();
                optimisedOrder[optimisedOrder.length - 1] = optimisedOrder[optimisedOrder.length - 1].concat(elem);
            } else {
                optimisedOrder.push(elem);
            }
        }

        return optimisedOrder;
    }

    exportSVG(filename) {
        this._filename = filename;
        this._canvasSize = this._editor.getCanvasSize();
        this._opacity = this._editor.getOpacity();
        this._author = this._editor.getAuthor() || '?';
        this._title = this._editor.getTitle() || 'New';
        this._date = this._editor.getDate() || '?';

        $("#svgModal").modal('show');
    }

    downloadSVG(paths, size, text, cropMarks, textBelow) {
        const canvasSize = this._canvasSize;
        const canvasWidth = canvasSize * 2;
        const canvasHeight = canvasSize * 2;
        const width = size;
        const height = size;

        const filename = this._filename;
        const opacity = this._opacity;

        const op = Math.abs(opacity);
        const w = (2 * canvasSize / 1024).toFixed(4);
        const bgcol = opacity > 0 ? '#fff' : '#000';
        const fgcol = opacity > 0 ? '#000' : '#fff';

        const cl = .05 * canvasSize;

        // create svg data...
        let s = '<?xml version="1.0"?><svg  viewBox="0 0 ' + canvasWidth + ' ' + canvasHeight + '" width="' + width + 'mm" height="' + height + 'mm" xmlns="http://www.w3.org/2000/svg"  version="1.2" viewport-fill="' + bgcol + '">\n';

        if (opacity < 0) {
            s += '  <rect fill="' + bgcol + '" width="' + (canvasWidth) + '" height="' + (canvasWidth) + '" y="0" x="0"/>\n';
        }

        if (cropMarks) {
            s += '  <polyline points="' + this.formatPair([0, cl], 1) + ' 0,0 ' + this.formatPair([cl, 0], 1) + '" style="fill:none;stroke:' + fgcol + ';stroke-width:' + w + ';opacity:.5" stroke-linecap="round"/>\n';
            s += '  <polyline points="' + this.formatPair([canvasWidth, cl], 1) + ' ' + canvasWidth + ',0 ' + this.formatPair([canvasWidth - cl, 0], 1) + '" style="fill:none;stroke:' + fgcol + ';stroke-width:' + w + ';opacity:.5" stroke-linecap="round"/>\n';
            s += '  <polyline points="' + this.formatPair([0, canvasHeight - cl], 1) + ' 0,' + canvasHeight + ' ' + this.formatPair([cl, canvasHeight], 1) + '" style="fill:none;stroke:' + fgcol + ';stroke-width:' + w + ';opacity:.5" stroke-linecap="round"/>\n';
            s += '  <polyline points="' + this.formatPair([canvasWidth, canvasHeight - cl], 1) + ' ' + canvasWidth + ',' + canvasHeight + ' ' + this.formatPair([canvasWidth - cl, canvasHeight], 1) + '" style="fill:none;stroke:' + fgcol + ';stroke-width:' + w + ';opacity:.5" stroke-linecap="round"/>\n';
        }

        for (const k in paths) {
            const path = paths[k];
            const scale = textBelow ? 1 - 10 / canvasSize : 1;
            if (path.length > 1) {
                s += '  <polyline points="';
                for (let j = 0; j < path.length; j++) {
                    s += this.formatPair(path[j], scale, canvasSize, canvasSize) + (j < path.length - 1 ? ' ' : '');
                }
                s += '"  style="fill:none;stroke:' + fgcol + ';stroke-width:' + w + ';opacity:' + op + '" stroke-linecap="round"/>\n';
            }
        }

        if (text !== "") {
            const textData = turtle_text(text);
            for (const k in textData.paths) {
                const path = textData.paths[k];
                const scale = 4 / 30;
                const xOffset = canvasWidth - 10 - textData.x * scale;
                const yOffset = canvasHeight - 5;
                if (path.length > 1) {
                    s += '  <polyline points="';
                    for (let j = 0; j < path.length; j++) {
                        s += this.formatPair(path[j], scale, xOffset, yOffset) + (j < path.length - 1 ? ' ' : '');
                    }
                    s += '" style="fill:none;stroke:' + fgcol + ';stroke-width:' + w + ';opacity:1" stroke-linecap="round"/>\n';
                }
            }
        }

        s += '</svg>';

        downloadFile(s, filename, 'svg');
    }

    formatNumber(a) {
        return a.toFixed(3);
    }

    formatPair(a, scale = 1, xOffset = 0, yOffset = 0) {
        return this.formatNumber(a[0] * scale + xOffset) + ',' + this.formatNumber(a[1] * scale + yOffset);
    }
}

"use strict";

class TurtleGIF {
    constructor(editor) {
        this._editor = editor;

        this._editor.addListener('run', () => {
            this.clearPathData();
        });
        this._editor.addListener('newPathData', e => {
            this.addPathData(e.paths);
        });

        this._paths = [];
        this._segments = 0;

        this._filename = '';
        this._opacity = 1;
        this._canvasScale = 100;
        this._canvasSize = 2048;
        this._canvasOutputSize = 512;

        this._baseCanvas = createCanvas(this._canvasSize);
        this._baseContext = this._baseCanvas.getContext('2d');
        this._baseContext.lineWidth = this._canvasSize / 1024;

        this._resizedCanvas = createCanvas(this._canvasOutputSize);
        this._resizedContext = this._resizedCanvas.getContext('2d');

        this._resizer = new canvas_resizer(this._baseCanvas, this._canvasOutputSize, this._resizedCanvas);
        this._resizerAnimated = undefined;

        $('#gifExportButton').click(() => {
            $('#gifExportButton').prop('disabled', true);
            setTimeout(() => {
                if ($('#gifDrawFrames').prop('checked')) {
                    this.createGifAnimatedFrames();
                } else {
                    this.createGifAnimateDrawing();
                }
            }, 64);
        });

        $('#gifDuration').on('input', function () {
            this.value = Math.min(Math.max(0.1, parseFloat(this.value)), 30);
        });

        $('#gifFps').on('input', function () {
            this.value = Math.min(Math.max(1, parseInt(this.value, 10)), 60);
        });

        this._progressBar = $('#gifExportProgress');
    }

    addPathData(paths) {
        Object.values(paths).forEach(path => {
            if (path.length > 1) {
                this._paths.push(path);
                this._segments += path.length - 1;
            }
        });
    }

    clearPathData() {
        this._paths = [];
    }

    exportGIF(filename) {
        this._filename = filename;
        this._opacity = this._editor.getOpacity();
        this._canvasScale = this._editor.getCanvasSize();

        this._progressBar.css('width', '0%');
        this._progressBar.removeClass('progress-bar-animated');

        $("#gifModal").modal('show');
    }

    createGIF() {
        const gif = new GIF({
            workers: 4,
            quality: 20,
            workerScript: './js/gif.js/gif.worker.js',
            repeat: ($('#gifLoop').prop('checked') ? 0 : -1),
        });

        gif.on('finished', (blob) => {
            downloadFile(blob, this._filename, 'image/gif');

            $("#gifModal").modal('hide');
            setTimeout(() => {
                $('#gifExportButton').prop('disabled', false);
            }, 100);
        });

        gif.on('progress', (p) => {
            this._progressBar.css('width', (50 + 50 * p) + '%');
        });

        return gif;
    }

    createGifAnimatedFrames() {
        const gif = this.createGIF();

        const duration = Math.min(Math.max(0.1, parseFloat($('#gifDuration').val())), 30);
        const fps = Math.min(Math.max(1, parseInt($('#gifFps').val(), 10)), 60);
        const frames = Math.max(1, Math.min(duration * fps, 20 * fps));

        initAndClearCanvas(this._baseCanvas, this._baseContext, this._opacity);
        initAndClearCanvas(this._resizedCanvas, this._resizedContext, 1);

        let frame = 0;
        this._editor.drawAnimatedFrames(frames, (canvas, done) => {
            if (!this._resizerAnimated) {
                this._resizerAnimated = new canvas_resizer(canvas, this._canvasOutputSize, this._resizedCanvas);
            }
            this._resizerAnimated.draw();

            gif.addFrame(this._resizedCanvas, {copy: true, delay: (1000 / fps)});
            this._progressBar.css('width', (50 * frame / frames) + '%');
            frame++;

            if (done) {
                this._progressBar.addClass('progress-bar-animated');
                gif.render();
            }
        });
    }

    createGifAnimateDrawing() {
        const gif = this.createGIF();

        const duration = Math.min(Math.max(0.1, parseFloat($('#gifDuration').val())), 30);
        const fps = Math.min(Math.max(1, parseInt($('#gifFps').val(), 10)), 60);
        const frames = Math.max(1, Math.min(duration * fps, 20 * fps));
        const scale = this._canvasScale;

        initAndClearCanvas(this._baseCanvas, this._baseContext, this._opacity);
        initAndClearCanvas(this._resizedCanvas, this._resizedContext, 1);

        let frame = 1;
        let neededSegmentsForFrame = (this._segments / frames) | 0;
        let segmentsDrawn = 0;

        this._paths.map(path => {
            if (path.length > 1) {
                this._baseContext.beginPath();
                this._baseContext.moveTo((path[0][0] * .5 / scale + .5) * this._canvasSize, (path[0][1] * .5 / scale + .5) * this._canvasSize);
                for (let i = 1; i < path.length; i++) {
                    this._baseContext.lineTo((path[i][0] * .5 / scale + .5) * this._canvasSize, (path[i][1] * .5 / scale + .5) * this._canvasSize);
                    segmentsDrawn++;

                    if (segmentsDrawn >= neededSegmentsForFrame) {
                        this._baseContext.stroke();
                        this._baseContext.beginPath();
                        this._baseContext.moveTo((path[i][0] * .5 / scale + .5) * this._canvasSize, (path[i][1] * .5 / scale + .5) * this._canvasSize);
                        frame++;
                        neededSegmentsForFrame = (frame * this._segments / frames) | 0;

                        this._resizer.draw();
                        gif.addFrame(this._resizedCanvas, {copy: true, delay: (1000 / fps)});
                        this._progressBar.css('width', (100 * frame / frames) + '%');
                    }
                }
                this._baseContext.stroke();
            }
        });

        if (frame < frames) {
            frame++;
            this._resizer.draw();
            gif.addFrame(this._resizedCanvas, {copy: true, delay: (1000 / fps)});
            this._progressBar.css('width', '100%');
        }

        this._progressBar.addClass('progress-bar-animated');
        gif.render();
    }
}

"use strict";

// based on https://github.com/paperjs/paper.js/blob/develop/src/path/PathFitter.js

class Segment2D {
    constructor(p, i = null, o = null) {
        this.point = [0, 0];
        this.handleIn = [0, 0];
        this.handleOut = [0, 0];

        this.point = [...p];
        if (i) this.handleIn = [...i];
        if (o) this.handleOut = [...o];
    }

    setHandleOut(o) {
        this.handleOut = [...o];
    }
}

class Path2DFitter {
    constructor(points) {
        this._points = [];
        let prev;

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (!prev || !vec.equal(prev, point)) {
                this._points.push((prev = [...point]));
            }
        }
    }

    fit(error) {
        const points = this._points,
            length = points.length;

        let segments = [];

        if (length > 0) {
            segments = [new Segment2D(points[0])];
            if (length > 1) {
                this.fitCubic(
                    segments,
                    error,
                    0,
                    length - 1,
                    vec.sub(points[1], points[0]),
                    vec.sub(points[length - 2], points[length - 1]),
                );
            }
        }
        return segments;
    }

    fitCubic(segments, error, first, last, tan1, tan2) {
        const points = this._points;
        if (last - first === 1) {
            let pt1 = points[first],
                pt2 = points[last],
                dist = Math.sqrt(vec.dist_sqr(pt1, pt2)) / 3;
            this.addCurve(segments, [
                pt1,
                vec.add(pt1, vec.mul(vec.normalize(tan1), dist)),
                vec.add(pt2, vec.mul(vec.normalize(tan2), dist)),
                pt2,
            ]);
            return;
        }
        let uPrime = this.chordLengthParameterize(first, last),
            maxError = Math.max(error, error * error),
            split = 0,
            parametersInOrder = true;
        for (let i = 0; i <= 4; i++) {
            const curve = this.generateBezier(first, last, uPrime, tan1, tan2);
            const max = this.findMaxError(first, last, curve, uPrime);
            if (max.error < error && parametersInOrder) {
                this.addCurve(segments, curve);
                return;
            }
            split = max.index;
            if (max.error >= maxError) break;
            parametersInOrder = this.reparameterize(first, last, uPrime, curve);
            maxError = max.error;
        }
        const tanCenter = vec.sub(points[split - 1], points[split + 1]);
        this.fitCubic(segments, error, first, split, tan1, tanCenter);
        this.fitCubic(segments, error, split, last, vec.mul(tanCenter, -1), tan2);
    }

    addCurve(segments, curve) {
        const prev = segments[segments.length - 1];
        prev.setHandleOut(vec.sub(curve[1], curve[0]));
        segments.push(new Segment2D(curve[3], vec.sub(curve[2], curve[3])));
    }

    generateBezier(first, last, uPrime, tan1, tan2) {
        const points = this._points;
        let pt1 = points[first],
            pt2 = points[last],
            C = [[0, 0], [0, 0]],
            X = [0, 0];

        for (let i = 0, l = last - first + 1; i < l; i++) {
            let u = uPrime[i],
                t = 1 - u,
                b = 3 * u * t,
                b1 = b * t,
                b2 = b * u,
                a1 = vec.mul(vec.normalize(tan1), b1),
                a2 = vec.mul(vec.normalize(tan2), b2),
                tmp = vec.sub(vec.sub(points[first + i], vec.mul(pt1, b + b1)), vec.mul(pt2, b2 + u * u * u));
            C[0][0] += vec.dot(a1, a1);
            C[0][1] += vec.dot(a1, a2);
            C[1][0] = C[0][1];
            C[1][1] += vec.dot(a2, a2);
            X[0] += vec.dot(a1, tmp);
            X[1] += vec.dot(a2, tmp);
        }

        let detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1],
            alpha1,
            alpha2;
        if (Math.abs(detC0C1) > EPSILON) {
            let detC0X = C[0][0] * X[1] - C[1][0] * X[0],
                detXC1 = X[0] * C[1][1] - X[1] * C[0][1];
            alpha1 = detXC1 / detC0C1;
            alpha2 = detC0X / detC0C1;
        } else {
            let c0 = C[0][0] + C[0][1],
                c1 = C[1][0] + C[1][1];
            alpha1 = alpha2 = Math.abs(c0) > EPSILON ? X[0] / c0 : Math.abs(c1) > EPSILON ? X[1] / c1 : 0;
        }

        let segLength = Math.sqrt(vec.dist_sqr(pt2, pt1)),
            eps = EPSILON * segLength,
            handle1,
            handle2;
        if (alpha1 < eps || alpha2 < eps) {
            alpha1 = alpha2 = segLength / 3;
        } else {
            const line = vec.sub(pt2, pt1);
            handle1 = vec.mul(vec.normalize(tan1), alpha1);
            handle2 = vec.mul(vec.normalize(tan2), alpha2);
            if (vec.dot(handle1, line) - vec.dot(handle2, line) > segLength * segLength) {
                alpha1 = alpha2 = segLength / 3;
                handle1 = handle2 = null;
            }
        }

        return [
            pt1,
            vec.add(pt1, handle1 || vec.mul(vec.normalize(tan1), alpha1)),
            vec.add(pt2, handle2 || vec.mul(vec.normalize(tan2), alpha2)),
            pt2,
        ];
    }

    reparameterize(first, last, u, curve) {
        for (let i = first; i <= last; i++) {
            u[i - first] = this.findRoot(curve, this._points[i], u[i - first]);
        }
        for (let i = 1, l = u.length; i < l; i++) {
            if (u[i] <= u[i - 1]) return false;
        }
        return true;
    }

    findRoot(curve, point, u) {
        const curve1 = [],
            curve2 = [];
        for (let i = 0; i <= 2; i++) {
            curve1[i] = vec.mul(vec.sub(curve[i + 1], curve[i]), 3);
        }
        for (let i = 0; i <= 1; i++) {
            curve2[i] = vec.mul(vec.sub(curve1[i + 1], curve1[i]), 2);
        }
        const pt = this.evaluate(3, curve, u),
            pt1 = this.evaluate(2, curve1, u),
            pt2 = this.evaluate(1, curve2, u),
            diff = vec.sub(pt, point),
            df = vec.dot(pt1, pt1) + vec.dot(diff, pt2);
        return Math.abs(df) < EPSILON ? u : u - vec.dot(diff, pt1) / df;
    }

    evaluate(degree, curve, t) {
        const tmp = curve.slice();
        for (let i = 1; i <= degree; i++) {
            for (let j = 0; j <= degree - i; j++) {
                tmp[j] = vec.add(vec.mul(tmp[j], 1 - t), vec.mul(tmp[j + 1], t));
            }
        }
        return tmp[0];
    }

    chordLengthParameterize(first, last) {
        const u = [0];
        for (let i = first + 1; i <= last; i++) {
            u[i - first] = u[i - first - 1] + Math.sqrt(vec.dist_sqr(this._points[i], this._points[i - 1]));
        }
        for (let i = 1, m = last - first; i <= m; i++) {
            u[i] /= u[m];
        }
        return u;
    }

    findMaxError(first, last, curve, u) {
        let index = Math.floor((last - first + 1) / 2),
            maxDist = 0;
        for (let i = first + 1; i < last; i++) {
            const P = this.evaluate(3, curve, u[i - first]);
            const v = vec.sub(P, this._points[i]);
            const dist = vec.dot(v, v);
            if (dist >= maxDist) {
                maxDist = dist;
                index = i;
            }
        }
        return {
            error: maxDist,
            index: index,
        };
    }
}

class PathInput {
    constructor(canvas) {
        this.canvasSize = 1024;
        this.mouseDown = false;

        // create input canvas on top
        const i = document.createElement('canvas');
        i.style.width = '100%';
        i.style.height = '100%';
        i.style.display = 'block';
        i.style.inset = '0';
        i.style.position = 'absolute';
        i.style.backgroundColor = '#ffffff00';
        i.style.zIndex = '1';
        i.width = this.canvasSize;
        i.height = this.canvasSize;

        canvas.parentElement.appendChild(i);

        this.canvas = i;
        this.ctx = this.canvas.getContext('2d');

        i.addEventListener('mousedown', e => this.startPath(e));
        i.addEventListener('mousemove', e => this.move(e));
        i.addEventListener('mouseleave', e => this.endPath(e));
        i.addEventListener('mouseup', e => this.endPath(e));
        i.addEventListener('mouseout', e => this.endPath(e));
        i.addEventListener('touchstart', e => this.startPath(e));
        i.addEventListener('touchmove', e => this.move(e));
        i.addEventListener('touchcancel', e => this.endPath(e));
        i.addEventListener('touchend', e => this.endPath(e));
        i.addEventListener('drag', e => e.preventDefault());

        this.hide();
    }

    startPath(e) {
        this.points = [this.p(e)];
        this.mouseDown = true;
        e.preventDefault();
    }

    move(e) {
        if (this.mouseDown) {
            this.points.push(this.p(e));
            this.draw();
        }
        e.preventDefault();
    }

    endPath(e) {
        if (this.mouseDown) {
            // this.points.push(this.p(e));
            this.draw();

            if (this.cb) {
                this.cb(this.getPathDataAsSVG(this.fit()));
            }

            this.clear();
        }
        this.mouseDown = false;
        e.preventDefault();
    }

    draw() {
        this.clear();

        // this.drawFit(this.fit());

        this.drawBBox();

        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0][0], this.points[0][1]);
        for (let i = 1; i < this.points.length; i++) {
            this.ctx.lineTo(this.points[i][0], this.points[i][1]);
        }
        this.ctx.stroke();
    }

    fit() {
        return this.points ? new Path2DFitter(this.points.map(p => this.dtc(p))).fit(3) : '';
    }

    dtc(p) {
        return [(p[0] * 200 / this.canvasSize - 100) | 0, (p[1] * 200 / this.canvasSize - 100) | 0];
    }

    ctd(p) {
        return [(p[0] - -100) / 200 * this.canvasSize, (p[1] - -100) / 200 * this.canvasSize];
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    }

    drawFit(fit) {
        let first = true;
        let out = [0, 0];
        let prev = [0, 0];
        let inp = [0, 0];

        this.ctx.beginPath();

        fit.forEach(s => {
            if (first) {
                inp.copy(s.point);
                this.ctx.moveTo(s.point[0], s.point[1]);
                first = false;
            } else {
                inp = vec.add(s.point, s.handleIn);
                if (vec.equal(inp, s.point) && vec.equal(out, prev)) {
                    this.ctx.lineTo(s.point[0], s.point[1]);
                } else {
                    this.ctx.bezierCurveTo(out[0], out[1], inp[0], inp[1], s.point[0], s.point[1]);
                }
            }
            prev = [...s.point];
            out = vec.add(prev, s.handleOut);
        });

        this.ctx.stroke();
    }

    p(e) {
        const bounds = this.canvas.getBoundingClientRect();
        const t = (e.targetTouches && e.targetTouches.length > 0) ? e.targetTouches[0] : e;
        return [this.canvasSize * (t.clientX - bounds.left) / bounds.width, this.canvasSize * (t.clientY - bounds.top) / bounds.height];
    }


    formatNumber(a) {
        return a.toFixed(0);
    }

    formatPair(a, b) {
        return this.formatNumber(a) + ',' + this.formatNumber(b);
    }

    show(svg, bbox = undefined) {
        this.canvas.style.display = 'block';
        this.bbox = bbox;
        this.drawSVG(svg);
    }

    hide() {
        this.canvas.style.display = 'none';
    }

    drawBBox() {
        if (this.bbox) {
            this.ctx.strokeStyle = '#00bc8c';
            this.ctx.lineWidth = 3;
            this.ctx.setLineDash([16]);
            const p = this.bbox;
            this.ctx.strokeRect((p[0] + 100) / 200 * this.canvasSize, (p[1] + 100) / 200 * this.canvasSize, p[2] / 200 * this.canvasSize, p[3] / 200 * this.canvasSize);
        }
        this.ctx.setLineDash([]);
        this.ctx.strokeStyle = '#e74c3c';
        this.ctx.lineWidth = 6;
    }

    drawSVG(svg) {
        this.clear();
        this.drawBBox();

        const c = this.parseSVG(svg);

        if (c.length > 0) {
            this.ctx.strokeStyle = '#e74c3c';
            this.ctx.lineWidth = 6;
            this.ctx.beginPath();

            c.forEach((inst) => {
                switch (inst.command) {
                    case 'M':
                        this.ctx.moveTo(...this.ctd(inst.p));
                        break;
                    case 'L':
                        this.ctx.lineTo(...this.ctd(inst.p));
                        break;
                    case 'C':
                        this.ctx.bezierCurveTo(...this.ctd(inst.c0), ...this.ctd(inst.c1), ...this.ctd(inst.p));
                        break;
                }
            });

            this.ctx.stroke();
        }
    }

    parseSVG(svg) {
        let i = 0, s = [0, 0], path = [];
        const t = svg.match(/([0-9.-]+|[MLC])/g);

        if (!t) return [];

        for (let i = 0; i < t.length;) {
            switch (t[i++]) {
                case 'M':
                    path.push({command: 'M', p: s = [t[i++], t[i++]]});
                    break;
                case 'L':
                    path.push({command: 'L', s: [...s], p: s = [t[i++], t[i++]]});
                    break;
                case 'C':
                    path.push({
                        command: 'C', s: [...s], c0: [t[i++], t[i++]], c1: [t[i++], t[i++]], p: s = [t[i++], t[i++]]
                    });
                    break;
                default:
                    i++;
            }
        }
        return path;
    }

    getPathDataAsSVG(fit) {
        let first = true;
        let out = [0, 0];
        let prev = [0, 0];
        let inp = [0, 0];
        let parts = [];

        fit.forEach(s => {
            if (first) {
                inp = [...s.point];
                parts.push('M' + this.formatPair(s.point[0], s.point[1]));
                first = false;
            } else {
                inp = vec.add(s.point, s.handleIn);
                if (vec.equal(inp, s.point) && vec.equal(out, prev)) {
                    parts.push('L' + this.formatPair(s.point[0], s.point[1]));
                } else {
                    parts.push('C' + this.formatPair(out[0], out[1]) + ' ' + this.formatPair(inp[0], inp[1]) + ' ' + this.formatPair(s.point[0], s.point[1]));
                }
            }
            prev = [...s.point];
            out = vec.add(prev, s.handleOut);
        });

        return parts.join('\n');
    }
}

"use strict";

class TurtleVars {
    constructor(editor, moveAbove) {
        this._vars = [];
        this._tooltips = [];
        this._editor = editor;
        this._code = '';

        if (moveAbove) {
            const c = parseInt(this.accessCookie('dock'));
            if (c >= 0) {
                this._dock = c;
            } else {
                this._dock = window.innerHeight < 1200 ? 1 : 0;
            }
        } else {
            this._dock = 0;
        }

        this._editor.addListener('run', e => {
            if (e.code !== this._code) {
                this.parseCode(e.code);
                this.updateVarForm();
            }
        });

        this._editor.addListener('hashchange', e => {
            this.updateVarForm();
        });
        this._editor.addListener('vmVariablesChanged', e => {
            if (this.varsChanged()) {
                $('.var-restore').removeClass('d-none');
            } else {
                $('.var-restore').addClass('d-none');
            }
        });

        $('.var-help-button').click(() => {
            showAdjustableVariablesAlert();
        });
        $('#varMoveRight').click(() => {
            this.toggleDock();
        });
        $('#varMoveLeft').click(() => {
            this.toggleDock();
        });
        $('.var-restore').click(() => {
            window.location.hash = '';
            $('.var-restore').addClass('d-none');
        });
        $('.var-random-button').click(() => {
            this._vars.forEach(t => randomVar(t));
            this.toggleDrawPathAllOff();
            this.updateEditorVars();
        });

        this.pathinput = new PathInput(editor.outputCanvas);

        this.setEditorHeight();
    }

    createCookie(cookieName, cookieValue) {
        const date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
    }

    accessCookie(cookieName) {
        let value = -1;
        const name = cookieName + "=";
        document.cookie.split(';').forEach((temp) => {
            temp = temp.trim();
            if (temp.indexOf(name) === 0) {
                value = temp.substring(name.length, temp.length);
            }
        });
        return value;
    }

    parseCode(code) {
        this.disposeTooltips();

        this._vars = [];
        this._code = code;

        const reNumber = /^\s*(let|const)\s*([a-z0-9_]+)\s*=\s*([-\d\.]+)[;\s]*\/\/\s*min\s*=\s*([-\d\.]+)[,\s]+max\s*=\s*([-\d\.]+)[,\s]+step\s*=\s*([-\d\.]+)[,\t ]*(\((.*)\))?(?:,\s*)?(.*)?/gmi;
        let match;

        while (match = reNumber.exec(code)) {
            const obj = {
                name: match[2],
                value: match[3],
                min: match[4],
                max: match[5],
                step: match[6],
                values: match[8] ? match[8].split(',') : undefined,
                type: 'range',
                comment: (match[9] || '').trim(),
            };
            if (obj.step > 0 && obj.values && obj.values.length === (obj.step - obj.min - -obj.max) / obj.step) {
                obj.type = 'select';
            }
            obj.index = code.indexOf(match[0]);
            this._vars.push(obj);
        }

        const rePath = /^\s*(let|const)\s*([a-z0-9_]+)\s*=[\s'"`]*([\.\+\-0-9CML,\s]+)[\s'"`]*[;\s]*\/\/\s*type\s*=\s*path,?(\s*bbox\s*=\s*([\d\.\+\-]+)[,\s]+([\d\.\+\-]+)[,\s]+([\d\.\+\-]+)[,\s]+([\d\.\+\-]+)*)?([^\n]*)?/gmi;

        while (match = rePath.exec(code)) {
            const obj = {
                name: match[2],
                value: match[3],
                type: 'path',
                comment: (match[9] || '').trim(),
            };
            if (match[5] !== undefined && match[6] !== undefined && match[7] !== undefined && match[8] !== undefined) {
                obj.bbox = [match[5], match[6], match[7], match[8]].map(parseFloat);
            }
            obj.index = code.indexOf(match[0]);
            this._vars.push(obj);
        }

        // and find all the variables with type = string, thanks chatgpt!
        const reString = /^\s*(let|const)\s+([a-z0-9_]+)\s*=\s*(['"`])(.*?)\3.*?;?.*?\/\/\s*type\s*=\s*string(?:,\s*)?(.*)?/gmi;

        while (match = reString.exec(code)) {
            const obj = {
                name: match[2],
                value: match[4],
                type: 'text',
                comment: (match[5] || '').trim(),
            };
            obj.index = code.indexOf(match[0]);
            this._vars.push(obj);
        }

        // sort the variables by index
        this._vars.sort((a, b) => a.index - b.index);
    }

    getContainer() {
        return $('#varContainer' + this._dock);
    }

    getForm() {
        return $('#varForm' + this._dock).get(0);
    }

    setEditorHeight() {
        const editor = $('#editorContainer');
        const container = this.getContainer();

        $('#editorContainer').css('display', 'none');
        const delta = window.innerHeight >= $(document).innerHeight() ? 200 : 200 - 42;
        $('#editorContainer').css('display', 'block');

        if (this._dock === 0 || container.css('display') === 'none') {
            editor.css('height', 'calc(100vh - ' + delta + 'px)');
        } else {
            const varHeight = container.innerHeight();
            if (varHeight + 100 > window.innerHeight / 2) {
                editor.css('height', 'calc(100vh - ' + delta + 'px)');
            } else {
                editor.css('height', 'calc(100vh - ' + (delta + container.innerHeight()) + 'px - 1rem)');
            }
        }
        this._editor.resize();
    }

    toggleDock() {
        this.getContainer().css('display', 'none');
        this.getForm().innerHTML = '';
        this._dock = (this._dock + 1) % 2;
        this.updateVarForm();
        this.createCookie('dock', this._dock);
    }

    disposeTooltips() {
        this._tooltips.forEach(t => {
            $(t).tooltip('dispose');
        });
        this._tooltips = [];
    }

    updateVarForm() {
        const container = this.getContainer();
        const form = this.getForm();
        const vars = this._editor.getVmVariables();

        this.disposeTooltips();
        this.toggleDrawPathAllOff();

        if (this._vars.length) {
            container.css('display', 'block');

            form.innerHTML = '';
            this._vars.forEach(t => {
                const name = escapeVarName(t.name);
                const vs = document.createElement('span');
                const i = t.type === 'select' ? document.createElement('select') : t.type === 'path' ? document.createElement('button') : document.createElement('input');
                if (t.type === 'range') {
                    i.type = t.type;
                    i.min = parseFloat(t.min);
                    i.max = parseFloat(t.max);
                    i.step = parseFloat(t.step);
                }
                if (t.type === 'select') {
                    $(i).addClass('custom-select rounded');
                    t.values.forEach((v, index) => {
                        const option = document.createElement('option');
                        option.value = '' + (parseFloat(t.min) + index * parseFloat(t.step));
                        option.text = v;
                        i.add(option);
                    });
                }
                if (t.type === 'text') {
                    i.type = 'text';
                }
                if (t.type === 'path') {
                    $(i).click(() => {
                        if (i.selected) {
                            this.toggleDrawPathOff(i);
                            this.pathinput.hide();
                        } else {
                            this.toggleDrawPathAllOff();
                            this.toggleDrawPathOn(i);
                            this.pathinput.show(i.value, t.bbox);
                            this.pathinput.cb = (value) => {
                                i.value = value;
                                this.toggleDrawPathAllOff();
                                this.changevars(i, vs, name, t);
                                this.pathinput.hide();
                            }
                        }
                        i.blur();
                    });
                }
                i.oninput = () => this.changevars(i, vs, name, t);
                i.onchange = () => this.changevars(i, vs, name, t);
                t.input = i;

                let value = escapeVarValue(t);

                vars.forEach(v => {
                    if (v.key === name) {
                        value = escapeVarValue({...t, ...v});
                    }
                });

                form.appendChild(this.createField(i, vs, name, t));
                i.value = value;

                if (t.type === 'path') {
                    this.fillPathCopyField(i, vs, name, t);
                } else if (t.type === 'text') {
                    vs.innerText = '';
                } else {
                    vs.innerText = this.formatNumber(value);
                }
                if (t.type === 'path') {
                    $(i).addClass('input-group-text input-path-button');
                    i.innerHTML = `${iconToggleOff()}${iconToggleOn()}<span>Draw path</span>`;
                } else {
                    $(i).addClass('form-control');
                }

                if (t.comment) {
                    i.dataset.toggle = "tooltip";
                    i.title = t.comment;
                    i.dataset.originalTitle = t.comment;
                    $(i).tooltip();
                    i.addEventListener('blur', () => {
                        $(i).tooltip('hide');
                    });
                    this._tooltips.push(i);
                }
            });
        } else {
            container.css('display', 'none');
        }
        this.setEditorHeight();

        if (this.varsChanged()) {
            this.updateEditorVars();
        }
    }

    varsChanged() {
        return this._vars.some(t => t.input && (t.type === 'path' || t.type === 'text') ? `${t.value}` !== `${t.input.value}` : parseFloat(t.value) !== parseFloat(t.input.value));
    }

    toggleDrawPathAllOff() {
        this._vars.forEach(t => {
            if (t.type === 'path' && t.input) {
                this.toggleDrawPathOff(t.input);
            }
        });
        this.pathinput.hide();
    }

    toggleDrawPathOn(i) {
        $(i.childNodes[0]).addClass('d-none');
        $(i.childNodes[1]).removeClass('d-none');
        i.selected = true;
    }

    toggleDrawPathOff(i) {
        $(i.childNodes[0]).removeClass('d-none');
        $(i.childNodes[1]).addClass('d-none');
        i.selected = false;
    }

    formatNumber(n) {
        n = parseFloat(n);
        if (Math.abs(n) >= 100) {
            return n.toFixed(0);
        } else if (Math.abs(n) >= 10) {
            return n.toFixed(1);
        } else {
            return n.toFixed(2);
        }
    }

    changevars(i, vs, name, t) {
        if (t.type === 'path') {
            this.fillPathCopyField(i, vs, name, t);
        } else if (t.type === 'text') {
            vs.innerText = '';
        } else {
            vs.innerText = this.formatNumber(i.value);
        }
        this.updateEditorVars();
    }

    updateEditorVars() {
        if (this._editor.setVmVariables(this._vars.map(t => ({
            key: escapeVarName(t.name), value: escapeHashVarToVar(escapeVarToHashVar(t))
        })))) {
            this._editor.run();

            if (this._hashChangeTimeout) {
                clearTimeout(this._hashChangeTimeout);
            }
            this._hashChangeTimeout = setTimeout(() => {
                window.location.hash = this._vars.map(t => escapeVarName(t.name) + '=' + escapeVarToHashVar(t)).join(',');
            }, 1500);
        }
    }

    fillPathCopyField(i, vs, name, t) {
        vs.innerHTML = `<div class="link" data-toggle="tooltip" title="Copy path to clipboard" data-original-title="Copy path to clipboard">${iconClipboard()}</div>`;
        const link = vs.childNodes[0];
        $(link).tooltip();
        $(link).click(async () => {
            const path = `const ${name} = ${"`"}${i.value.replace(/\n/gmi, '').replace(/[CML]/g, '\n\$&')}${"`"}; // type=path${t.bbox ? `, bbox=${t.bbox.join(',')}` : ''}${t.comment ? `, ${t.comment}` : ''}`;
            const shortPath = path.replace(/\n/gm, '');
            console.log(shortPath);
            navigator.clipboard.writeText(shortPath).then(() => {
                showAlert('Path copied to clipboard', `<pre class="p-3">${path}</pre>`);
            });
        });
        this._tooltips.push(link);
    }

    createField(i, vs, title, t) {
        const d = document.createElement('div');
        $(d).addClass('input-group mb-2');
        const p = document.createElement('div');
        $(p).addClass('input-group-prepend');
        const s = document.createElement('span');
        $(s).addClass('input-group-text');
        $(s).addClass('input-vars');
        $(s).addClass('btn-default-width');
        const p2 = document.createElement('div');
        $(p2).addClass('input-group-prepend');
        $(p2).addClass('d-none');
        $(p2).addClass('d-sm-block');
        $(p2).addClass('ml-3');
        $(vs).addClass('text-right');
        $(vs).addClass('input-group-text');
        $(vs).addClass('input-vars');
        $(vs).css('width', '60px');

        s.innerText = title;
        p.appendChild(s);
        d.appendChild(p);
        d.appendChild(i);
        p2.appendChild(vs);
        d.appendChild(p2);

        return d;
    }
}

"use strict";

class TurtleEditor extends EventDispatcher {
    constructor(turtletoy) {
        super();
        this.turtletoy = turtletoy;

        this.editor = this.ace_init();
        this.ui_init();

        this.turtletoy.addListener('resize', () => {
            this.editor.resize();
        });
        this.turtletoy.addListener('run', () => this.editor.getSession().setAnnotations([]));
        this.turtletoy.addListener('compileError', (data) => {
            flashBorder('#editorContainer', COLOR_RED);
            const e = data.error;
            const mparse = e.e.message.split('#');
            const m = mparse[0];
            const line = (mparse[1] ? mparse[1] : e.e.lineno) - 17 - (_turtlevmapi).split(/\r\n|\r|\n/).length;
            this.editor.getSession().setAnnotations([{
                row: line >= 1 ? line : 1,
                column: 0,
                text: m,
                type: "error" // also warning and information
            }]);
        });
    }

    getCode() {
        return this.editor.getValue();
    }

    getTitle() {
        return this.titleField?.value.trim();
    }

    getDescription() {
        return this.descriptionField?.value.trim();
    }

    getStatus() {
        return this.objectStatus?.value.trim();
    }

    ui_init() {
        this.titleField = document.getElementById('objectTitle');
        this.descriptionField = document.getElementById('objectDescription');
        this.objectStatus = document.getElementById('objectStatus');

        $('#objectSaveButton').click(() => {
            this.save();
        });
        $('#objectForkButton').click(() => {
            this.fork();
        });
        $('#objectCompileButton').click(() => {
            this.turtletoy.run();
        });

        $('#objectDeleteButton').click(() => {
            showConfirm('Delete turtle', 'Are you sure you want to delete this turtle?<br /><br /><em>Deletion is permanent and irreversible.</em>', () => {
                $('#objectDeleteButton').prop('disabled', true);
                $.ajax({
                    type: "POST",
                    url: "./turtle/delete/" + this.turtleId,
                    processData: false,
                    contentType: false,
                }).done(() => {
                    window.onbeforeunload = undefined;
                    window.location.replace("./user/profile/");
                });
            });
        });

        window.onbeforeunload = undefined;
        this.savedCode = this.editor.getValue();
    }

    ace_init() {
        const editor = ace.edit("editor");
        editor.setTheme("ace/theme/twilight");
        editor.session.setMode("ace/mode/javascript");
        editor.setOption('fixedWidthGutter', true);
        editor.setOption("showPrintMargin", false);
        editor.setOption('fontSize', '0.8rem');
        editor.setOption('fontFamily', 'Roboto Mono, monospace');
        editor.session.setOption("useWorker", false);

        editor.commands.addCommand({
            name: 'saveCommand',
            bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
            exec: () => {
                this.save();
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });
        editor.commands.addCommand({
            name: 'runCommand',
            bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
            exec: () => {
                this.turtletoy.run();
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });
        editor.session.on('change', () => {
            this.editor.getSession().clearAnnotations();
            this.dispatch('change', {});
        });
        return editor;
    }

    get turtleId() {
        return this.turtletoy.turtleId;
    }

    set turtleId(id) {
        this.turtletoy.turtleId = id;
    }

    saveSucces() {
        window.onbeforeunload = undefined;
        this.savedCode = this.editor.getValue();
        flashBorder('#editorContainer', COLOR_GREEN);
    }

    saveFailed() {
        // error handling
        flashBorder('#editorContainer', COLOR_RED);
        showAlert('Save turtle', 'An error occured while saving this turtle.<br />Make sure that you are online and logged in.<br /><br />Please try again.');
    }

    async fork() {
        this.userLoggedIn = await userLoggedInCheck();

        if (!this.userLoggedIn) {
            showAlert('Fork turtle', 'You have to log in to fork a turtle.');
        } else if (this.turtletoy.compiledCode !== this.turtletoy.getCode()) {
            showAlert('Fork turtle', 'You have to compile and run your turtle before you can fork a turtle.');
        } else if (this.runTimeOut !== undefined && !this.compileError) {
            showAlert('Fork turtle', 'The turtle is still running. Please wait until the turtle is fully executed before you fork the turtle.');
        } else {
            $.ajax({
                type: 'GET',
                url: './api/v1/turtle/' + this.turtleId + '/license',
            }).done((data) => {
                showConfirm('Fork turtle', licenseText(data.fullName, data.url) +
                    '<p>Note: if you want to make a variation of your own turtle by changing some variables you can also use <a href="javascript:showAdjustableVariablesAlert();">adjustable variables</a>.</p>', () => {
                    const formData = new FormData();
                    formData.append('code', this.turtletoy.getCode());

                    formData.append('image', this.imageRepresentation);
                    $.ajax({
                        type: "POST",
                        url: "./turtle/fork/" + this.turtleId,
                        data: formData,
                        processData: false,
                        contentType: false,
                    }).done((data) => {
                        if (data.success) {
                            this.saveSucces();
                            window.location.replace("./turtle/" + data.id);
                        } else {
                            this.saveFailed();
                        }
                    }).fail(() => {
                        this.saveFailed();
                    });
                });
            });
        }
    }

    async save() {
        this.userLoggedIn = await userLoggedInCheck();

        if (!this.userLoggedIn) {
            showAlert('Save turtle', 'You have to log in to save your turtle.');
        } else if (this.turtletoy.compiledCode !== this.getCode()) {
            showAlert('Save turtle', 'You have to compile and run your turtle before you can save your turtle.');
        } else {
            const formData = new FormData();
            formData.append('title', this.turtletoy.getTitle());
            formData.append('description', this.getDescription());
            formData.append('code', this.turtletoy.getCode());
            formData.append('status', this.turtletoy.getStatus());

            if (this.turtletoy.getTitle() === "" || this.getDescription() === "") {
                showAlert('Save turtle', 'Title and description can not be empty.');
            } else if (this.turtleId) { // update of existing object
                $.ajax({
                    type: "POST",
                    url: "./turtle/" + this.turtleId,
                    data: formData,
                    processData: false,
                    contentType: false,
                }).done((data) => {
                    if (data.success) {
                        this.saveSucces();
                        // try to save image
                        this.savePreviewImage();
                    } else {
                        this.saveFailed();
                    }
                }).fail(() => {
                    this.saveFailed();
                });
            } else if (!this.turtletoy.succesfullyCompiled) {
                showAlert('Save turtle', 'Your turtle is still running. Please wait until your turtle is fully executed before you save your turtle.');
            } else {
                this.turtletoy.canvas?.grabImageFromCanvas().then((blob) => {
                    formData.append('image', blob);
                    $.ajax({
                        type: "POST",
                        url: "./turtle/new",
                        data: formData,
                        processData: false,
                        contentType: false,
                    }).done((data) => {
                        if (data.success) {
                            this.turtleId = data.id;
                            this.saveSucces();
                            window.location.replace("./turtle/" + data.id);
                        } else {
                            this.saveFailed();
                        }
                    }).fail(() => {
                        this.saveFailed();
                    });
                });
            }
        }
    }

    savePreviewImage() {
        this.turtletoy.canvas?.grabImageFromCanvas().then((blob) => {
            if (!this.turtletoy.succesfullyCompiled || this.imageSaveHandle !== undefined) {
                return; // don't save a preview image on compile error
            }

            const imageData = new FormData();
            imageData.set('image', blob);
            this.imageSaveHandle = $.ajax({
                type: "POST",
                url: "./turtle/png/" + this.turtleId,
                data: imageData,
                processData: false,
                contentType: false,
            }).done(() => {
                this.imageSaveHandle = undefined;
            }).fail(() => {
                // error handling
                this.imageSaveHandle = undefined;
            });
        });
    }

}


class TurtleCanvas {
    constructor(turtletoy) {
        this.turtletoy = turtletoy;

        this.CANVAS_SIZE = 2048;
        this.CANVAS_OUTPUT_SIZE = window.devicePixelRatio > 1 ? 1024 : 512;
        this.CANVAS_ZOOM_SIZE = window.devicePixelRatio > 1 ? 2048 : 1024;
        this.CANVAS_GRAB_SIZE = 512;

        this.outputCanvas = document.getElementById('canvas_turtle');
        this.outputCanvas.width = this.CANVAS_OUTPUT_SIZE;
        this.outputCanvas.height = this.CANVAS_OUTPUT_SIZE;

        this.canvas = createCanvas(this.CANVAS_SIZE);
        this.context = this.canvas.getContext('2d');
        this.context.lineWidth = 2;

        this.grabCanvas = createCanvas(512);

        this.outputResizer = new canvas_resizer(this.canvas, this.CANVAS_OUTPUT_SIZE, this.outputCanvas);
        this.grabResizer = new canvas_resizer(this.canvas, this.CANVAS_GRAB_SIZE, this.grabCanvas);

        const zoomCanvas = document.getElementById('object_canvas_modal');
        if (zoomCanvas) {
            this.zoomResizer = new canvas_resizer(this.canvas, this.CANVAS_ZOOM_SIZE, zoomCanvas);
            $('#canvasZoom').on('show.bs.modal', () => {
                this.zoomResizer.draw();
                if (document.body.offsetWidth < 800) {
                    return false;
                }
            });
        }
    }

    async grabImageFromCanvas(cb) {
        this.grabResizer.draw();
        return new Promise((resolve) => this.grabCanvas.toBlob((blob) => resolve(blob)));
    }

    showCanvas() {
        this.outputResizer.draw();
    }

    reset(opacity) {
        this.opacity = opacity;
        initAndClearCanvas(this.canvas, this.context, opacity);
        this.showCanvas();
    }

    drawPaths(paths) {
        const scale = this.turtletoy.getCanvasSize();

        Object.values(paths).forEach(path => {
            if (path.length > 1) {
                this.context.beginPath();
                this.context.moveTo((path[0][0] * .5 / scale + .5) * this.CANVAS_SIZE, (path[0][1] * .5 / scale + .5) * this.CANVAS_SIZE);
                for (let i = 1; i < path.length; i++) {
                    this.context.lineTo((path[i][0] * .5 / scale + .5) * this.CANVAS_SIZE, (path[i][1] * .5 / scale + .5) * this.CANVAS_SIZE);
                }
                this.context.stroke();
            }
        });
        this.showCanvas();
    }

    exportPNG(fileName) {
        this.canvas.toBlob((blob) => {
            downloadFile(blob, fileName, 'image/png');
        });
    }
}


"use strict";

const turtle_text_data = [
    [-8, 8, [[]]],
    [-5, 5, [[[0, -12], [0, 2]], [[0, 7], [-1, 8], [0, 9], [1, 8], [0, 7]]]],
    [-8, 8, [[[-4, -12], [-4, -5]], [[4, -12], [4, -5]]]],
    [-10, 11, [[[1, -16], [-6, 16]], [[7, -16], [0, 16]], [[-6, -3], [8, -3]], [[-7, 3], [7, 3]]]],
    [-10, 10, [[[-2, -16], [-2, 13]], [[2, -16], [2, 13]], [[7, -9], [5, -11], [2, -12], [-2, -12], [-5, -11], [-7, -9], [-7, -7], [-6, -5], [-5, -4], [-3, -3], [3, -1], [5, 0], [6, 1], [7, 3], [7, 6], [5, 8], [2, 9], [-2, 9], [-5, 8], [-7, 6]]]],
    [-12, 12, [[[9, -12], [-9, 9]], [[-4, -12], [-2, -10], [-2, -8], [-3, -6], [-5, -5], [-7, -5], [-9, -7], [-9, -9], [-8, -11], [-6, -12], [-4, -12], [-2, -11], [1, -10], [4, -10], [7, -11], [9, -12]], [[5, 2], [3, 3], [2, 5], [2, 7], [4, 9], [6, 9], [8, 8], [9, 6], [9, 4], [7, 2], [5, 2]]]],
    [-13, 13, [[[10, -3], [10, -4], [9, -5], [8, -5], [7, -4], [6, -2], [4, 3], [2, 6], [0, 8], [-2, 9], [-6, 9], [-8, 8], [-9, 7], [-10, 5], [-10, 3], [-9, 1], [-8, 0], [-1, -4], [0, -5], [1, -7], [1, -9], [0, -11], [-2, -12], [-4, -11], [-5, -9], [-5, -7], [-4, -4], [-2, -1], [3, 6], [5, 8], [7, 9], [9, 9], [10, 8], [10, 7]]]],
    [-5, 5, [[[0, -10], [-1, -11], [0, -12], [1, -11], [1, -9], [0, -7], [-1, -6]]]],
    [-7, 7, [[[4, -16], [2, -14], [0, -11], [-2, -7], [-3, -2], [-3, 2], [-2, 7], [0, 11], [2, 14], [4, 16]]]],
    [-7, 7, [[[-4, -16], [-2, -14], [0, -11], [2, -7], [3, -2], [3, 2], [2, 7], [0, 11], [-2, 14], [-4, 16]]]],
    [-8, 8, [[[0, -6], [0, 6]], [[-5, -3], [5, 3]], [[5, -3], [-5, 3]]]],
    [-13, 13, [[[0, -9], [0, 9]], [[-9, 0], [9, 0]]]],
    [-4, 4, [[[1, 5], [0, 6], [-1, 5], [0, 4], [1, 5], [1, 7], [-1, 9]]]],
    [-13, 13, [[[-9, 0], [9, 0]]]],
    [-4, 4, [[[0, 4], [-1, 5], [0, 6], [1, 5], [0, 4]]]],
    [-11, 11, [[[9, -16], [-9, 16]]]],
    [-10, 10, [[[-1, -12], [-4, -11], [-6, -8], [-7, -3], [-7, 0], [-6, 5], [-4, 8], [-1, 9], [1, 9], [4, 8], [6, 5], [7, 0], [7, -3], [6, -8], [4, -11], [1, -12], [-1, -12]]]],
    [-10, 10, [[[-4, -8], [-2, -9], [1, -12], [1, 9]]]],
    [-10, 10, [[[-6, -7], [-6, -8], [-5, -10], [-4, -11], [-2, -12], [2, -12], [4, -11], [5, -10], [6, -8], [6, -6], [5, -4], [3, -1], [-7, 9], [7, 9]]]],
    [-10, 10, [[[-5, -12], [6, -12], [0, -4], [3, -4], [5, -3], [6, -2], [7, 1], [7, 3], [6, 6], [4, 8], [1, 9], [-2, 9], [-5, 8], [-6, 7], [-7, 5]]]],
    [-10, 10, [[[3, -12], [-7, 2], [8, 2]], [[3, -12], [3, 9]]]],
    [-10, 10, [[[5, -12], [-5, -12], [-6, -3], [-5, -4], [-2, -5], [1, -5], [4, -4], [6, -2], [7, 1], [7, 3], [6, 6], [4, 8], [1, 9], [-2, 9], [-5, 8], [-6, 7], [-7, 5]]]],
    [-10, 10, [[[6, -9], [5, -11], [2, -12], [0, -12], [-3, -11], [-5, -8], [-6, -3], [-6, 2], [-5, 6], [-3, 8], [0, 9], [1, 9], [4, 8], [6, 6], [7, 3], [7, 2], [6, -1], [4, -3], [1, -4], [0, -4], [-3, -3], [-5, -1], [-6, 2]]]],
    [-10, 10, [[[7, -12], [-3, 9]], [[-7, -12], [7, -12]]]],
    [-10, 10, [[[-2, -12], [-5, -11], [-6, -9], [-6, -7], [-5, -5], [-3, -4], [1, -3], [4, -2], [6, 0], [7, 2], [7, 5], [6, 7], [5, 8], [2, 9], [-2, 9], [-5, 8], [-6, 7], [-7, 5], [-7, 2], [-6, 0], [-4, -2], [-1, -3], [3, -4], [5, -5], [6, -7], [6, -9], [5, -11], [2, -12], [-2, -12]]]],
    [-10, 10, [[[6, -5], [5, -2], [3, 0], [0, 1], [-1, 1], [-4, 0], [-6, -2], [-7, -5], [-7, -6], [-6, -9], [-4, -11], [-1, -12], [0, -12], [3, -11], [5, -9], [6, -5], [6, 0], [5, 5], [3, 8], [0, 9], [-2, 9], [-5, 8], [-6, 6]]]],
    [-4, 4, [[[0, -3], [-1, -2], [0, -1], [1, -2], [0, -3]], [[0, 4], [-1, 5], [0, 6], [1, 5], [0, 4]]]],
    [-4, 4, [[[0, -3], [-1, -2], [0, -1], [1, -2], [0, -3]], [[1, 5], [0, 6], [-1, 5], [0, 4], [1, 5], [1, 7], [-1, 9]]]],
    [-12, 12, [[[8, -9], [-8, 0], [8, 9]]]],
    [-13, 13, [[[-9, -3], [9, -3]], [[-9, 3], [9, 3]]]],
    [-12, 12, [[[-8, -9], [8, 0], [-8, 9]]]],
    [-9, 9, [[[-6, -7], [-6, -8], [-5, -10], [-4, -11], [-2, -12], [2, -12], [4, -11], [5, -10], [6, -8], [6, -6], [5, -4], [4, -3], [0, -1], [0, 2]], [[0, 7], [-1, 8], [0, 9], [1, 8], [0, 7]]]],
    [-13, 14, [[[5, -4], [4, -6], [2, -7], [-1, -7], [-3, -6], [-4, -5], [-5, -2], [-5, 1], [-4, 3], [-2, 4], [1, 4], [3, 3], [4, 1]], [[-1, -7], [-3, -5], [-4, -2], [-4, 1], [-3, 3], [-2, 4]], [[5, -7], [4, 1], [4, 3], [6, 4], [8, 4], [10, 2], [11, -1], [11, -3], [10, -6], [9, -8], [7, -10], [5, -11], [2, -12], [-1, -12], [-4, -11], [-6, -10], [-8, -8], [-9, -6], [-10, -3], [-10, 0], [-9, 3], [-8, 5], [-6, 7], [-4, 8], [-1, 9], [2, 9], [5, 8], [7, 7], [8, 6]], [[6, -7], [5, 1], [5, 3], [6, 4]]]],
    [-9, 9, [[[0, -12], [-8, 9]], [[0, -12], [8, 9]], [[-5, 2], [5, 2]]]],
    [-11, 10, [[[-7, -12], [-7, 9]], [[-7, -12], [2, -12], [5, -11], [6, -10], [7, -8], [7, -6], [6, -4], [5, -3], [2, -2]], [[-7, -2], [2, -2], [5, -1], [6, 0], [7, 2], [7, 5], [6, 7], [5, 8], [2, 9], [-7, 9]]]],
    [-10, 11, [[[8, -7], [7, -9], [5, -11], [3, -12], [-1, -12], [-3, -11], [-5, -9], [-6, -7], [-7, -4], [-7, 1], [-6, 4], [-5, 6], [-3, 8], [-1, 9], [3, 9], [5, 8], [7, 6], [8, 4]]]],
    [-11, 10, [[[-7, -12], [-7, 9]], [[-7, -12], [0, -12], [3, -11], [5, -9], [6, -7], [7, -4], [7, 1], [6, 4], [5, 6], [3, 8], [0, 9], [-7, 9]]]],
    [-10, 9, [[[-6, -12], [-6, 9]], [[-6, -12], [7, -12]], [[-6, -2], [2, -2]], [[-6, 9], [7, 9]]]],
    [-10, 8, [[[-6, -12], [-6, 9]], [[-6, -12], [7, -12]], [[-6, -2], [2, -2]]]],
    [-10, 11, [[[8, -7], [7, -9], [5, -11], [3, -12], [-1, -12], [-3, -11], [-5, -9], [-6, -7], [-7, -4], [-7, 1], [-6, 4], [-5, 6], [-3, 8], [-1, 9], [3, 9], [5, 8], [7, 6], [8, 4], [8, 1]], [[3, 1], [8, 1]]]],
    [-11, 11, [[[-7, -12], [-7, 9]], [[7, -12], [7, 9]], [[-7, -2], [7, -2]]]],
    [-4, 4, [[[0, -12], [0, 9]]]],
    [-8, 8, [[[4, -12], [4, 4], [3, 7], [2, 8], [0, 9], [-2, 9], [-4, 8], [-5, 7], [-6, 4], [-6, 2]]]],
    [-11, 10, [[[-7, -12], [-7, 9]], [[7, -12], [-7, 2]], [[-2, -3], [7, 9]]]],
    [-10, 7, [[[-6, -12], [-6, 9]], [[-6, 9], [6, 9]]]],
    [-12, 12, [[[-8, -12], [-8, 9]], [[-8, -12], [0, 9]], [[8, -12], [0, 9]], [[8, -12], [8, 9]]]],
    [-11, 11, [[[-7, -12], [-7, 9]], [[-7, -12], [7, 9]], [[7, -12], [7, 9]]]],
    [-11, 11, [[[-2, -12], [-4, -11], [-6, -9], [-7, -7], [-8, -4], [-8, 1], [-7, 4], [-6, 6], [-4, 8], [-2, 9], [2, 9], [4, 8], [6, 6], [7, 4], [8, 1], [8, -4], [7, -7], [6, -9], [4, -11], [2, -12], [-2, -12]]]],
    [-11, 10, [[[-7, -12], [-7, 9]], [[-7, -12], [2, -12], [5, -11], [6, -10], [7, -8], [7, -5], [6, -3], [5, -2], [2, -1], [-7, -1]]]],
    [-11, 11, [[[-2, -12], [-4, -11], [-6, -9], [-7, -7], [-8, -4], [-8, 1], [-7, 4], [-6, 6], [-4, 8], [-2, 9], [2, 9], [4, 8], [6, 6], [7, 4], [8, 1], [8, -4], [7, -7], [6, -9], [4, -11], [2, -12], [-2, -12]], [[1, 5], [7, 11]]]],
    [-11, 10, [[[-7, -12], [-7, 9]], [[-7, -12], [2, -12], [5, -11], [6, -10], [7, -8], [7, -6], [6, -4], [5, -3], [2, -2], [-7, -2]], [[0, -2], [7, 9]]]],
    [-10, 10, [[[7, -9], [5, -11], [2, -12], [-2, -12], [-5, -11], [-7, -9], [-7, -7], [-6, -5], [-5, -4], [-3, -3], [3, -1], [5, 0], [6, 1], [7, 3], [7, 6], [5, 8], [2, 9], [-2, 9], [-5, 8], [-7, 6]]]],
    [-8, 8, [[[0, -12], [0, 9]], [[-7, -12], [7, -12]]]],
    [-11, 11, [[[-7, -12], [-7, 3], [-6, 6], [-4, 8], [-1, 9], [1, 9], [4, 8], [6, 6], [7, 3], [7, -12]]]],
    [-9, 9, [[[-8, -12], [0, 9]], [[8, -12], [0, 9]]]],
    [-12, 12, [[[-10, -12], [-5, 9]], [[0, -12], [-5, 9]], [[0, -12], [5, 9]], [[10, -12], [5, 9]]]],
    [-10, 10, [[[-7, -12], [7, 9]], [[7, -12], [-7, 9]]]],
    [-9, 9, [[[-8, -12], [0, -2], [0, 9]], [[8, -12], [0, -2]]]],
    [-10, 10, [[[7, -12], [-7, 9]], [[-7, -12], [7, -12]], [[-7, 9], [7, 9]]]],
    [-7, 7, [[[-3, -16], [-3, 16]], [[-2, -16], [-2, 16]], [[-3, -16], [4, -16]], [[-3, 16], [4, 16]]]],
    [-7, 7, [[[-7, -12], [7, 12]]]],
    [-7, 7, [[[2, -16], [2, 16]], [[3, -16], [3, 16]], [[-4, -16], [3, -16]], [[-4, 16], [3, 16]]]],
    [-8, 8, [[[0, -14], [-8, 0]], [[0, -14], [8, 0]]]],
    [-9, 9, [[[-9, 16], [9, 16]]]],
    [-4, 4, [[[1, -7], [-1, -5], [-1, -3], [0, -2], [1, -3], [0, -4], [-1, -3]]]],
    [-9, 10, [[[6, -5], [6, 9]], [[6, -2], [4, -4], [2, -5], [-1, -5], [-3, -4], [-5, -2], [-6, 1], [-6, 3], [-5, 6], [-3, 8], [-1, 9], [2, 9], [4, 8], [6, 6]]]],
    [-10, 9, [[[-6, -12], [-6, 9]], [[-6, -2], [-4, -4], [-2, -5], [1, -5], [3, -4], [5, -2], [6, 1], [6, 3], [5, 6], [3, 8], [1, 9], [-2, 9], [-4, 8], [-6, 6]]]],
    [-9, 9, [[[6, -2], [4, -4], [2, -5], [-1, -5], [-3, -4], [-5, -2], [-6, 1], [-6, 3], [-5, 6], [-3, 8], [-1, 9], [2, 9], [4, 8], [6, 6]]]],
    [-9, 10, [[[6, -12], [6, 9]], [[6, -2], [4, -4], [2, -5], [-1, -5], [-3, -4], [-5, -2], [-6, 1], [-6, 3], [-5, 6], [-3, 8], [-1, 9], [2, 9], [4, 8], [6, 6]]]],
    [-9, 9, [[[-6, 1], [6, 1], [6, -1], [5, -3], [4, -4], [2, -5], [-1, -5], [-3, -4], [-5, -2], [-6, 1], [-6, 3], [-5, 6], [-3, 8], [-1, 9], [2, 9], [4, 8], [6, 6]]]],
    [-5, 7, [[[5, -12], [3, -12], [1, -11], [0, -8], [0, 9]], [[-3, -5], [4, -5]]]],
    [-9, 10, [[[6, -5], [6, 11], [5, 14], [4, 15], [2, 16], [-1, 16], [-3, 15]], [[6, -2], [4, -4], [2, -5], [-1, -5], [-3, -4], [-5, -2], [-6, 1], [-6, 3], [-5, 6], [-3, 8], [-1, 9], [2, 9], [4, 8], [6, 6]]]],
    [-9, 10, [[[-5, -12], [-5, 9]], [[-5, -1], [-2, -4], [0, -5], [3, -5], [5, -4], [6, -1], [6, 9]]]],
    [-4, 4, [[[-1, -12], [0, -11], [1, -12], [0, -13], [-1, -12]], [[0, -5], [0, 9]]]],
    [-5, 5, [[[0, -12], [1, -11], [2, -12], [1, -13], [0, -12]], [[1, -5], [1, 12], [0, 15], [-2, 16], [-4, 16]]]],
    [-9, 8, [[[-5, -12], [-5, 9]], [[5, -5], [-5, 5]], [[-1, 1], [6, 9]]]],
    [-4, 4, [[[0, -12], [0, 9]]]],
    [-15, 15, [[[-11, -5], [-11, 9]], [[-11, -1], [-8, -4], [-6, -5], [-3, -5], [-1, -4], [0, -1], [0, 9]], [[0, -1], [3, -4], [5, -5], [8, -5], [10, -4], [11, -1], [11, 9]]]],
    [-9, 10, [[[-5, -5], [-5, 9]], [[-5, -1], [-2, -4], [0, -5], [3, -5], [5, -4], [6, -1], [6, 9]]]],
    [-9, 10, [[[-1, -5], [-3, -4], [-5, -2], [-6, 1], [-6, 3], [-5, 6], [-3, 8], [-1, 9], [2, 9], [4, 8], [6, 6], [7, 3], [7, 1], [6, -2], [4, -4], [2, -5], [-1, -5]]]],
    [-10, 9, [[[-6, -5], [-6, 16]], [[-6, -2], [-4, -4], [-2, -5], [1, -5], [3, -4], [5, -2], [6, 1], [6, 3], [5, 6], [3, 8], [1, 9], [-2, 9], [-4, 8], [-6, 6]]]],
    [-9, 10, [[[6, -5], [6, 16]], [[6, -2], [4, -4], [2, -5], [-1, -5], [-3, -4], [-5, -2], [-6, 1], [-6, 3], [-5, 6], [-3, 8], [-1, 9], [2, 9], [4, 8], [6, 6]]]],
    [-7, 6, [[[-3, -5], [-3, 9]], [[-3, 1], [-2, -2], [0, -4], [2, -5], [5, -5]]]],
    [-8, 9, [[[6, -2], [5, -4], [2, -5], [-1, -5], [-4, -4], [-5, -2], [-4, 0], [-2, 1], [3, 2], [5, 3], [6, 5], [6, 6], [5, 8], [2, 9], [-1, 9], [-4, 8], [-5, 6]]]],
    [-5, 7, [[[0, -12], [0, 5], [1, 8], [3, 9], [5, 9]], [[-3, -5], [4, -5]]]],
    [-9, 10, [[[-5, -5], [-5, 5], [-4, 8], [-2, 9], [1, 9], [3, 8], [6, 5]], [[6, -5], [6, 9]]]],
    [-8, 8, [[[-6, -5], [0, 9]], [[6, -5], [0, 9]]]],
    [-11, 11, [[[-8, -5], [-4, 9]], [[0, -5], [-4, 9]], [[0, -5], [4, 9]], [[8, -5], [4, 9]]]],
    [-8, 9, [[[-5, -5], [6, 9]], [[6, -5], [-5, 9]]]],
    [-8, 8, [[[-6, -5], [0, 9]], [[6, -5], [0, 9], [-2, 13], [-4, 15], [-6, 16], [-7, 16]]]],
    [-8, 9, [[[6, -5], [-5, 9]], [[-5, -5], [6, -5]], [[-5, 9], [6, 9]]]],
    [-7, 7, [[[2, -16], [0, -15], [-1, -14], [-2, -12], [-2, -10], [-1, -8], [0, -7], [1, -5], [1, -3], [-1, -1]], [[0, -15], [-1, -13], [-1, -11], [0, -9], [1, -8], [2, -6], [2, -4], [1, -2], [-3, 0], [1, 2], [2, 4], [2, 6], [1, 8], [0, 9], [-1, 11], [-1, 13], [0, 15]], [[-1, 1], [1, 3], [1, 5], [0, 7], [-1, 8], [-2, 10], [-2, 12], [-1, 14], [0, 15], [2, 16]]]],
    [-4, 4, [[[0, -16], [0, 16]]]],
    [-7, 7, [[[-2, -16], [0, -15], [1, -14], [2, -12], [2, -10], [1, -8], [0, -7], [-1, -5], [-1, -3], [1, -1]], [[0, -15], [1, -13], [1, -11], [0, -9], [-1, -8], [-2, -6], [-2, -4], [-1, -2], [3, 0], [-1, 2], [-2, 4], [-2, 6], [-1, 8], [0, 9], [1, 11], [1, 13], [0, 15]], [[1, 1], [-1, 3], [-1, 5], [0, 7], [1, 8], [2, 10], [2, 12], [1, 14], [0, 15], [-2, 16]]]],
    [-12, 12, [[[-9, 3], [-9, 1], [-8, -2], [-6, -3], [-4, -3], [-2, -2], [2, 1], [4, 2], [6, 2], [8, 1], [9, -1]], [[-9, 1], [-8, -1], [-6, -2], [-4, -2], [-2, -1], [2, 2], [4, 3], [6, 3], [8, 2], [9, -1], [9, -3]]]],
    [-8, 8, [[[-8, -12], [-8, 9], [-7, 9], [-7, -12], [-6, -12], [-6, 9], [-5, 9], [-5, -12], [-4, -12], [-4, 9], [-3, 9], [-3, -12], [-2, -12], [-2, 9], [-1, 9], [-1, -12], [0, -12], [0, 9], [1, 9], [1, -12], [2, -12], [2, 9], [3, 9], [3, -12], [4, -12], [4, 9], [5, 9], [5, -12], [6, -12], [6, 9], [7, 9], [7, -12], [8, -12], [8, 9]]]],
];

function turtle_text(s, spacing = 0, extra = 0) {
    const result = [];
    let x = 0;
    for (let ch = 0; ch < s.length; ch++) {
        const index = s.charCodeAt(ch) - 32;
        if (index < 0 || index >= 96) {
            x += spacing;
        } else {
            const d = turtle_text_data[index];
            const lt = d[0];
            const rt = d[1];
            const paths = d[2];
            for (let i = 0; i < paths.length; i++) {
                const path = [];
                for (let j = 0; j < paths[i].length; j++) {
                    path.push([x + paths[i][j][0] - lt, paths[i][j][1]]);
                }
                result.push(path);
            }
            x += rt - lt + spacing;
            if (index === 0) {
                x += extra;
            }
        }
    }
    return {x: x, paths: result};
}

"use strict";

class Turtletoy extends EventDispatcher {
    constructor(id, userLoggedIn, author, date, title, code = '') {
        super();

        this.turtleId = id;
        this.userLoggedIn = userLoggedIn;
        this.author = author;
        this.date = date;
        this.title = title;
        this.opacity = 1;
        this.savedCode = code;

        if (typeof TurtleCanvas !== "undefined") this.canvas = new TurtleCanvas(this);
        if (typeof TurtleEditor !== "undefined") this.editor = new TurtleEditor(this);
        this.editor?.addListener('change', e => {
            if (this.savedCode === this.getCode()) {
                window.onbeforeunload = undefined;
            } else {
                window.onbeforeunload = () => {
                    return false;
                };
            }
        });

        this.addListener('run', () => {
            this.clearPathData();
        });
        this.addListener('newPathData', e => {
            this.addPathData(e.paths);
        });

        this.runTimeOut = undefined;
        this.compileError = false;
        this.vmVariables = [];

        this.updateVmVariablesFromHash();
        $(window).bind('hashchange', () => {
            if (this.updateVmVariablesFromHash()) {
                this.dispatch('hashchange', {});
                this.run();
            }
        });
    }

    resize() {
        this.dispatch('resize', {});
    }

    updateVmVariablesFromHash() {
        const vmVariables = [];
        const hash = window.location.hash.replace('#', '');
        hash.split(',').forEach(a => {
            const v = a.split('=');
            if (v.length === 2) {
                vmVariables.push({key: escapeVarName(v[0]), value: `${escapeHashVarToVar(v[1])}`});
            }
        });
        return this.setVmVariables(vmVariables);
    }

    setVmVariables(vm) {
        this.dispatch('vmVariablesChanged', {});
        if (JSON.stringify(vm) !== JSON.stringify(this.vmVariables)) {
            this.vmVariables = [...vm];
            return true;
        } else {
            return false;
        }
    }

    getVmVariables() {
        return this.vmVariables;
    }

    replaceVmVars(code) {
        this.vmVariables.forEach(t => {
            const reg = new RegExp('^\\s*(let|const)\\s*' + t.key + '\\s*=\\s*[-\\d\\.]+[;\\s]*\\/\\/\\s*min\\s*=\\s*[-\\d\\.]+[,\\s]+max\\s*=\\s*[-\\d\\.]+[,\\s]+step\\s*=\\s*[-\\d\\.]+[,\\t ]*(\\((.*)\\))?([^\\n]*)?', 'gmi');
            code = code.replace(reg, (match, offset, string) => {
                const lines = match.split(/\r\n|\r|\n/).length;
                return 'let ' + t.key + '=' + t.value + ';' + new Array(lines).join('\n');
            });

            const regPath = new RegExp('^\\s*(let|const)\\s*' + t.key + '\\s*=[\\s\'"`]*([\\.\\+\\-0-9CML,\\s]+)[\\s\'"`]*[;\\s]*\\/\\/\\s*type\\s*=\\s*path[^\n]?([^\\n]*)?', 'gmi');
            code = code.replace(regPath, (match, offset, string) => {
                const lines = match.split(/\r\n|\r|\n/).length;
                return 'let ' + t.key + '=`' + t.value.replace(/\r|\n/g, ' ') + '`;' + new Array(lines).join('\n');
            });

            const regString = new RegExp('^\\s*(let|const)\\s*' + t.key + '\\s*=\\s*([\'"`])(.*?)\\2.*?;?.*?\\/\\/\\s*type\\s*=\\s*string(?:,\\s*)?(.*)?', 'gmi');
            code = code.replace(regString, (match, offset, string) => {
                const lines = match.split(/\r\n|\r|\n/).length;
                return 'let ' + t.key + `="${t.value.replace(/"/g, '\\"')}";` + new Array(lines).join('\n');
            });
        });

        return code;
    }

    getOpacity() {
        return this.opacity;
    }

    getStatus() {
        return this.editor?.getStatus() ?? 'draft';
    }

    getTitle() {
        return this.editor?.getTitle() ?? this.title;
    }

    getDate() {
        return this.date;
    }

    getAuthor() {
        return this.author;
    }

    getCanvasSize() {
        return 100;
    }

    reset() {
        this.clearPathData();
        this.canvas?.reset(this.opacity);
    }

    getCode() {
        if (this.editor !== undefined) {
            return this.editor.getCode();
        } else {
            return this.savedCode;
        }
    }

    get outputCanvas() {
        return this.canvas.outputCanvas;
    }

    get succesfullyCompiled() {
        return this.runTimeOut === undefined && !this.compileError;
    }

    clearRunTimeout() {
        if (this.runTimeOut !== undefined) {
            clearTimeout(this.runTimeOut);
            this.runTimeOut = undefined;
        }
        if ($('#compileSpinner')) {
            $('#compileSpinner').css('display', 'none');
        }
    }

    setRunTimeout() {
        this.clearRunTimeout();
        this.runTimeOut = setTimeout(() => {
            if (this.vm) {
                this.clearRunTimeout();
                this.vm.terminate();
                this.vm = null;
                this.dispatch('timeout', {});
                showAlert('Running turtle', 'Turtle script timed out.');
                console.log('Terminate script of turtle ' + this.turtleId);
            }
        }, 120000);

        if ($('#compileSpinner')) {
            $('#compileSpinner').css('display', 'inline-block');
        }
    }

    run() {
        this.clearRunTimeout();
        this.compileError = false;
        this.opacity = undefined;

        if (this.vm) {
            this.vm.terminate();
            this.vm = null;
        }

        this.compiledCode = this.getCode();
        this.dispatch('run', {code: this.compiledCode});

        const code = this.replaceVmVars(this.getCode());

        // eval code in worker thread, collect lines
        this.vm = turtlevm(code, (e) => {
            this.clearRunTimeout();
            this.dispatch('compileError', {error: e});
            this.vm.terminate();
            this.vm = null;
            this.compileError = true;
            this.compiledCode = '';
        });

        flashBorder('#editorContainer', COLOR_BLUE);

        this.vm.onmessage = (e) => {
            // directly ask worker for more
            if (e.data.active) {
                this.vm.postMessage({t: 1});
                this.frame = e.data.frame;
            }

            if (this.opacity === undefined) { // first message
                this.opacity = Math.max(-1, Math.min(1, parseFloat(e.data.opacity)));
                this.canvas?.reset(this.opacity);
            }

            // and draw new data
            const paths = e.data.paths;
            this.canvas?.drawPaths(paths);

            this.dispatch('newPathData', {paths: paths});

            if (!e.data.active) {
                this.clearRunTimeout();
                this.dispatch('finished');
            }
        };

        this.setRunTimeout();
    }

    drawAnimatedFrames(frames, callback) {
        let i = 0;
        this.vm.onmessage = (e) => {
            const paths = e.data.paths;
            this.canvas?.drawPaths(paths);
            if (e.data.active) {
                this.vm.postMessage({t: i / frames});
                this.frame = e.data.frame;
            } else {
                i++;
                callback(this.outputCanvas, i >= frames);
                if (i < frames) {
                    this.canvas?.reset(this.opacity);
                    this.vm.postMessage({t: i / frames});
                }
            }
        };

        this.canvas?.reset(this.opacity);
        this.vm.postMessage({t: i / frames});
    }

    addPathData(paths) {
        for (const k in paths) {
            const path = paths[k];
            if (path.length > 1) {
                this.addPathDataId(k, path);
            }
        }
    }

    addPathDataId(id, data) {
        if (!this._paths[id]) {
            this._paths[id] = data;
        } else {
            this._paths[id] = this._paths[id].concat(data.slice(1));
        }
    }

    clearPathData() {
        this._paths = [];
    }

    get paths() {
        return this._paths;
    }

    getFileName() {
        let str = '';
        if (this.author) {
            str += this.author + '-';
        }
        str += this.getTitle() ? this.getTitle() : 'new';
        if (this.turtleId) {
            str += '-' + this.turtleId;
        }
        str = str.trim().replace(/[ ]/gi, "-");
        str = str.replace(/[^a-z0-9\-]/gi, "");

        return str.toLowerCase();
    }
}

