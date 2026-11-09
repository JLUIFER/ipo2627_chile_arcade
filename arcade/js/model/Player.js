import { CONFIG } from '../config.js';
import { Entity } from './Entity.js';

export class Player extends Entity {
  constructor() {
    const { width, height, bottomMargin } = CONFIG.player;
    super((CONFIG.canvas.width - width) / 2, CONFIG.canvas.height - height - bottomMargin, width, height);
    this.cooldown = 0;
  }
  update(dt, input) {
    this.vx = (Number(input.right) - Number(input.left)) * CONFIG.player.speed;
    super.update(dt);
    this.x = Math.max(0, Math.min(CONFIG.canvas.width - this.width, this.x));
    this.cooldown = Math.max(0, this.cooldown - dt);
  }
  canFire() { return this.cooldown === 0; }
  resetCooldown() { this.cooldown = CONFIG.player.cooldown; }
}
