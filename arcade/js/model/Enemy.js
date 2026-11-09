import { CONFIG } from '../config.js';
import { Entity } from './Entity.js';

export class Enemy extends Entity {
  constructor(x, y, row) {
    super(x, y, CONFIG.enemy.width, CONFIG.enemy.height);
    this.row = row; // para variar el aspecto por fila
  }
}
