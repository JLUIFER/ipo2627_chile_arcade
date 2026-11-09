import { CONFIG } from '../config.js';
import { Entity } from './Entity.js';

export class Bullet extends Entity {
  constructor(x, y) {
    const { width, height, speed } = CONFIG.bullet;
    super(x - width / 2, y, width, height);
    this.vy = -speed;
  }
}
