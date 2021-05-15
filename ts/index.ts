import { Audio } from "./audio";
import { Render } from "./render";

const body = document.getElementsByTagName('body')[0];

async function go() {
  const r = new Render(body);
  const a = await Audio.make();

  body.addEventListener('keydown', handleKey);
  body.addEventListener('keyup', handleKey);

  function handleKey(ev: KeyboardEvent) {
    if (ev.type === 'keydown') {
      if (ev.key === 'Shift') {
        r.noteOn();
        a.noteOn();
      }
    } else if (ev.type === 'keyup') {
      if (ev.key === 'Shift') {
        r.noteOff();
        a.noteOff();
      }
    }
  }
}

go();
