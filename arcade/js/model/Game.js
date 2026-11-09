import { CONFIG } from '../config.js';
import { intersects } from '../utils/collisions.js';
import { Player } from './Player.js';
import { Bullet } from './Bullet.js';
import { Enemy } from './Enemy.js';

// MODELO: estado y reglas. No sabe nada del DOM ni del canvas.
export class Game {
  constructor() {
    this.difficulty = 'normal';
    this.reset();
  }

  // --- Ciclo de vida: 'idle' | 'running' | 'paused' | 'over'
  reset() {
    this.status = 'idle';
    this.score = 0;
    this.level = 1;
    this.lives = CONFIG.difficulties[this.difficulty].lives;
    this.player = new Player();
    this.bullets = [];
    this.spawnWave();
  }
  start() { this.reset(); this.status = 'running'; }

  togglePause() {
    if (this.status === 'running') this.status = 'paused';
    else if (this.status === 'paused') this.status = 'running';
  }

  end() { if (this.status === 'running' || this.status === 'paused') this.status = 'over'; }
  
  setDifficulty(name) { if (CONFIG.difficulties[name]) this.difficulty = name; }

  // --- Oleadas
  spawnWave() {
    const { rows, cols, width, height, gapX, gapY, top } = CONFIG.enemy;
    const formationWidth = cols * width + (cols - 1) * gapX;
    const startX = (CONFIG.canvas.width - formationWidth) / 2;
    this.enemies = [];
    this.direction = 1;
    this.totalEnemies = rows * cols;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        this.enemies.push(new Enemy(startX + c * (width + gapX), top + r * (height + gapY), r));
  }

  get enemySpeed() {
    // Como en el clásico: menos enemigos => más rápidos.
    const remaining = this.enemies.length / this.totalEnemies;
    const { speedFactor } = CONFIG.difficulties[this.difficulty];
    return CONFIG.enemy.baseSpeed * speedFactor * (1 + (this.level - 1) * 0.15) * (1 + (1 - remaining) * 1.5);
  }

  // --- Paso de simulación (dt en segundos)
  update(dt, input) {
    if (this.status !== 'running') return;

    this.player.update(dt, input);
    if (input.fire && this.player.canFire()) {
      this.bullets.push(new Bullet(this.player.x + this.player.width / 2, this.player.y));
      this.player.resetCooldown();
    }

    this.moveFormation(dt);
    this.bullets.forEach(b => b.update(dt));
    this.resolveCollisions();

    this.bullets = this.bullets.filter(b => b.alive && b.y + b.height > 0);
    this.enemies = this.enemies.filter(e => e.alive);
    if (this.status === 'running' && this.enemies.length === 0) {
      this.level++; this.bullets = []; this.spawnWave();
    }
  }

  moveFormation(dt) {
    const dx = this.direction * this.enemySpeed * dt;
    const hitsEdge = this.enemies.some(e =>
      e.x + dx < 0 || e.x + e.width + dx > CONFIG.canvas.width);
    if (hitsEdge) {
      this.direction *= -1;
      this.enemies.forEach(e => { e.y += CONFIG.enemy.stepDown; });
    } else {
      this.enemies.forEach(e => { e.x += dx; });
    }
  }

  resolveCollisions() {
    for (const bullet of this.bullets) {
      const hit = this.enemies.find(e => e.alive && intersects(bullet, e));
      if (hit) { hit.alive = false; bullet.alive = false; this.score += CONFIG.enemy.points; }
    }
    const invaded = this.enemies.some(e =>
      e.alive && (intersects(e, this.player) || e.y + e.height >= CONFIG.canvas.height));
    if (invaded) this.loseLife();
  }

  loseLife() {
    this.lives--;
    if (this.lives <= 0) { this.lives = 0; this.status = 'over'; return; }
    this.bullets = [];
    this.spawnWave();
  }
}
