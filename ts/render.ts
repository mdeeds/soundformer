import { Audio } from "./audio";
import { Player } from "./player";

export class Render {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private noteIsOn: boolean;
  private keySet: Set<string>;
  private audio: Audio;

  public constructor(container: HTMLBodyElement, keySet: Set<string>, a: Audio) {
    this.keySet = keySet;
    this.audio = a;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1500;
    this.canvas.height = 900;

    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.player = new Player(0, 12);
    this.player.setPlatforms([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24]);
    this.noteIsOn = false;

    this.render();
  }

  public noteOn() {
    this.noteIsOn = true;
  }
  public noteOff() {
    this.noteIsOn = false;
  }
  public render() {
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
      this.ctx.arc(this.player.x, this.player.y + 0.5, 0.2,
        1, 2 * Math.PI - 1);
    } else {
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
    } else if (this.keySet.has('ArrowDown')) {
      this.player.down();
    };
    this.player.advance();
    this.audio.setNote(this.player.y + 36);
  }

  private basicWidth = [
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
  private getWidth(n: number) {
    return this.basicWidth[n % 12];
  }

  private basicColor = [
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
  private getColor(n: number) {
    return this.basicColor[n % 12];
  }
}