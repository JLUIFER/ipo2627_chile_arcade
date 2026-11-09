// CONTROLADOR: eventos de los controles HTML (botones, ajustes, ayuda).
export class UIController {
  constructor(gameController) {
    const $ = id => document.getElementById(id);
    const dialog = $('help-dialog');
    $('btn-start').addEventListener('click', () => gameController.start());
    $('btn-pause').addEventListener('click', () => gameController.togglePause());
    $('btn-end').addEventListener('click', () => gameController.end());
    $('btn-help').addEventListener('click', () => {
      if (gameController.game.status === 'running') gameController.togglePause();
      dialog.showModal();
    });
    $('select-difficulty').addEventListener('change', e => {
      gameController.game.setDifficulty(e.target.value);
      e.target.blur(); // para que la barra espaciadora no abra el select
    });
  }
}
