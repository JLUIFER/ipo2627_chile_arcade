// Base de todo lo que tiene posición, tamaño y velocidad (px/s).
export class Entity {
  constructor(x, y, width, height) {
    Object.assign(this, { x, y, width, height, vx: 0, vy: 0, alive: true });
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
}
