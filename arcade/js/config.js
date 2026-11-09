// Constantes del juego: único sitio donde se "equilibra" el gameplay.
export const CONFIG = {
  canvas: { width: 480, height: 640 },
  player: { width: 36, height: 30, speed: 320, cooldown: 0.3, bottomMargin: 40 },
  bullet: { width: 4, height: 14, speed: 520 },
  enemy: { width: 32, height: 24, rows: 4, cols: 8, gapX: 16, gapY: 14, top: 60,
           stepDown: 18, baseSpeed: 50, points: 10 },
  difficulties: {
    easy:   { speedFactor: 0.7, lives: 5 },
    normal: { speedFactor: 1.0, lives: 3 },
    hard:   { speedFactor: 1.4, lives: 2 },
  },
};
