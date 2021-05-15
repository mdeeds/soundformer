import { Audio } from "./audio";
import { Render } from "./render";

const body = document.getElementsByTagName('body')[0];

async function go() {
  const keySet = new Set<string>();
  const a = await Audio.make();
  const r = new Render(body, keySet, a);

  body.addEventListener('keydown', handleKey);
  body.addEventListener('keyup', handleKey);

  function handleKey(ev: KeyboardEvent) {
    if (ev.type === 'keydown') {
      keySet.add(ev.key);
      switch (ev.key) {
        case 'Shift':
          r.noteOn();
          a.noteOn();
          break;
      }
    } else if (ev.type === 'keyup') {
      keySet.delete(ev.key);
      if (ev.key === 'Shift') {
        r.noteOff();
        a.noteOff();
      }
    }
  }
}

go();
