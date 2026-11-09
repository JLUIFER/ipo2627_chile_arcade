# Órbita 7 · Matamarcianos (Canvas API)

Ejecutar (los módulos ES requieren servidor local):

    python3 -m http.server 8000   # y abrir http://localhost:8000

## Estructura MVC
- `js/model/`      Estado y reglas (Game, Player, Enemy, Bullet). Sin DOM ni canvas.
- `js/view/`       Renderer (canvas) y Hud (DOM).
- `js/controller/` Bucle principal, teclado y botones.
- `js/config.js`   Constantes de equilibrio. `js/utils/` utilidades puras.
- `css/`           base (tokens) → layout (composición) → components.
