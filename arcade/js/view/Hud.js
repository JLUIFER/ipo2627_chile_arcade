// VISTA (DOM): marcador y estado de los botones.
export class Hud {
  constructor() {
    this.score = document.getElementById('hud-score');
    this.lives = document.getElementById('hud-lives');
    this.level = document.getElementById('hud-level');
    this.btnPause = document.getElementById('btn-pause');
    this.btnEnd = document.getElementById('btn-end');
    this.btnStart = document.getElementById('btn-start');
  }
  render(game) {
    this.score.textContent = game.score;
    this.lives.textContent = game.lives;
    this.level.textContent = game.level;
    const active = game.status === 'running' || game.status === 'paused';
    this.btnPause.disabled = !active;
    this.btnEnd.disabled = !active;
    this.btnPause.textContent = game.status === 'paused' ? 'Reanudar' : 'Pausar';
    this.btnStart.textContent = active ? 'Reiniciar' : 'Empezar';
  }
}
