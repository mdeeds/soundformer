/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 458:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Audio = void 0;
class Audio {
    constructor(context) {
        this.audioCtx = context;
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.type = 'square';
        this.gain = this.audioCtx.createGain();
        this.gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
        this.oscillator.connect(this.gain);
        this.oscillator.start();
        this.gain.connect(this.audioCtx.destination);
        this.setNote(60);
    }
    static make() {
        return __awaiter(this, void 0, void 0, function* () {
            const ctx = yield Audio.getAudioContext();
            return new Promise((resolve, reject) => {
                resolve(new Audio(ctx));
            });
        });
    }
    static getAudioContext() {
        return new Promise((resolve, reject) => {
            const context = new window.AudioContext();
            if (context.state === 'running') {
                resolve(context);
            }
            else {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield Audio.getAudioContext());
                }), 500);
            }
        });
    }
    setNote(note) {
        this.oscillator.frequency.setValueAtTime(440 * Math.pow(2, (note - 69) / 12), this.audioCtx.currentTime);
    }
    noteOn() {
        this.gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    }
    noteOff() {
        this.gain.gain.setValueAtTime(0.0, this.audioCtx.currentTime);
    }
}
exports.Audio = Audio;
//# sourceMappingURL=audio.js.map

/***/ }),

/***/ 138:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const audio_1 = __webpack_require__(458);
const render_1 = __webpack_require__(28);
const body = document.getElementsByTagName('body')[0];
function go() {
    return __awaiter(this, void 0, void 0, function* () {
        const keySet = new Set();
        const a = yield audio_1.Audio.make();
        const r = new render_1.Render(body, keySet, a);
        body.addEventListener('keydown', handleKey);
        body.addEventListener('keyup', handleKey);
        function handleKey(ev) {
            if (ev.type === 'keydown') {
                keySet.add(ev.key);
                switch (ev.key) {
                    case 'Shift':
                        r.noteOn();
                        a.noteOn();
                        break;
                }
            }
            else if (ev.type === 'keyup') {
                keySet.delete(ev.key);
                if (ev.key === 'Shift') {
                    r.noteOff();
                    a.noteOff();
                }
            }
        }
    });
}
go();
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 507:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = void 0;
class Player {
    constructor(x, y) {
        this.platforms = [];
        this.x = x;
        this.y = y;
        this.yv = 0;
    }
    setPlatforms(platforms) {
        this.platforms.splice(0, this.platforms.length, ...platforms);
    }
    getPlatformIndex(y) {
        let index = -1;
        while (index < this.platforms.length && this.platforms[index + 1] <= y) {
            index = index + 1;
        }
        return index;
    }
    advance() {
        const previousPlatformIndex = this.getPlatformIndex(this.y);
        this.y += this.yv;
        const newPlatformIndex = this.getPlatformIndex(this.y);
        if (previousPlatformIndex > newPlatformIndex) {
            this.y = this.platforms[previousPlatformIndex];
            this.yv = 0;
        }
        else {
            this.yv -= 0.015;
        }
    }
    down() {
        if (this.yv === 0) {
            this.y -= 0.01;
        }
    }
    up() {
        this.yv = 0.1;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map

/***/ }),

/***/ 28:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Render = void 0;
const player_1 = __webpack_require__(507);
class Render {
    constructor(container, keySet, a) {
        this.basicWidth = [
            0.05,
            0.01,
            0.05,
            0.01,
            0.05,
            0.05,
            0.01,
            0.05,
            0.01,
            0.05,
            0.01,
            0.05 // B
        ];
        this.basicColor = [
            'black',
            'transparent',
            'lightblue',
            'transparent',
            'lightblue',
            'blue',
            'transparent',
            'blue',
            'transparent',
            'lightblue',
            'transparent',
            'lightblue' // B
        ];
        this.keySet = keySet;
        this.audio = a;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1500;
        this.canvas.height = 900;
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.player = new player_1.Player(0, 12);
        this.player.setPlatforms([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24]);
        this.noteIsOn = false;
        this.render();
    }
    noteOn() {
        this.noteIsOn = true;
    }
    noteOff() {
        this.noteIsOn = false;
    }
    render() {
        this.ctx.resetTransform();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 16 + 1 beats horizontally
        // 24 semitones vertically; also positive = up
        this.ctx.scale(this.canvas.width / 33, -this.canvas.height / 26);
        this.ctx.translate(1, -25);
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 0.6;
        this.ctx.beginPath();
        if (this.noteIsOn) {
            this.ctx.arc(this.player.x, this.player.y + 0.5, 0.2, 1, 2 * Math.PI - 1);
        }
        else {
            this.ctx.arc(this.player.x, this.player.y + 0.5, 0.2, -Math.PI, Math.PI);
        }
        this.ctx.stroke();
        for (let n = 0; n <= 24; ++n) {
            this.ctx.lineWidth = this.getWidth(n);
            this.ctx.strokeStyle = this.getColor(n);
            this.ctx.beginPath();
            this.ctx.moveTo(-1, n);
            this.ctx.lineTo(16, n);
            this.ctx.stroke();
        }
        requestAnimationFrame(() => { this.render(); });
        if (this.keySet.has('ArrowUp')) {
            this.player.up();
        }
        else if (this.keySet.has('ArrowDown')) {
            this.player.down();
        }
        ;
        this.player.advance();
        this.audio.setNote(this.player.y + 60);
    }
    getWidth(n) {
        return this.basicWidth[n % 12];
    }
    getColor(n) {
        return this.basicColor[n % 12];
    }
}
exports.Render = Render;
//# sourceMappingURL=render.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(138);
/******/ })()
;
//# sourceMappingURL=main.js.map