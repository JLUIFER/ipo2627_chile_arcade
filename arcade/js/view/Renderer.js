import { CONFIG } from '../config.js';

const COLORS = { bg: '#0d0f2b', star: '#a7abd6', player: '#eef0ff', bullet: '#ff8a3d',
                 enemy: ['#ff8a3d', '#ffa466', '#7f88ff', '#5560e0'], text: '#eef0ff' };
const MESSAGES = {
  idle: ['Listo para despegar', 'Pulsa «Empezar»'],
  paused: ['Pausa', 'Pulsa P para continuar'],
  over: ['Fin de la partida', 'Pulsa «Empezar» para reintentar'],
};

// VISTA (canvas): solo dibuja lo que le da el modelo.
export class Renderer {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * CONFIG.canvas.width,
      y: Math.random() * CONFIG.canvas.height,
      speed: 10 + Math.random() * 40,
    }));
  }

  // Fondo estrellado: efecto puramente visual, por eso vive en la vista.
  updateBackground(dt) {
    for (const s of this.stars) {
      s.y += s.speed * dt;
      if (s.y > CONFIG.canvas.height) { s.y = 0; s.x = Math.random() * CONFIG.canvas.width; }
    }
  }

  render(game) {
    const { ctx } = this;
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);
    this.drawStars();
    game.enemies.forEach(e => this.drawEnemy(e));
    game.bullets.forEach(b => this.drawBullet(b));
    if (game.status !== 'over') this.drawPlayer(game.player);
    if (MESSAGES[game.status]) this.drawMessage(...MESSAGES[game.status]);
  }

  drawStars() {
    this.ctx.fillStyle = COLORS.star;
    this.stars.forEach(s => this.ctx.fillRect(s.x, s.y, 2, 2));
  }
  drawPlayer({ x, y, width, height }) {
    const { ctx } = this;
    ctx.fillStyle = COLORS.player;
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.closePath();
    ctx.fill();
  }
  drawEnemy({ x, y, width, height, row }) {
    this.ctx.fillStyle = COLORS.enemy[row % COLORS.enemy.length];
    this.ctx.fillRect(x, y, width, height);
  }
  drawBullet({ x, y, width, height }) {
    this.ctx.fillStyle = COLORS.bullet;
    this.ctx.fillRect(x, y, width, height);
  }
  drawMessage(title, subtitle) {
    const { ctx } = this;
    const cx = CONFIG.canvas.width / 2, cy = CONFIG.canvas.height / 2;
    ctx.fillStyle = 'rgba(13, 15, 43, 0.7)';
    ctx.fillRect(0, cy - 60, CONFIG.canvas.width, 110);
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'center';
    ctx.font = '700 32px "Chakra Petch", sans-serif';
    ctx.fillText(title, cx, cy);
    ctx.font = '400 18px "Source Sans 3", sans-serif';
    ctx.fillText(subtitle, cx, cy + 32);
  }
}
