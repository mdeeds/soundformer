/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 138:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const body = document.getElementsByTagName('body')[0];
body.addEventListener('keydown', handleKey);
body.addEventListener('keyup', handleKey);
var playerX = 0;
var playerY = 12;
var noteIsOn = false;
function handleKey(ev) {
    if (ev.type === 'keydown') {
        if (ev.key === 'Shift') {
            noteOn();
        }
    }
    else if (ev.type === 'keyup') {
        if (ev.key === 'Shift') {
            noteOff();
        }
    }
}
function noteOn() {
    noteIsOn = true;
}
function noteOff() {
    noteIsOn = false;
}
const canvas = document.createElement('canvas');
body.appendChild(canvas);
canvas.width = 1500;
canvas.height = 900;
const ctx = canvas.getContext('2d');
const basicWidth = [
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
function getWidth(n) {
    return basicWidth[n % 12];
}
const basicColor = [
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
function getColor(n) {
    return basicColor[n % 12];
}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.resetTransform();
    // 16 + 1 beats horizontally
    // 24 semitones vertically; also positive = up
    ctx.scale(canvas.width / 33, -canvas.height / 26);
    ctx.translate(1, -25);
    ctx.fillStyle = '#ddf';
    ctx.fillRect(0, 0, 32, 24);
    ctx.strokeStyle = noteIsOn ? 'red' : 'pink';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.arc(playerX, playerY + 0.5, 0.2, -Math.PI, Math.PI);
    ctx.stroke();
    for (let n = 0; n < 24; ++n) {
        ctx.lineWidth = getWidth(n);
        ctx.strokeStyle = getColor(n);
        ctx.beginPath();
        ctx.moveTo(-1, n);
        ctx.lineTo(16, n);
        ctx.stroke();
    }
    requestAnimationFrame(render);
}
render();
//# sourceMappingURL=index.js.map

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(138);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.js.map