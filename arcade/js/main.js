import { Game } from './model/Game.js';
import { Renderer } from './view/Renderer.js';
import { Hud } from './view/Hud.js';
import { InputController } from './controller/InputController.js';
import { GameController } from './controller/GameController.js';
import { UIController } from './controller/UIController.js';

const game = new Game();
const renderer = new Renderer(document.getElementById('game-canvas'));
const hud = new Hud();

let controller;
const input = new InputController(() => controller.togglePause());
controller = new GameController(game, renderer, hud, input);
new UIController(controller);
controller.run();
