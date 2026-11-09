// CONTROLADOR: bucle principal. Une modelo, vista y entrada.
const MAX_DT = 0.05; // evita saltos tras cambiar de pestaña

export class GameController {
  constructor(game, renderer, hud, input) {
    Object.assign(this, { game, renderer, hud, input, last: 0 });
    this.loop = this.loop.bind(this);
  }
  run() { requestAnimationFrame(this.loop); }

  loop(now) {
    const dt = Math.min((now - this.last) / 1000, MAX_DT) || 0;
    this.last = now;
    this.game.update(dt, this.input.state);   // 1. actualizar modelo
    this.renderer.updateBackground(dt);
    this.renderer.render(this.game);          // 2. renderizar canvas
    this.hud.render(this.game);               // 3. refrescar HUD
    requestAnimationFrame(this.loop);
  }

  start() { this.game.start(); }
  togglePause() { this.game.togglePause(); }
  end() { this.game.end(); }
}
