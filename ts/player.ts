export class Player {
  public x: number;
  public y: number;
  private yv: number;
  private platforms: number[] = [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.yv = 0;
  }

  public setPlatforms(platforms: number[]) {
    this.platforms.splice(0, this.platforms.length, ...platforms);
  }

  private getPlatformIndex(y: number): number {
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
    } else {
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