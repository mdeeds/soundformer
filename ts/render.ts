export class Render {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private playerX: number;
  private playerY: number;
  private noteIsOn: boolean;

  public constructor(container: HTMLBodyElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1500;
    this.canvas.height = 900;

    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.playerX = 0;
    this.playerY = 12;
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.resetTransform();

    // 16 + 1 beats horizontally
    // 24 semitones vertically; also positive = up
    this.ctx.scale(this.canvas.width / 33, -this.canvas.height / 26);
    this.ctx.translate(1, -25);

    this.ctx.fillStyle = '#ddf';
    this.ctx.fillRect(0, 0, 32, 24);

    this.ctx.strokeStyle = this.noteIsOn ? 'red' : 'pink';
    this.ctx.lineWidth = 0.6;
    this.ctx.beginPath();
    this.ctx.arc(this.playerX, this.playerY + 0.5, 0.2, -Math.PI, Math.PI);
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