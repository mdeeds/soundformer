import { DH_NOT_SUITABLE_GENERATOR } from "constants";

const body = document.getElementsByTagName('body')[0];

body.addEventListener('keydown', handleKey);
body.addEventListener('keyup', handleKey);

var playerX = 0;
var playerY = 12;
var noteIsOn = false;

function handleKey(ev: KeyboardEvent) {
  if (ev.type === 'keydown') {
    if (ev.key === 'Shift') {
      noteOn();
    }
  } else if (ev.type === 'keyup') {
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
  0.05,  // C
  0.01,
  0.05,  // D
  0.01,
  0.05,  // E
  0.05,  // F
  0.01,
  0.05,  // G
  0.01,
  0.05,  // A
  0.01,
  0.05   // B
];
function getWidth(n: number) {
  return basicWidth[n % 12];
}

const basicColor = [
  'black',  // C
  'transparent',
  'lightblue',  // D
  'transparent',
  'lightblue',  // E
  'blue',  // F
  'transparent',
  'blue',  // G
  'transparent',
  'lightblue',  // A
  'transparent',
  'lightblue'   // B
];
function getColor(n: number) {
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

  for (let n = 0; n <= 24; ++n) {
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