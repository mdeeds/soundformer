import { Render } from "./render";

const body = document.getElementsByTagName('body')[0];

const r = new Render(body);

body.addEventListener('keydown', handleKey);
body.addEventListener('keyup', handleKey);

function handleKey(ev: KeyboardEvent) {
  if (ev.type === 'keydown') {
    if (ev.key === 'Shift') {
      r.noteOn();
    }
  } else if (ev.type === 'keyup') {
    if (ev.key === 'Shift') {
      r.noteOff();
    }
  }
}
