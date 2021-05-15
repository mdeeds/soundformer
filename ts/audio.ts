export class Audio {
  private audioCtx: AudioContext;
  private oscillator: OscillatorNode;
  private gain: GainNode;
  private constructor(context: AudioContext) {
    this.audioCtx = context;
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.type = 'square';
    this.gain = this.audioCtx.createGain();
    this.oscillator.connect(this.gain);
    this.oscillator.start();
    this.gain.connect(this.audioCtx.destination);
    this.setNote(60);
  }

  public static async make(): Promise<Audio> {
    const ctx = await Audio.getAudioContext();
    return new Promise((resolve, reject) => {
      resolve(new Audio(ctx));
    })
  }

  private static getAudioContext(): Promise<AudioContext> {
    return new Promise((resolve, reject) => {
      const context = new window.AudioContext();
      if (context.state === 'running') {
        resolve(context);
      } else {
        setTimeout(async () => {
          resolve(await Audio.getAudioContext());
        }, 500);
      }
    });
  }

  public setNote(note: number) {
    this.oscillator.frequency.setValueAtTime(
      440 * Math.pow(2, (note - 69) / 12),
      this.audioCtx.currentTime);
  }

  public noteOn() {
    this.gain.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
  }

  public noteOff() {
    this.gain.gain.setValueAtTime(0.0, this.audioCtx.currentTime);
  }
}