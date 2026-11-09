// CONTROLADOR: traduce teclado a un objeto de intención {left, right, fire}.
const KEY_MAP = {
  ArrowLeft: 'left', KeyA: 'left',
  ArrowRight: 'right', KeyD: 'right',
  Space: 'fire',
};

export class InputController {
  constructor(onPause) {
    this.state = { left: false, right: false, fire: false };
    window.addEventListener('keydown', e => this.#handle(e, true, onPause));
    window.addEventListener('keyup', e => this.#handle(e, false, onPause));
  }
  #handle(e, pressed, onPause) {
    if (e.code === 'KeyP') { if (pressed && !e.repeat) onPause(); return; }
    const action = KEY_MAP[e.code];
    if (!action) return;
    e.preventDefault(); // evita scroll con flechas/espacio
    this.state[action] = pressed;
  }
}
